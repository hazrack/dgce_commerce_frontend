<template>
  <div class="espace-organisation">
    <div
      class="descript-block d-flex align-items-center justify-content-end mt-4"
    >
      <button class="btn-custom" @click="handleNewUser">
        <i class="bi bi-plus-circle"></i> Ajouter un utilisateurs
      </button>
    </div>

    <div class="block-table-list mt-5">
      <TableComponent
        :table-data="tableData"
        :fields="tablefields"
        @edit="fillEditInputPacksData"
        @delete="deleteSelected"
        :loginUserRole="loginUserRole"
      />
    </div>

    <div class="area-form">
      <b-modal id="user-modal-form" hide-footer v-model="showUserForm">
        <template #header>
          <div class="d-flex justify-content-between w-100">
            <div>
              <p class="suffix-clicked">
                <span v-if="!editMode">Nouveau utilisateur </span>
                <span v-else>Modification utilisateur </span>
              </p>
            </div>
            <div>
              <span class="close-modal-icon" @click="showUserForm = false">
                <i class="bi bi-x-lg"></i>
              </span>
            </div>
          </div>
        </template>
        <div class="espace-formulaire mt-5 mb-4">
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

    <div class="my-4">
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
      @update:show="(val) => (showDeleteModal = val)"
    />

    <LoaderBlockComponent :isLoading="showSpinner" :message="loaderMessage" />
  </div>
</template>

<script>
import FormGlobalComponent from "../../components/front/FormGlobalComponent.vue";
import LoaderBlockComponent from "../../components/front/LoaderBlockComponent.vue";
import PaginnationComponent from "../../components/front/PaginnationComponent.vue";
import TableComponent from "../../components/front/TableComponent.vue";
import { mapGetters } from "vuex";
import axios from "../../services/index.js";
import Swal from "sweetalert2";
import ConfirmDeleteModal from "../../components/front/ConfirmDeleteModal.vue";
import actionMixin from "../../mixins/actionMixin.js";

export default {
  data() {
    return {
      formFields: [],
      showUserForm: false,
      userTextBtn: "Enregistrer L'utilisateur",
      editMode: false,
      showSpinner: false,
      deleteItemId: 0,
      showDeleteModal: false,
      defaultValues: {},
      currentPage: 0,
      totalPages: 1,
      maxVisiblePages: 5,
      loginUserRole: "admin",
      packFlux: {},
      tableData: [],
      loaderMessage: "Chargement...",
      tablefields: [
        { key: "id", label: "id" },
        { key: "name", label: "Nom" },
        { key: "firstname", label: "Prenom" },
        { key: "email", label: "Email" },
        { key: "role", label: "Roles" },
        { key: "action", label: "Action" },
      ],
    };
  },

  mixins: [actionMixin],

  components: {
    FormGlobalComponent,
    PaginnationComponent,
    TableComponent,
    LoaderBlockComponent,
    ConfirmDeleteModal,
  },

  computed: {
    ...mapGetters(["retlistOfUsers"]),
  },

  watch: {
    retlistOfUsers: {
      immediate: true, // Exécute dès le montage
      handler(newValue) {
        if (
          newValue &&
          Array.isArray(newValue.datas) &&
          newValue.datas.length > 0
        ) {
          this.initListOfUsersBlock();
        }
      },
    },
  },

  methods: {
    initListOfUsersBlock() {
      this.currentPage = this.retlistOfUsers.currentPage;
      this.pageSize = this.retlistOfUsers.pageSize;
      this.totalItems = this.retlistOfUsers.totalItems;
      this.totalPages = this.retlistOfUsers.totalPages;
      this.tableData = this.retlistOfUsers.datas;
    },

    handleFormSubmit(formData) {
      this.showSpinner = true;
      let url = "";
      let method = "";

      if (this.editMode) {
        url = `/users/edit-info/${formData.id}`;
        method = "put";
        formData.email = null;
      } else {
        url = `/users/register`;
        method = "post";
      }

      this.processRequest({
        method,
        url,
        data: formData,
        onSuccess: () => {
          this.$store.dispatch("getListOfUsers", { page: 0, size: 10 });
        },
      });
    },

    handleNewUser() {
      this.defaultValues = {};
      this.editMode = false;
      this.initCreateUserForm();
    },

    initCreateUserForm() {
      this.formFields = [
        {
          label: "Nom",
          type: "text",
          required: true,
          model: "name",
        },
        {
          label: "Prénoms",
          type: "text",
          required: true,
          model: "firstname",
        },
        {
          label: "Email",
          type: "email",
          required: true,
          model: "email",
        },

        {
          label: "Mot de passe",
          type: "password",
          required: true,
          model: "password",
        },
        {
          label: "Confirmation de mot de passe",
          type: "password",
          required: true,
          model: "passwordConfirm",
        },
      ];

      this.userTextBtn = "Enregistrer L'utilisateur";

      this.showUserForm = true;
    },

    checkToPage(page) {
      this.currentPage = page;
      this.$store.dispatch("getListOfUsers", {
        page: this.currentPage,
        size: 10,
      });
    },

    fillEditInputPacksData(item) {
      this.defaultValues = { ...item };
      this.defaultValues.roles = item.roles;
      this.editMode = true;
      this.initEditUserForm();
      console.log("La valeur a editer ", this.defaultValues);
    },

    deleteSelected(item) {
      this.deleteItemId = item.id;
      this.showDeleteModal = true;
    },

    handleDelete(id) {
      console.log("Suppression en cours de l’élément", id);
      this.processRequest({
        method: "delete",
        url: `/users/${id}`,
        onSuccess: () => {
          this.$store.dispatch("getListOfUsers", { page: 0, size: 10 });
        },
      });

      this.showDeleteModal = false;
    },

    initEditUserForm() {
      this.formFields = [
        {
          label: "Nom",
          type: "text",
          required: true,
          model: "name",
        },
        {
          label: "Prénoms",
          type: "text",
          required: true,
          model: "firstname",
        },

        {
          label: "Roles",
          type: "select",
          required: true,
          model: "roles",
          options: [
            { value: "admin", label: "ADMINISTRATEUR" },
            { value: "agent", label: "AGENT" },
            { value: "util", label: "UTILISATEUR" },
          ],
        },
      ];

      this.userTextBtn = "Modifier L'utilisateur";

      this.showUserForm = true;
    },
  },
  mounted() {
    this.showSpinner = true;
    this.$store.dispatch("getListOfUsers", { page: 0, size: 10 }).then(() => {
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
</style>