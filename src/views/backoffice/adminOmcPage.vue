<template>
  <div class="espace-organisation">
    <div
      class="descript-block d-flex align-items-center justify-content-between"
    >
      <div class="">
        <SearchInputComponent @search="performSearch" />
      </div>

      <div class="mb-4">
        <button class="btn-custom" @click="handleNewOmc">
          <i class="bi bi-plus-circle"></i> Ajouter pays membres
        </button>
      </div>
    </div>

    <div class="country-list">
      <div>
        <div
          class="line-block-text my-3"
          v-for="(corpo, index) in listOfOmc"
          :key="index"
          >
          <div
            class="line-title d-flex align-items-center justify-content-between"
          >
            <div class="info-orga">
              <p class="shadow-ttle">{{ corpo.countryLabel }}</p>
              <span class="text-length"> Membre Dépuis {{ corpo.year }} </span>
            </div>

            <div class="editing-block">
              <button class="delete-btn" @click="deleteSelected(corpo)">
                <span><i class="bi bi-trash"></i> Supprimer </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <NoResultsMessageComponent v-if="listOfOmc.length === 0" />


    </div>

    <div class="area-form">
      <b-modal id="modal-global-form" hide-footer  v-model="showOmcForm">
        <template #header>
          <p class="suffix-clicked">
            <span>Ajouter un pays </span>
          </p>
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

    <div class="my-4 pt-4">
      <PaginnationComponent
        :current-page="currentPage"
        :total-pages="totalPages"
        :maxvisible-pages="maxVisiblePages"
        @page-change="checkToPage"
      />
    </div>

    <ConfirmDeleteModal
      :item-id="deleteItemId"
      :show="showDeleteModal" 
      @confirm-delete="handleDelete"
      @update:show="val => showDeleteModal = val"
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

export default {
  data() {
    return {
      formFields: [],
      showOmcForm: false,
      editMode: false,
      showSpinner: false,
      userTextBtn: "Soumettre le pays ",
      deleteItemId: 0,
      showDeleteModal:false,
      loaderMessage: "Chargement...",
      defaultValues: {},
      currentPage: 0,
      totalPages: 1,
      maxVisiblePages: 5,
      packflux: {},
      listOfOmc: [],
    };
  },

  mixins: [actionMixin],

  computed: {
    ...mapGetters([
      "retlistOfOmcs",
      "retlistOfSimpleCountryLabel",
      "retlistOfYearBetw95ToNow",
    ]),
  },

  components: {
    SearchInputComponent,
    FormGlobalComponent,
    PaginnationComponent,
    ConfirmDeleteModal,
    LoaderBlockComponent,
    NoResultsMessageComponent
  },

  watch: {
    retlistOfOmcs: {
      immediate: true,
      handler(newValue) {
        if (newValue && Array.isArray(newValue.datas) && newValue.datas.length > 0) {
          this.initListOfOmcsBlock();
        } else {
          this.listOfOmc = [];
        }
      },
    },
  },

  methods: {
    initListOfOmcsBlock() {
      console.log("Les elements simule ", this.retlistOfOmcs);
      this.currentPage = this.retlistOfOmcs.currentPage;
      this.totalPages = this.retlistOfOmcs.totalPages;
      this.listOfOmc = this.retlistOfOmcs.datas;
    },

    performSearch(query) {
      console.log("ADMIN PAGE SEARCH:", query);
      console.log("la longueur du query :", query.length);

      if (query.length >= 2) {
        this.$store.dispatch("SearchListOfOmc", { value:query});
      }

      if (query.length == 0) {
        this.$store.dispatch("getListOfOmc", { page: 0, size: 12 });
      }

    },

    handleFormSubmit(formData) {
      this.showSpinner = true;
      this.showOmcForm = false;

      const addOmcData = [];
      addOmcData.push(formData);

      console.log("la longueur du query :", addOmcData);

      let url = `/omcs/trade-community`;
      let method = "post";

      this.processRequest({
        method,
        url,
        data: addOmcData,
        onSuccess: () => {
          this.$store.dispatch("getListOfOmc", { page: 0, size: 12 });
        },
      });
    },

    deleteSelected(item) {
      this.deleteItemId = item.id;
      this.showDeleteModal = true;
    },

    handleDelete(id) {
      this.processRequest({
        method: "delete",
        url: `/omcs/${id}`,
        onSuccess: () => {
          this.$store.dispatch("getListOfOmc", { page: 0, size: 12 });
        },
      });

      this.showDeleteModal = false;
    },

    handleNewOmc() {
      this.defaultValues = {};
      this.editMode = false;
      this.initOmcForm();
    },

    initOmcForm() {
      this.formFields = [
        {
          label: "Pays",
          type: "select",
          required: true,
          model: "countryLabel",
          options: this.retlistOfSimpleCountryLabel,
        },
        {
          label: "Année",
          type: "select",
          required: true,
          model: "year",
          options: this.retlistOfYearBetw95ToNow,
        },
      ];

      this.showOmcForm = true;
    },

  checkToPage(page) {
      this.currentPage = page;
      this.$store.dispatch("getListOfOmc", {
        page: this.currentPage,
        size: 12,
      });
    },
  },

  mounted() {
    this.showSpinner = true;
    this.$store.dispatch("getListOfOmc", { page: 0, size: 12 }).then(() => {
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