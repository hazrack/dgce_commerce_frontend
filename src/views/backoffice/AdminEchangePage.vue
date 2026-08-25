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
        @field-changed="handleFieldFluxChange"
        @search="performSearch"
      />
    </div>
    

    <div class="block-trade-table mt-3" v-if="tableData.length !== 0">
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

    <div class="area-form">
      <b-modal id="modal-global-form" hide-footer v-model="showExchangeForm">
        <template #header>
          <div class="d-flex justify-content-between w-100">
            <div>
              <p class="suffix-clicked">
                <span>Charger Le fichier de donnée (ACCESS DB) </span>
              </p>
            </div>
            <div>
              <span class="close-modal-icon" @click="showExchangeForm = false">
                <i class="bi bi-x-lg"></i>
              </span>
            </div>
          </div>
        </template>
        <div class="espace-formulaire">
          <FormGlobalComponent
            :fields="formFields"
            :requireFile="true"
            :showFile="isFileForm"
            :initialData="defaultValues"
            @form-submitted="handleFormSubmit"
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
import Swal from "sweetalert2";
import axios from "../../services/index.js";

export default {
  data() {
    return {
      isFileForm: false,
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
      this.isFileForm = false;
      this.initExchangeForm();
    },
    

    handleImportdb() {
      this.formFields = [];
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
      console.log(datas);

      if (!datas || Object.keys(datas).length === 0) {
        Swal.fire({
          title: "Fichier requis",
          text: "Veuillez ajouter un fichier .accdb avant de continuer.",
          icon: "warning",
          timer: 2500,
          showConfirmButton: false,
        });

        return;
      }

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
      this.showSpinner = true;
      this.loaderMessage = "Envoi du fichier en cours...";

      axios[method](url, datas)
        .then((response) => {
          const jobId = response.data && response.data.jobId;
          if (!jobId) {
            // Compatibilité : réponse synchrone (ancien comportement)
            this.showSpinner = false;
            this.processAfterSuccess(() => {
              this.$store.dispatch("getTradeFlowCountryRanking", {
                year: this.filterYear,
                page: 0,
                size: 12,
              });
            });
            return;
          }

          this.loaderMessage =
            "Import en cours de traitement, cela peut prendre plusieurs minutes...";
          this.pollImportStatus(jobId);
        })
        .catch((error) => {
          this.showSpinner = false;
          this.processError(error);
        });

      this.isFileForm = false;
      this.defaultValues = {};
    },

    pollImportStatus(jobId) {
      axios
        .get(`/accesdb/import-db/status/${jobId}`)
        .then((response) => {
          const { status, message } = response.data;

          if (status === "SUCCESS") {
            this.showSpinner = false;
            Swal.fire({
              title: "Succès !",
              text: message || "Import terminé avec succès.",
              timer: 2500,
              showConfirmButton: false,
            });
            this.$store.dispatch("getTradeFlowCountryRanking", {
              year: this.filterYear,
              page: 0,
              size: 12,
            });
            return;
          }

          if (status === "FAILED") {
            this.showSpinner = false;
            Swal.fire({
              title: "Erreur",
              text: message || "L'import a échoué.",
              icon: "error",
              timer: 3000,
              showConfirmButton: false,
            });
            return;
          }

          // PENDING ou IN_PROGRESS : on continue à interroger le serveur
          setTimeout(() => this.pollImportStatus(jobId), 3000);
        })
        .catch((error) => {
          this.showSpinner = false;
          this.processError(error);
        });
    },
  },

  mounted() {
    this.$store.dispatch("checkValidateToken");
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