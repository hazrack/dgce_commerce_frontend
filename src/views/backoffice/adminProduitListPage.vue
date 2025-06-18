<template>
  <div class="espace-organisation">
    <div
      class="descript-block d-flex align-items-center justify-content-between"
    >
      <div class="">
        <SearchInputComponent @search="performSearch" />
      </div>

      <!-- <div class="mb-4">
        <button class="btn-custom" @click="handleNewProduct">
          <i class="bi bi-plus-circle"></i> Ajouter un produit
        </button>
      </div> -->
    </div>

    <div class="country-list">
      <div>
        <div
          class="line-block-text my-3"
          v-for="(product, index) in listOfProduct"
          :key="index"
        >
          <div
            class="line-title d-flex align-items-center justify-content-between"
          >
            <div class="info-orga">
              <p class="shadow-ttle">{{ product.labelProduct }}</p>
            </div>

            <div class="editing-block">
              <!-- <button class="edite-btn" @click="handleEditClick(product)">
                <span><i class="bi bi-pencil-square"></i> Modifier </span>
              </button>
              <button class="delete-btn" @click="deleteSelected(product)">
                <span><i class="bi bi-trash"></i> Supprimer </span>
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <NoResultsMessageComponent :message="'Aucun produit trouvé pour cette recherche'" v-if="listOfProduct.length === 0" />



    <div class="area-form">
      <b-modal id="modal-global-form" v-model="showProductForm">
        <template #header>
          <p class="suffix-clicked">
            <span v-if="!editMode">Création</span>
            <span v-else>Edition</span> d'un produit
          </p>
        </template>
        <div class="espace-formulaire">
          <FormGlobalComponent
            :fields="formFields"
            :showFile="false"
            :initialData="defaultValues"
            @form-submitted="handleFormSubmit"
          />
        </div>
      </b-modal>
    </div>

    <div class="my-4 pt-4 ">
      <PaginnationComponent 
            :current-page="currentPage"
            :total-pages="totalPages"
            :maxvisible-pages="maxVisiblePages"
            @page-change="checkToPage"
          />
    </div>

    <ConfirmDeleteModal
      :item-id="deleteItemId"
      @confirm-delete="handleDelete"
    />

    <LoaderBlockComponent :isLoading="showSpinner" />
  


  </div>
</template>

<script>
import FormGlobalComponent from "../../components/front/FormGlobalComponent.vue";
import PaginnationComponent from "../../components/front/PaginnationComponent.vue";
import SearchInputComponent from "../../components/front/SearchInputComponent.vue";
import { mapGetters } from "vuex";
import axios from "../../services/index.js";
import Swal from "sweetalert2";
import actionMixin from "../../mixins/actionMixin.js";
import ConfirmDeleteModal from "../../components/front/ConfirmDeleteModal.vue";
import LoaderBlockComponent from "../../components/front/LoaderBlockComponent.vue";
import NoResultsMessageComponent from "../../components/front/NoResultsMessageComponent.vue";

export default {
  data() {
    return {
      formFields:[],
      showProductForm:false,
      showSpinner: false,
      userTextBtn: "Soumettre le produit ",
      editMode:false,
      deleteItemId: 0,
      defaultValues: {},
      currentPage: 0, 
      totalPages: 1, 
      maxVisiblePages: 5,
      packflux:{},
      listOfProduct: []
    };
  },

  mixins: [actionMixin],

  components: {
    SearchInputComponent,
    FormGlobalComponent,
    PaginnationComponent,
    ConfirmDeleteModal,
    LoaderBlockComponent,
    NoResultsMessageComponent
  },
  
  computed: {
    ...mapGetters([
      "retlistOfProducts",
    ]),
  },

  watch: {
    retlistOfProducts: {
      immediate: true,
      handler(newValue) {
        if (newValue && Array.isArray(newValue.datas) && newValue.datas.length > 0) {
          this.initListOfProductsBlock();
        } else {
          this.listOfProduct = [];
        }
      },
    },
  },

 
  methods: {
    initListOfProductsBlock(){
      console.log("Les produis ", this.retlistOfProducts);
      this.currentPage = this.retlistOfProducts.currentPage;
      this.totalPages = this.retlistOfProducts.totalPages;
      this.listOfProduct = this.retlistOfProducts.datas;
    },
    performSearch(query) {
      console.log("ADMIN PAGE SEARCH:", query);
      console.log("la longueur du query :", query.length);

      if (query.length >= 2) {
        this.$store.dispatch("SearchListOfProduct", { value:query});
      }

      if (query.length == 0) {
        this.$store.dispatch("getListOfProducts", { page: 0, size: 12 });
      }

    },

  

    handleFormSubmit(formData) {
      console.log("LA SOUSCRIPTION ", formData);
      this.showSpinner = true;

      let url = "";
      let method = "";

      if (this.editMode) {
        url = `/products/${formData.id}`;
        method = "put";
      } else {
        url = `/products/create`;
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
          this.showProductForm = false;
          Swal.fire({
            title: "Succès !",
            text: "Action effectuée avec succès !",
            timer: 2500,
            showConfirmButton: false,
          });
          this.$store.dispatch("getListOfProducts", { page: 0, size: 12 });

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

    handleEditClick(item) {
      console.log("edit area", item);
      this.defaultValues = {...item};
      this.editMode = true;
      this.initProductForm();
    },

    deleteSelected(item) {
      this.deleteItemId = item.id;
      this.$bvModal.show("confirm-delete-modal");
    },

    handleDelete(id) {
      this.processRequest({
        method: "delete",
        url: `/products/${id}`,
        onSuccess: () => {
          this.$store.dispatch("getListOfProducts", { page: 0, size: 12 });
        },
      });
    },

    handleNewProduct() {
      this.defaultValues = {};
      this.editMode = false;
      this.initProductForm();
    },

    initProductForm() {

      this.formFields = [
      {
          label: "Libellé ",
          type: "text",
          required: true,
          model: "labelProduct",
        },
      ];

      this.showProductForm = true;
    },

    checkToPage(page) {
      this.currentPage = page;
      this.$store.dispatch("getListOfProducts", {
        page: this.currentPage,
        size: 12,
      });
    },

  },

  mounted() {
    this.showSpinner = true;
    this.$store.dispatch("getListOfProducts", { page: 0, size: 12 }).then(() => {
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

.country-list{
  .line-block-text{
    padding: 10px 20px;
  }
}
</style>