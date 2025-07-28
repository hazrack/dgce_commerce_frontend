<template>
  <div class="espace-organisation">
    <div
      class="descript-block d-flex align-items-center justify-content-between"
    >
      <div class="">
        <SearchInputComponent @search="performSearch" />
      </div>

      <div class="mb-4">
        <button class="btn-custom" @click="handleNewCoopec">
          <i class="bi bi-plus-circle"></i> Nouvelle Coopération
        </button>
      </div>
    </div>

    <div class="my-5">
      <div>
        <div v-if="tableData.length !== 0">
          <div class="block-trade-table">
            <TableComponent
              :table-data="tableData"
              :fields="tablefields"
              :loginUserRole="retLogUser.roles"
              @edit="fillEditInputPacksData"
              @delete="deleteSelected"
              @downloadCoopec="downloadCoopecFile"
            />
          </div>

          <div>
            <PaginnationComponent
              :current-page="currentPage"
              :total-pages="totalPages"
              @page-change="checkToPage"
            />
          </div>
        </div>

        <div v-else>
          <NoResultsMessageComponent :message="filterMessage" />
        </div>
      </div>
    </div>

    <div class="area-form">
      <b-modal id="modal-global-form" hide-footer v-model="showCoopecForm">
        <template #header>
          <p class="suffix-clicked">
            <span>Ajouter une Coopération </span>
          </p>
        </template>
        <div class="espace-formulaire">
          <FormGlobalComponent
            :fields="formFields"
            :showFile="true"
            :initialData="defaultValues"
            :buttonText="userTextBtn"
            @form-submitted="handleFormSubmit"
          />
        </div>
      </b-modal>
    </div>

    <ConfirmDeleteModal
      :item-id="deleteItemId"
      :show="showDeleteModal"
      @confirm-delete="handleDelete"
      @update:show="(val) => (showDeleteModal = val)"
    />

    <LoaderBlockComponent :isLoading="showSpinner" :message="loaderMessage" />
  </div>
</template>

<script>
import FormGlobalComponent from "../../components/front/FormGlobalComponent.vue";
import PaginnationComponent from "../../components/front/PaginnationComponent.vue";
import SearchInputComponent from "../../components/front/SearchInputComponent.vue";
import { mapGetters } from "vuex";
import actionMixin from "../../mixins/actionMixin.js";
import ConfirmDeleteModal from "../../components/front/ConfirmDeleteModal.vue";
import LoaderBlockComponent from "../../components/front/LoaderBlockComponent.vue";
import NoResultsMessageComponent from "../../components/front/NoResultsMessageComponent.vue";
import TableComponent from "@/components/front/TableComponent.vue";
import moment from "moment";
import axios from "../../services/index.js";
import Swal from "sweetalert2";


export default {
  data() {
    return {
      formFields: [],
      showCoopecForm: false,
      editMode: false,
      showSpinner: false,
      userTextBtn: "Soumettre la cooperation ",
      deleteItemId: 0,
      showDeleteModal: false,
      loaderMessage: "Chargement...",
      defaultValues: {},
      currentPage: 0,
      totalPages: 1,

      tablefields: [
        { key: "title", label: "Titre de la cooperation" },
        { key: "signCountry", label: "Lieu de signature" },
        { key: "signDate", label: "Date de signature" },
        { key: "documentUrl", label: "Telecharger" },

      ],
      tableData: [],
    };
  },

  mixins: [actionMixin],

  computed: {
    ...mapGetters([
      "retcooperationList",
      "retLogUser",
    ]),
  },

  components: {
    SearchInputComponent,
    FormGlobalComponent,
    PaginnationComponent,
    ConfirmDeleteModal,
    LoaderBlockComponent,
    NoResultsMessageComponent,
    TableComponent,
  },

  watch: {
    retcooperationList: {
      immediate: true, // Exécute dès le montage
      handler(newValue) {
        if (
          newValue &&
          Array.isArray(newValue.datas) &&
          newValue.datas.length > 0
        ) {
          this.initCooperation();
        } else {
          this.showSpinner = false;
          this.tableData = [];
        }
      },
    },
  },

  methods: {
    handleNewCoopec() {
      this.initDefautFormValue();
      this.showCoopecForm = true;
      this.initCoopecForm();
    },

    initDefautFormValue() {
      this.editMode = false;
      this.defaultValues = {};
    },

    addAdminActionsColumn() {
    if (this.retLogUser.roles == "admin") {
      this.tablefields.push({ key: "action", label: "Actions" });
    }
  },

    initCoopecForm() {
      this.formFields = [
        {
          label: "Titre Coopération",
          type: "text",
          required: true,
          model: "title",
        },

        {
          label: "Lieu ",
          type: "text",
          required: true,
          model: "signCountry",
        },
        {
          label: "Date ",
          type: "date",
          required: false,
          model: "signDate",
        },
      ];
    },

    performSearch(query) {
      console.log("ADMIN PAGE SEARCH:", query);
      console.log("la longueur du query :", query.length);

      if (query.length >= 2) {
        this.$store.dispatch("SearchCooperations", { value: query });
      }

      if (query.length == 0) {
        this.$store.dispatch("getListOfCooperation", { page: 0, size: 12 });
      }
    },

    fillEditInputPacksData(item) {
      this.defaultValues = { ...item };
      this.editMode = true;
      const brutSign = moment(item.signDate, "DD-MM-YYYY").format("YYYY-MM-DD");
      this.defaultValues.signDate = brutSign;

      this.showCoopecForm = true;
      this.initCoopecForm();
      console.log("La valeur a editer ", this.defaultValues);
    },

    deleteSelected(item) {
      this.deleteItemId = item.id;
      this.showDeleteModal = true;
    },

    handleDelete(id) {
      this.processRequest({
        method: "delete",
        url: `/cooperations/${id}`,
        onSuccess: () => {
          this.$store.dispatch("getListOfCooperation", { page: 0, size: 12 });
        },
      });

      this.showDeleteModal = false;
    },

    downloadCoopecFile(documentUrl) {
      console.log("====================================");
      console.log("ITEM RECU ", documentUrl);
      console.log("====================================");
      if (documentUrl == null) return ;

      this.showSpinner = true;
      const fileName = documentUrl.split("/").pop();
      const url = `/cooperations/download?filename=${encodeURIComponent(
        fileName
      )}`;
      this.downloadFromBackend(url, fileName);
    },

    initCooperation() {
      
      this.currentPage = this.retcooperationList.currentPage;
      this.totalPages = this.retcooperationList.totalPages;
      this.tableData = this.retcooperationList.datas;
      this.showSpinner = false;
      console.log("LE COOPEC", this.tableData);
    },
    checkToPage(page) {
      this.currentPage = page;
      this.$store.dispatch("getListOfCooperation", {
        page: this.currentPage,
        size: 12,
      });
    },

    handleFormSubmit(datas) {
      this.showSpinner = true;
      this.loaderMessage = "Création encours...";
      this.showCoopecForm = false;

      console.log("LA SOUSCRIPTION ", datas);

      const formData = new FormData();
      const formattedSignDate = moment(datas.signDate).format("DD-MM-YYYY");

      // Sérialiser l'objet Agreement
      const cooperationBlob = new Blob(
        [
          JSON.stringify({
            title: datas.title,
            signDate: formattedSignDate,
            signCountry: datas.signCountry,
          }),
        ],
        { type: "application/json" }
      );

      formData.append("cooperation", cooperationBlob);
      // Ajouter le fichier
      if (datas.imageData) {
        formData.append("documentFile", datas.imageData);
      }

      let url = "";
      let method = "";

      if (this.editMode) {
        url = `/cooperations/update/${datas.id}`;
        method = "put";
      } else {
        url = `/cooperations/create`;
        method = "post";
      }

      this.pushToSubmitDatas({ url, data: formData, method });
    },

    pushToSubmitDatas({ url, data, method }) {
      axios({
        method: method,
        url: url,
        data: data,
      })
        .then((response) => {
          this.editMode = false;
          Swal.fire({
            title: "Succès !",
            text: "Action effectuée avec succès !",
            timer: 2500,
            showConfirmButton: false,
          });
          this.$store.dispatch("getListOfCooperation", { page: 0, size: 5 });

          setTimeout(() => {
            this.showSpinner = false;
          }, 2000);
        })
        .catch((error) => {
          this.showSpinner = false;
          const message =
            error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : "Une erreur est survenue.";

          Swal.fire({
            title: "Erreur",
            text: message,
            timer: 3000,
            showConfirmButton: false,
          });
        });
    },
  },

  mounted() {
    this.showSpinner = true;
    this.addAdminActionsColumn();
    this.$store
      .dispatch("getListOfCooperation", { page: 0, size: 12 })
      .then(() => {
        this.$nextTick(() => {
          this.showSpinner = false;
        });
      });
  },
};
</script>

<style scoped lang="scss">
.espace-organisation {
  min-height: 100vh;
}
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

.country-list {
  .line-block-text {
    padding: 10px 20px;
    background: #fff;
  }
}

.text-length {
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  font-style: italic;
  text-shadow: 1px 0px #000;
}
</style>