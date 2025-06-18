<template>
  <div class="espace-organisation mb-4">
    <div
      class="descript-block d-flex align-items-center justify-content-between"
    >

      <div class="mb-4">
        <button class="btn-custom" @click="handleNewOrga">
          <i class="bi bi-plus-circle"></i> Nouvelle Organisation
        </button>
      </div>
    </div>

    <div class="country-list pb-3">
      <div>
        <div
          class="line-block-text my-3"
          v-for="(corpo, index) in retlistOfOrganization"
          :key="index"
        >
          <div
            class="line-title d-flex align-items-center justify-content-between"
          >
            <div class="info-orga">
              <p class="shadow-title">{{ corpo.label }}</p>
              <span class="text-length">
                {{ corpo.countries.length }} Pays</span
              >
            </div>

            <div class="editing-block">
              <button class="more-btn" @click="seecurrentOrgaClick(corpo)">
                <span><i class="bi bi-eye-fill"></i> Voir Plus </span>
              </button>
              <button class="edite-btn" @click="handleEditOrgaClick(corpo)">
                <span><i class="bi bi-pencil-square"></i> Modifier Orga </span>
              </button>
              <button class="delete-btn" @click="handleDeleteOrgaClick(corpo)">
                <span><i class="bi bi-trash"></i> Supprimer </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="area-form">
      <b-modal id="modal-global-form" hide-footer v-model="showOrgaFormModal">
        <template #header>
          <div class="d-flex justify-content-between w-100">
            <div>
          <div class="suffix-clicked">
            <p v-if="!isCountryForm">
              <span v-if="!editMode">Création organisation</span>
              <span v-else>Edition organisation</span>
            </p>
            <p v-else>
              Nouveau Pays /
              <span class="label-orange shadow-title">
                {{ currentClick.label }}
              </span>
            </p>
          </div>
        </div>

        <div>
                      <span class="close-modal-icon" @click="showOrgaFormModal=false" >
                        <i class="bi bi-x-lg"></i>
                      </span>
                    </div>
                  </div>

        </template>
        <div class="espace-formulaire">
          <FormGlobalComponent
            :fields="formFields"
            :showFile="false"
            :initialData="defaultValues"
            :buttonText="userTextBtn"
            @form-submitted="handleFormSubmit"
          />
        </div>
      </b-modal>
    </div>

    <b-modal id="modal-global-form" hide-footer v-model="showDetailsModal">
      <template #header>
        <div class="d-flex justify-content-between w-100">
                    <div>

        <p class="suffix-clicked">
          <span class="label-orange shadow-title">
            {{ currentClick.label }}
          </span>
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
          <button class="edite-btn" @click="handleNewCountry()">
            <span><i class="bi bi-pencil-square"></i> Ajouter un pays </span>
          </button>
        </div>

        <div class="espace-content mt-4">
          <div
            class="click-country"
            v-for="(item, index) in currentClick.countries"
            :key="index"
          >
            <div
              class="child-info d-flex align-items-center justify-content-between"
            >
              <p class="country-label">{{ item.label }}</p>
              <span
                class="icon-trash custom-icon-space"
                @click="removeCountry(currentClick, item)"
              >
                <i class="bi bi-x-lg"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <ConfirmDeleteModal
      :item-id="deleteItemId"
      @confirm-delete="handleDelete"
    />

    <LoaderBlockComponent :isLoading="showSpinner" :message="loaderMessage" />
  </div>
</template>

<script>
import FormGlobalComponent from "../../components/front/FormGlobalComponent.vue";
import SearchInputComponent from "../../components/front/SearchInputComponent.vue";
import { mapGetters } from "vuex";
import actionMixin from "../../mixins/actionMixin.js";
import ConfirmDeleteModal from "../../components/front/ConfirmDeleteModal.vue";
import LoaderBlockComponent from "../../components/front/LoaderBlockComponent.vue";

export default {
  data() {
    return {
      formFields: [],
      defaultValues: {},
      showOrgaFormModal: false,
      showDetailsModal: false,
      isCountryForm: false,
      showSpinner: false,
      isAddNewCountry: false,
      userTextBtn: "",
      loaderMessage: "Chargement...",
      deleteItemId: 0,
      editMode: false,
      packflux: {},
      currentClick: {},
      listOfCorpo: [],
    };
  },

  mixins: [actionMixin],

  computed: {
    ...mapGetters(["retlistOfOrganization", "retcountrySelectData"]),
  },

  components: {
    SearchInputComponent,
    FormGlobalComponent,
    ConfirmDeleteModal,
    LoaderBlockComponent,
  },

  methods: {
    performSearch(query) {
      console.log("ADMIN PAGE SEARCH:", query);
      console.log("la longueur du query :", query.length);

      if (query.length > 2) {
        //DEBUTONS LE FILTRE VIA L'api
      }
    },

    seecurrentOrgaClick(item) {
      console.log("LE CLICK", item);
      this.currentClick = item;
      this.showDetailsModal = true;
    },

    handleEditOrgaClick(item) {
      console.log("edit area", item);
      this.userTextBtn = "Modifier";
      this.defaultValues.id = item.id;
      this.defaultValues.label = item.label;
      this.defaultValues.codeOrg = item.codeOrg;
      this.editMode = true;
      this.initOrganisationForm();
    },

    handleDeleteOrgaClick(item) {
      console.log("delete area ", item);
      this.deleteItemId = item.id;
      this.$bvModal.show("confirm-delete-modal");
      this.editMode = false;
    },


    handleNewOrga() {
      this.defaultValues = {};
      this.userTextBtn = "Enregistrer";

      this.editMode = false;
      this.isAddNewCountry = false;
      this.initOrganisationForm();
    },

    handleFormSubmit(formData) {
      console.log("LA SOUSCRIPTION ", formData);
      this.showSpinner = true;
      let url = "";
      let method = "";

      //VERIFICATION DANS LE CAS OU L'ON VEUT AJOUTER UN PAYS A UNE ORGANISATION
      if (this.isAddNewCountry) {
        url = `/organizations/${this.currentClick.id}/add-country/${formData.paysId}`;
        method = "put";
        formData.email = null;
      } else {
        if (this.editMode) {
          url = `/organizations/${formData.id}`;
          method = "put";
          formData.email = null;
        } else {
          url = `/organizations`;
          method = "post";
        }
      }

      this.processRequest({
        method,
        url,
        data: formData,
        onSuccess: () => {
          this.$store.dispatch("getListOfOrganization");
        },
      });
      
      this.initModalSpace();
    },

    initModalSpace(){
      this.showOrgaFormModal = false;
      this.isAddNewCountry = false;
      this.showDetailsModal = false;
      this.isCountryForm = false;
      this.editMode = false;
    },

    removeCountry(organisation, country) {
      
      this.processRequest({
        method: "put",
        url: `/organizations/${organisation.id}/remove-country/${country.id}`,
        onSuccess: () => {
          this.$store.dispatch("getListOfOrganization");
        },
      });

      this.initModalSpace();
    },

    handleDelete(id) {
      this.processRequest({
        method: "delete",
        url: `/organizations/${id}`,
        onSuccess: () => {
          this.$store.dispatch("getListOfOrganization");
        },
      });
    },

    initOrganisationForm() {
      this.formFields = [
        {
          label: "Nom",
          type: "text",
          required: true,
          model: "label",
        },
      ];
      this.isCountryForm = false;
      this.showOrgaFormModal = true;
    },

    handleNewCountry() {
      this.isCountryForm = true;
      this.isAddNewCountry = true;
      this.editMode = false;
      this.userTextBtn = "Ajouter le pays";

      this.formFields = [
        {
          label: "Pays",
          type: "select",
          required: true,
          model: "paysId",
          options: this.retcountrySelectData,
        },
      ];
      this.showDetailsModal = false;
      this.showOrgaFormModal = true;
    },
  },

  mounted() {
    this.showSpinner = true;
    this.$store.dispatch("getListOfCountries"),
    this.$store.dispatch("getListOfOrganization").then(() => {
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

.espace-content {
  background-color: #ccc;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 2px 6px #000;
}

.click-country {
  background-color: white;
  border-radius: 6px;
  padding: 5px 15px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.click-country:hover {
  transform: translateY(-2px);
}

.child-info {
  padding: 5px 0;
  font-weight: bold;
}

.country-label {
  font-size: 14px;
  color: #333;
  margin: 0;
  font-weight: 700;
}

.bi-x-lg {
  font-size: 14px;
}

.info-orga {
  display: flex;
  align-items: center;
  gap: 14px;
}

.text-length {
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  font-style: italic;
  text-shadow: 1px 0px #000;
}
</style>