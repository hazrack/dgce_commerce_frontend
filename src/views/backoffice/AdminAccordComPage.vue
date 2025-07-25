<template>
  <div>
    <div class="head-admin-accord">
      <div class="filter-block">
        <SearchInputComponent @search="performSearch" />

        <FormSelectAreaComponent
          :fields="checkAccordList"
          :initial-values="packAccord"
          @field-changed="handleFieldAccordChange"
        />
      </div>

      <div class="add-more-accord">
        <b-dropdown class="drop-btn-accord" variant="none">
          <template #button-content>
            <span class="add-drop-text">
              <i class="bi bi-plus-circle"></i> Ajouter
            </span>
          </template>
          <b-dropdown-item @click="handleBilateralClick">
            <i class="bi bi-people-fill me-2"></i> Accord Bilatéral
          </b-dropdown-item>
          <b-dropdown-item @click="handleRegionalClick">
            <i class="bi bi-globe2 me-2"></i> Accord Régional
          </b-dropdown-item>
          <b-dropdown-item @click="handleMultilateralClick">
            <i class="bi bi-globe me-2"></i> Accord Multilatéral
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

    <div class="bottom-zone">
      <div class="espace-listing">
        <div>
          <div
            class="line-block-text my-3"
            v-for="(accord, index) in listOfmultiAccord"
            :key="index"
          >
            <div
              class="line-title d-flex align-items-center justify-content-between"
            >
              <p>
                {{
                  accord.title.length > 140
                    ? accord.title.substring(0, 140) + "..."
                    : accord.title
                }}
              </p>

              <span
                class="icon-arrow custom-icon-space"
                @click="seeCurrentAccord(accord)"
              >
                <i class="bi bi-arrow-right"></i>
              </span>
            </div>

            <div class="second-view-block">
              <p>
                <span class="icon-wrapper">
                  <i class="bi bi-file-earmark-text"></i>
                </span>
                {{ accord.typeOfDocument }}
              </p>

              <p>
                <span class="icon-wrapper">
                  <i class="bi bi-people-fill"></i>
                </span>
                {{ accord.typeOfAgreement }}
              </p>

              <p>
                <span class="icon-wrapper">
                  <i class="bi bi-globe-americas"></i>
                </span>
                <span v-if="accord.organizationLabel">{{
                  accord.organizationLabel
                }}</span>
                <span v-if="accord.countryLabel">{{
                  accord.countryLabel
                }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <NoResultsMessageComponent v-if="listOfmultiAccord.length === 0" />

      <div class="pt-2">
        <PaginnationComponent
          :current-page="currentPage"
          :total-pages="totalPages"
          :maxvisible-pages="maxVisiblePages"
          @page-change="checkToPage"
        />
      </div>
    </div>

    <div class="area-form">
      <b-modal id="modal-global-form" hide-footer v-model="showFormModal">
        <template #header>
                            <div class="d-flex justify-content-between w-100">
              <div>

          <p class="suffix-clicked">
            <span>Espace Accord {{ clickedAgreementForm }}</span>
          </p>
          </div>


          <div>
                      <span class="close-modal-icon" @click="showFormModal=false" >
                        <i class="bi bi-x-lg"></i>
                      </span>
                    </div>
                 </div> 
        </template>
        <div class="espace-formulaire">
          <FormGlobalComponent
            :fields="formFields"
            :initialData="defaultValues"
            :showFile="true"
            :buttonText="userTextBtn"
            @form-submitted="handleFormSubmit"
          />
        </div>
      </b-modal>
    </div>

    <b-modal id="modal-multi-flux" hide-footer  v-model="showDetailsModal">
      <template #header>
        <div class="d-flex justify-content-between w-100">
                    <div>
        <p class="suffix-clicked">
          <span>Accords {{ currentAccord.typeOfAgreement }} / </span>
          <span v-if="currentAccord.organizationLabel">{{
            currentAccord.organizationLabel
          }}</span>
          <span v-if="currentAccord.countryLabel">{{
            currentAccord.countryLabel
          }}</span>
        </p>
        </div>
         <div>
                      <span class="close-modal-icon" @click="showDetailsModal=false" >
                        <i class="bi bi-x-lg"></i>
                      </span>
                    </div>
                  </div>
      </template>
      <div class="mx-3">
        <div class="editing-block">
          <button class="edite-btn" @click="handleEditClick(currentAccord)">
            <span><i class="bi bi-pencil-square"></i></span> Modifier
          </button>
          <button class="delete-btn" @click="deleteSelected(currentAccord)">
            <span><i class="bi bi-trash"></i></span> Supprimer
          </button>
        </div>

        <div>
          <div class="line-block-text my-3">
            <div class="text-center detail-title">
              <p>{{ currentAccord.title }}</p>
            </div>

            <div class="detail-content my-4">
              <div class="details-link">
                <div v-if="currentAccord.documentUrl">
                  <a
                    href="#"
                    @click.prevent="
                      downloadFile(currentAccord.documentUrl)
                    "
                    class="telechargement"
                  >
                    <span class="icon-arrow">
                      Télécharger la pièce jointe
                      <i class="bi bi-arrow-down"></i>
                    </span>
                  </a>
                </div>

                <div v-else>
                  <p class="not-file-link">Pas de pièce jointe</p>
                </div>
              </div>

              <div
                class="line-bottom d-flex align-items-center justify-content-between"
              >
                <p class="basique-line">Accord signé le :</p>
                <p class="boucle-text">
                  {{ currentAccord.signDate }}
                </p>
              </div>
              <div
                class="line-bottom d-flex align-items-center justify-content-between"
              >
                <p class="basique-line">Accord signé à :</p>
                <p class="boucle-text">
                  {{ currentAccord.signCountry }}
                </p>
              </div>
              <div
                class="line-bottom d-flex align-items-center justify-content-between"
              >
                <p class="basique-line">Entré en vigueur le :</p>
                <p class="boucle-text">
                  {{ currentAccord.effectiveDate }}
                </p>
              </div>
              <div class="text-center mt-4">
                <p class="basique-line">DISPOSITIF DE SUIVI</p>
                <hr class="detail-hr mx-auto" />
                <p class="boucle-text mt-3">
                  {{ currentAccord.trackingDevice }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <ConfirmDeleteModal
      v-model:show="showDeleteModal"
      :item-id="deleteItemId"
      @confirm-delete="handleDelete"
    />

    <LoaderBlockComponent :isLoading="showSpinner" :message="loaderMessage" />
  </div>
</template>

<script>
import SearchInputComponent from "../../components/front/SearchInputComponent.vue";
import FormSelectAreaComponent from "../../components/front/FormSelectAreaComponent.vue";
import PaginnationComponent from "../../components/front/PaginnationComponent.vue";
import FormGlobalComponent from "../../components/front/FormGlobalComponent.vue";
import { mapGetters } from "vuex";
import axios from "../../services/index.js";
import Swal from "sweetalert2";
import actionMixin from "../../mixins/actionMixin.js";
import ConfirmDeleteModal from "../../components/front/ConfirmDeleteModal.vue";
import LoaderBlockComponent from "../../components/front/LoaderBlockComponent.vue";
import moment from "moment";
import NoResultsMessageComponent from "../../components/front/NoResultsMessageComponent.vue";

export default {
  data() {
    return {
      headStats: [],
      packAccord: {},
      currentPage: 0,
      showSpinner: false,
      totalPages: 1,
      maxVisiblePages: 5,
      currentAccord: {},
      showDetailsModal: false,
      loaderMessage: "Chargement...",
      userTextBtn: "Soumettre l'accord ",
      showFormModal: false,
      showDeleteModal:false,
      deleteItemId: 0,
      clickedAgreementForm: "",
      filteredQuery: "",
      editMode: false,
      defaultValues: {},
      checkAccordList: [
        {
          label: "Filtrer Par Accord",
          type: "select",
          model: "accordFiltred",
          required: true,
          options: [
            { value: "all", label: "Tous les accords" },
            { value: "bilateral", label: "Bilatéraux" },
            { value: "regional", label: "Régionnaux" },
            { value: "multilateral", label: "Multilatéraux" },
          ],
        },
      ],
      listOfmultiAccord: [],

      formFields: [],
    };
  },

  mixins: [actionMixin],

  computed: {
    ...mapGetters([
      "retorgaSelectData",
      "retcountrySelectData",
      "retlistOfAgreement",
    ]),
  },

  watch: {
    retlistOfAgreement: {
      immediate: true, // Exécute dès le montage
      handler(newValue) {
        if (
          newValue &&
          Array.isArray(newValue.datas) &&
          newValue.datas.length > 0
        ) {
          this.initListAgreementBlock();
        } else {
          this.listOfmultiAccord = [];
        }
      },
    },
  },

  components: {
    SearchInputComponent,
    FormSelectAreaComponent,
    PaginnationComponent,
    FormGlobalComponent,
    ConfirmDeleteModal,
    LoaderBlockComponent,
    NoResultsMessageComponent,
  },

  methods: {
    initListAgreementBlock() {
      this.currentPage = this.retlistOfAgreement.currentPage;
      this.pageSize = this.retlistOfAgreement.pageSize;
      this.totalItems = this.retlistOfAgreement.totalItems;
      this.totalPages = this.retlistOfAgreement.totalPages;
      this.listOfmultiAccord = this.retlistOfAgreement.datas;
      console.log("LES DONNES A FFICHES:", this.retlistOfAgreement.datas);
    },

    performSearch(query) {
      if (query.length > 2) {
        this.filteredQuery = query;
        this.$store.dispatch("SearchAgreements", {
          query: this.filteredQuery,
          page: 0,
          size: 5,
        });
      }
      if (query.length == 0) {
        this.filteredQuery = "";
        this.$store.dispatch("getListOfAgreement", { page: 0, size: 5 });
      }
    },

    handleFieldAccordChange({ fieldName, value }) {
      this.filteredQuery = value;

      if (this.filteredQuery != "all") {
        this.$store.dispatch("SearchAgreements", {
          query: this.filteredQuery,
          page: 0,
          size: 5,
        });
      } else {
        this.filteredQuery = "";
        this.$store.dispatch("getListOfAgreement", { page: 0, size: 5 });
      }
    },

    checkToPage(page) {
      this.currentPage = page;
      if (this.filteredQuery && this.filteredQuery.trim() !== "") {
        this.$store.dispatch("SearchAgreements", {
          query: this.filteredQuery,
          page: this.currentPage,
          size: 5,
        });
      } else {
        this.$store.dispatch("getListOfAgreement", {
          page: this.currentPage,
          size: 5,
        });
      }
    },

    handleNewAccord(value) {
      console.log("Accord clické ", value);
    },

    seeCurrentAccord(item) {
      console.log("LE CLICK", item);
      this.currentAccord = item;
      this.showDetailsModal = true;
    },

    handleFormSubmit(datas) {
      this.showSpinner = true;
      this.loaderMessage = "Création encours...";
      this.showFormModal = false;

      console.log("LA SOUSCRIPTION ", datas);

      const formData = new FormData();
      const formattedSignDate = moment(datas.signDate).format("DD-MM-YYYY");
      const formattedEffectiveDate = moment(datas.effectiveDate).format(
        "DD-MM-YYYY"
      );

      // Sérialiser l'objet Agreement
      const agreementBlob = new Blob(
        [
          JSON.stringify({
            title: datas.title,
            signDate: formattedSignDate,
            signCountry: datas.signCountry, // attention à la correspondance des noms
            effectiveDate: formattedEffectiveDate,
            trackingDevice: datas.trackingDevice,
            typeOfAgreement: this.clickedAgreementForm,
            organizationId: datas.organizationId || null,
            countryId: datas.countryId,
            typeOfDocument: datas.typeOfDocument,
          }),
        ],
        { type: "application/json" }
      );

      formData.append("agreement", agreementBlob);
      // Ajouter le fichier
      if (datas.imageData) {
        formData.append("documentFile", datas.imageData);
      }

      let url = "";
      let method = "";

      if (this.editMode) {
        url = `/agreements/update/${datas.id}`;
        method = "put";
      } else {
        url = `/agreements/create`;
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
          this.$store.dispatch("getListOfAgreement", { page: 0, size: 5 });

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

    deleteSelected(item) {
      this.deleteItemId = item.id;
      this.showDeleteModal = true;
    },

    handleDelete(id) {
      this.showDetailsModal = false;
      this.editMode = false;

      this.processRequest({
        method: "delete",
        url: `/agreements/${id}`,
        onSuccess: () => {
          this.$store.dispatch("getListOfAgreement", { page: 0, size: 5 });
        },
      });
    },

    handleEditClick(item) {
      this.showFormModal = true;
      this.showDetailsModal = false;
      this.editMode = true;

      //FORMATER LA DATE POUR L'AFFICHAGE DANS L'INPUT
      const brutSign = moment(item.signDate, "DD-MM-YYYY").format("YYYY-MM-DD");
      const brutEffective = moment(item.effectiveDate, "DD-MM-YYYY").format("YYYY-MM-DD");

      this.defaultValues = { ...item };
      this.defaultValues.signDate = brutSign;
      this.defaultValues.effectiveDate = brutEffective;

      if (item.typeOfAgreement === "Bilateral") {
        this.initBilateralForm();
      } else if (item.typeOfAgreement === "Regional") {
        this.initRegionalForm();
      } else if (item.typeOfAgreement === "Multilateral") {
        this.initMultiForm();
      }
    },

    downloadFile(documentUrl) {
      //TELECHARGER UN CERTIFICAT PDF
      this.showSpinner = true;
      const fileName = documentUrl.split("/").pop();
      const url = `/agreements/download?filename=${encodeURIComponent(fileName)}`;
      this.downloadFromBackend(url, fileName);
    },

    initialForm() {
      this.formFields = [
        {
          label: "Libellé",
          type: "text",
          required: true,
          model: "title",
        },
        {
          label: "Date de Signature ",
          type: "date",
          required: false,
          model: "signDate",
        },

        {
          label: "Lieu de signature ",
          type: "text",
          required: true,
          model: "signCountry",
        },
        {
          label: "Date d'entrée en vigueur ",
          type: "date",
          required: false,
          model: "effectiveDate",
        },
        {
          label: "Dispositif de suivi",
          type: "text",
          required: true,
          model: "trackingDevice",
        },
        {
          label: "Type de document",
          type: "select",
          required: false,
          model: "typeOfDocument",
          options: [
            { value: "non preferentiel", label: "Non Préferentiel" },
            { value: "preferentiel", label: "Préferentiel" },
          ],
        },
      ];
    },

    handleBilateralClick() {
      this.initDefautFormValue();
      this.initBilateralForm();
    },
    handleRegionalClick() {
      this.initDefautFormValue();
      this.initRegionalForm();
    },
    handleMultilateralClick() {
      this.initDefautFormValue();
      this.initMultiForm();
    },

    initDefautFormValue() {
      this.editMode = false;
      this.defaultValues = {};
    },

    initBilateralForm() {
      this.clickedAgreementForm = "Bilateral";
      this.initialForm();

      // Ajoute le champ Pays au début du tableau
      this.formFields.unshift({
        label: "Pays",
        type: "select",
        required: true,
        model: "countryId",
        options: this.retcountrySelectData,
      });

      this.showFormModal = true;
    },

    initRegionalForm() {
      this.clickedAgreementForm = "Regional";

      this.initialForm();

      // Ajoute le champ Pays au début du tableau
      this.formFields.unshift({
        label: "Organisation",
        type: "select",
        required: true,
        model: "organizationId",
        options: this.retorgaSelectData,
      });

      this.showFormModal = true;
    },

    initMultiForm() {
      this.clickedAgreementForm = "Multilateral";

      this.initialForm();
      this.showFormModal = true;
    },
  },

  mounted() {
    this.showSpinner = true;
    this.$store.dispatch("getListOfOrganization");
    this.$store.dispatch("getListOfCountries");
    this.$store.dispatch("getListOfAgreement", { page: 0, size: 5 })
      .then(() => {
        this.$nextTick(() => {
          this.showSpinner = false;
        });
      });

  },
};
</script>

<style scoped lang="scss">
.head-admin-accord {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.filter-block {
  display: flex;
  align-items: center;
  gap: 10px;
}

.drop-btn-accord {
  background: #FF8300 !important;
  padding: 6px 12px;
  width: 150px;
  border: none;

  span.add-drop-text {
    color: #fff;
    font-weight: 600;
    border: none;
  }
}

// .espace-listing {
//   height: 450px;
//   overflow-y: auto; /* Permet le défilement */
//   scrollbar-width: none;
//   -ms-overflow-style: none;

//   &::-webkit-scrollbar {
//     display: none;
//   }
// }

@keyframes pencil-pulse {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
}

.second-view-block {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  p {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: 14px;
    color: #555;
    background: #f8f9fa;
    padding: 8px 12px;
    border-radius: 20px;
    transition: all 0.3s ease;

    &:hover {
      background: #e9ecef;
      transform: translateY(-2px);
    }
  }

  .icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: #4caf50;
    border-radius: 50%;
    color: white;
    font-size: 12px;
  }

  // Icônes spécifiques avec couleurs différentes
  .bi-file-earmark-text {
    color: #fff;
  }

  .bi-people-fill {
    color: #fff;
  }

  .bi-globe-americas {
    color: #fff;
    background-color: #ff9800; // Orange pour le pays
  }
}
</style>