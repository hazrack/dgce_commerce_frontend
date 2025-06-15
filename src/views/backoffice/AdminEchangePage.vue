<template>
  <div>
    <div
      class="descript-block d-flex align-items-center justify-content-between"
    >
      <div>
        <button class="btn-actu btn-custom" @click="refreshData">
          <i class="bi bi-arrow-clockwise"></i> Actualiser les échanges
        </button>
      </div>

      <div class="block-action-btn mb-4">
        <!-- <button class="btn-custom" @click="handleNewData">
          <i class="bi bi-plus-circle"></i> Ajouter
        </button> -->
        <button class="btn-custom" @click="handleImportdb">
          <i class="bi bi-cloud-arrow-down"></i> Charger
        </button>
        <button class="btn-custom" @click="downloadFile">
          <i class="bi bi-box-arrow-up"></i> Exporter
        </button>
      </div>
    </div>

    <div class="block-filter-select">
      <FormSelectAreaComponent
        :fields="selectFluxDatas"
        :initial-values="packTrade"
        :showMoreProductBtn="true"
        @is-more-product="checkSearchProduct"
        @field-changed="handleFieldFluxChange"
      />
      
    </div>
    <div>
    
      <div v-if="showSearch">
        <SearchInputComponent :placeHolderText="'Rechercher d\'autres Produits..'" @search="performSearch" />
      </div>


    </div>

    <div class="block-trade-table mt-3" v-if="tableData.length !== 0">
      <TableComponent
        :table-data="tableData"
        :fields="tablefields"
      />
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

    <div class="area-form">
      <b-modal id="modal-global-form" v-model="showExchangeForm">
        <template #header>
          <p class="suffix-clicked">
            <span v-if="!isdbModalImport">Création de flux commercial </span>
            <span v-else>Charger Le fichier de donnée (ACCESS DB) </span>
          </p>
        </template>
        <div class="espace-formulaire">
          <FormGlobalComponent
            :fields="formFields"
            :showFile="isFileForm"
            :initialData="defaultValues"
            @submit="handleFormSubmit"
          />
        </div>
      </b-modal>
    </div>

    <LoaderBlockComponent :isLoading="showSpinner" :message="loaderMessage" />
  </div>
</template>

<script>
import TableComponent from "../../components/front/TableComponent.vue";
import PaginnationComponent from "../../components/front/PaginnationComponent.vue";
import FormSelectAreaComponent from "../../components/front/FormSelectAreaComponent.vue";
import LoaderBlockComponent from "../../components/front/LoaderBlockComponent.vue";
import FormGlobalComponent from "../../components/front/FormGlobalComponent.vue";
import { mapGetters } from "vuex";
import NoResultsMessageComponent from "../../components/front/NoResultsMessageComponent.vue";
import actionMixin from "../../mixins/actionMixin.js";
import filterTableMixin from "../../mixins/filterTableMixin.js";
import SearchInputComponent from "../../components/front/SearchInputComponent.vue";

export default {
  data() {
    return {
      isFileForm: false,
      showSearch:false,
      showExchangeForm: false,
      loaderMessage: "Chargement...",
      defaultValues: {},
    };
  },

  mixins: [filterTableMixin, actionMixin],

  components: {
    SearchInputComponent,
    FormSelectAreaComponent,
    TableComponent,
    PaginnationComponent,
    LoaderBlockComponent,
    FormGlobalComponent,
    NoResultsMessageComponent,
  },


  methods: {
    
    handleNewData() {
      this.defaultValues = {};
      this.isdbModalImport = false;
      this.isFileForm = false;
      this.initExchangeForm();
    },
    checkSearchProduct(value) {
      this.showSearch = value;
    },

    handleImportdb() {
      this.formFields = [];
      this.isdbModalImport = true;
      this.isFileForm = true;
      this.showExchangeForm = true;
    },

    downloadFile() {
      this.showSpinner = true;
      //EXPORTER LES ECHANGES D'UNE ANNEE
      const fileName = "Flux-Commerciaux-Exercice-" + this.filterYear + ".csv";
      const url = `/trade-flow/countries/rankings/export?year=${this.filterYear}`;
      this.downloadFromBackend(url, fileName);
    },

    refreshData() {
      window.location.reload();
    },

    initExchangeForm() {
      this.formFields = [
        {
          label: "Année",
          type: "select",
          model: "year",
          required: true,
          options: this.retlistOfYearBetw95ToNow,
        },
        {
          label: "Continent",
          type: "select",
          model: "continentSelected",
          required: true,
          options: [
            { value: "afr", label: "AFRIQUE" },
            { value: "amr", label: "AMERIQUE" },
            { value: "asi", label: "ASIE" },
          ],
        },
        {
          label: "Pays",
          type: "select",
          model: "countryCode2",
          required: true,
          options: this.retcountryByAlphaCode2Select,
        },
      ];

      this.showExchangeForm = true;
    },

    handleFormSubmit(datas) {
      // console.log("LE RETOUR ", datas);

      this.showSpinner = true;
      this.showExchangeForm = false;
      this.loaderMessage = "Chargement des flux encours...";

      let url = "";
      let method = "";

      if (this.isFileForm && datas.imageData instanceof File) {
        const formData = new FormData();
        formData.append("file", datas.imageData);

        url = `/accesdb/import-db`;
        method = "post";

        this.submitFinalTradeData(url, method, formData);
      }
    },

    submitFinalTradeData(url, method, datas) {
      this.processRequest({
        method,
        url,
        data: datas,
        onSuccess: () => {
          this.$store.dispatch("getTradeFlowCountryRanking", {
            year: this.filterYear,
            page: 0,
            size: 12,
          });
        },
      });

      this.isFileForm = false;
    },
  },

  mounted() {
   console.log("le premoer moutend");
   
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