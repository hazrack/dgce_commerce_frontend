<template>
  <div class="my-5">
    <div>
      <div class="mx-4" v-if="tableData.length !== 0">
        <TableComponent
          :table-data="tableData"
          :fields="tablefields"
          @downloadCoopec="downloadCoopecFile"
        />

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

     

    <LoaderBlockComponent :isLoading="showSpinner" :message="loaderMessage" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoaderBlockComponent from "@/components/front/LoaderBlockComponent.vue";
import NoResultsMessageComponent from "@/components/front/NoResultsMessageComponent.vue";
import TableComponent from "@/components/front/TableComponent.vue";
import PaginnationComponent from "@/components/front/PaginnationComponent.vue";
import actionMixin from "@/mixins/actionMixin";

export default {
  data() {
    return {
      loaderMessage: "Chargement...",
      showSpinner: false,
      currentPage: 0,
      totalPages: 1,
      listOfCoopec: "",

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

  components: {
    TableComponent,
    LoaderBlockComponent,
    NoResultsMessageComponent,
    PaginnationComponent
  },
  computed: {
    ...mapGetters(["retlistOfAgreement"]),
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
          this.initCooperation();
        } else {
          this.showSpinner = false;
          this.tableData = [];
        }
      },
    },
  },
  methods: {
    downloadCoopecFile(documentUrl) {
      console.log("====================================");
      console.log("ITEM RECU ", documentUrl);
      console.log("====================================");
      this.showSpinner = true;
      const fileName = documentUrl.split("/").pop();
      const url = `/agreements/download?filename=${encodeURIComponent(fileName)}`;
      this.downloadFromBackend(url, fileName);
    },

    initCooperation() {
      this.currentPage = this.retlistOfAgreement.currentPage;
      this.totalPages = this.retlistOfAgreement.totalPages;
      this.tableData = this.retlistOfAgreement.datas;
      this.showSpinner = false;
      console.log("LE COOPEC", this.tableData);
    },
    checkToPage(page) {
      this.currentPage = page;
      this.$store.dispatch("getListOfAgreement", {
        page: this.currentPage,
        size: 5,
      });
    },
  },

  mounted() {
    setTimeout(() => {
              this.$store.dispatch("getListOfAgreement", { page: 0, size: 5 });
    }, 100);
  },
};
</script>

<style>
</style>