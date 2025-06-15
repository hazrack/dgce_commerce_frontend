<template>
  <div>
    <div
      class="descript-block d-flex align-items-center justify-content-between"
    >
      <div>
        <button class="btn-actu btn-custom" @click="refreshData">
          <i class="bi bi-arrow-clockwise"></i> Actualiser les produits
        </button>
      </div>

      <div class="block-part mb-2">
        <SwitchBlockComponent
          :options="switchOptions"
          @switchValue="toSwitchedClick"
        />
      </div>
    </div>

    <div class="block-filter-select mb-4">
      <FormSelectAreaComponent
        :fields="selectFluxDatas"
        :initial-values="packAccord"
        @field-changed="handleAdminFieldFluxChange"
      />
    </div>

    <div class="block-table-list" v-if="tableData.length !== 0">
      <TableComponent :table-data="tableData" :fields="tablefields" />
    </div>

    <div v-else>
      <NoResultsMessageComponent :message="filterMessage" />
    </div>

    <div>
      <PaginnationComponent
        :current-page="currentPage"
        :total-pages="totalPages"
        :maxvisible-pages="maxVisiblePages"
        @page-change="checkToPage"
      />
    </div>

    <LoaderBlockComponent :isLoading="showSpinner" :message="loaderMessage" />
  </div>
</template>

<script>
import TableComponent from "../../components/front/TableComponent.vue";
import PaginnationComponent from "../../components/front/PaginnationComponent.vue";
import FormSelectAreaComponent from "../../components/front/FormSelectAreaComponent.vue";
import LoaderBlockComponent from "../../components/front/LoaderBlockComponent.vue";
import SwitchBlockComponent from "../../components/front/SwitchBlockComponent.vue";
import { mapGetters } from "vuex";
import NoResultsMessageComponent from "../../components/front/NoResultsMessageComponent.vue";

export default {
  data() {
    return {
      selectFluxDatas: [],
      showSpinner: false,
      loaderMessage: "Chargement...",
      filterMessage:
        "Pas de données disponibles pour les critères sélectionnés.",
      packAccord: this.getDefaultFilters(),
      filterYear: null,
      filterByType: "both",
      filterByCountryCode: "",
      filterByProductId: "",

      tableData: [],

      tablefields: [
        { key: "rank", label: "RANG" },
        { key: "labelProduct", label: "PRODUIT" },
        { key: "totalAmount", label: "MONTANT (FCFA)" },
        { key: "totalWeight", label: "POIDS (KG)" },
      ],
      currentPage: 0,
      totalPages: 1,
      maxVisiblePages: 5,
      listOfSelectProduct: [],
      switchedValue: "",
      switchOptions: [
        { id: "global", label: "Basic", value: "global" },
        { id: "product", label: "Par Produit", value: "product" },
        { id: "pays", label: "Par Pays", value: "pays" },
      ],
    };
  },

  components: {
    FormSelectAreaComponent,
    TableComponent,
    PaginnationComponent,
    LoaderBlockComponent,
    SwitchBlockComponent,
    NoResultsMessageComponent,
  },
  computed: {
    ...mapGetters([
      "retcountryByAlphaCode2Select",
      "retproductRankings",
      "retlistOfYearBetw95ToNow",
      "retlistOfProducts",
    ]),
  },

  watch: {
    retproductRankings: {
      immediate: true, // Exécute dès le montage
      handler(newValue) {
        if (
          newValue &&
          Array.isArray(newValue.datas) &&
          newValue.datas.length > 0
        ) {
          this.initProductTableRanking();
        } else {
          this.tableData = [];
        }
      },
    },

    retlistOfProducts: {
      immediate: true,
      handler(newValue) {
        if (
          newValue &&
          Array.isArray(newValue.datas) &&
          newValue.datas.length > 0
        ) {
          this.addMoreProductInSelectArray();
        } else {
          this.listOfSelectProduct = [];
          this.initSelectFilter();
          this.showSpinner = false;
        }
      },
    },
  },

  methods: {
    getDefaultFilters() {
      return {
        choosedYear: new Date().getFullYear() - 1, // ou année actuelle si tu veux
        choosedTrade: "both",
      };
    },

    addMoreProductInSelectArray() {
      console.log("Il ya un chagment");

      const nouveauxProduits = this.retlistOfProducts.datas.map((p) => ({
        value: p.id,
        label: p.labelProduct,
      }));
      this.showSpinner = false;
      this.listOfSelectProduct = nouveauxProduits;
      this.initSelectFilter();
    },

    checkToPage(page) {
      this.currentPage = page;
      this.$store.dispatch("getTradeFlowProductRanking", {
        year: this.filterYear,
        page: this.currentPage,
        size: 12,
        type: this.filterByType,
        countryCode2: this.filterByCountryCode,
      });
    },

    handleAdminFieldFluxChange({ fieldName, value }) {
      switch (fieldName) {
        case "choosedYear":
          this.filterYear = value;
          break;
        case "choosedTrade":
          this.filterByType = value;
          break;
        case "checkByCountry":
          this.filterByCountryCode = value;
          break;
        case "productSelected":
          this.filterByProductId = value;
          break;
      }

      // Déclenche la requête après avoir mis à jour les filtres
      this.$store.dispatch("getTradeFlowProductRanking", {
        year: this.filterYear,
        page: 0,
        size: 12,
        type: this.filterByType,
        countryCode2: this.filterByCountryCode,
        productId: this.filterByProductId,
      });
    },

    refreshData() {
      window.location.reload();
    },

    initSelectFilter() {
      this.selectFluxDatas = [
        {
          label: "Année",
          type: "select",
          model: "choosedYear",
          required: true,
          options: this.retlistOfYearBetw95ToNow,
        },
        {
          label: "Type échanges",
          type: "select",
          model: "choosedTrade",
          required: true,
          options: [
            { value: "both", label: "Global" },
            { value: "import", label: "Importation" },
            { value: "export", label: "Exportation" },
          ],
        },
      ];
    },

    initProductTableRanking() {
      this.currentPage = this.retproductRankings.currentPage;
      this.totalPages = this.retproductRankings.totalPages;
      this.tableData = this.retproductRankings.datas;
    },

    toSwitchedClick(value) {
      this.initSelectFilter();



      switch (value) {
        case "product":
          this.selectFluxDatas.push({
            label: "Produit",
            type: "select",
            model: "productSelected",
            required: true,
            options: this.listOfSelectProduct,
          });
          break;

        case "pays":
          this.selectFluxDatas.push({
            label: "Pays",
            type: "select",
            model: "checkByCountry",
            required: true,
            options: this.retcountryByAlphaCode2Select,
          });
          break;

        default:
          console.log(`Valeur initiale: ${value}`);
          break;
      }

      this.switchedValue = value;
    },
  },

  mounted() {
    this.filterYear = new Date().getFullYear() - 1;
    this.showSpinner = true;
    this.initSelectFilter();
    this.$store.dispatch("getListOfCountries");
    this.$store
      .dispatch("getTradeFlowProductRanking", {
        year: this.filterYear,
        page: 0,
        size: 12,
      })
      .then(() => {
        this.$nextTick(() => {
          this.showSpinner = false;
        });
      });
  },
};
</script>

<style scoped lang="scss">
.descript-block {
  border-bottom: 5px solid #ff8c00;
  margin-bottom: 18px;
  h3 {
    font-weight: bold;
  }
}
.block-action-btn {
  display: flex;
  justify-content: end;
  gap: 15px;
  flex-wrap: wrap;

  .btn-custom {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 15px;
    padding: 10px;
    background-color: #c6183d; /* Rouge moderne */
    color: #fff; /* Texte blanc */
    font-size: 12px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    box-shadow: 2px 2px 2px #000;

    &:hover {
      background-color: #ff8c00;
      transform: scale(1.05);
    }
  }
}

.btn-actu {
  background: #7c7a75;
}
</style>