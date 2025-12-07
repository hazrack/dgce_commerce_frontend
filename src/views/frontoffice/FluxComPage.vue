<template>
  <div>
    <UnderNavComponent />
    <div class="container-fluid my-5">
      
      <div class="btn-right my-4" v-if="filterByType =='both'">
        <button
          class="btn-custom"
          @click="downloadFile"
          title="Exporter les flux globaux de l'exercice sélectionné"
        >
          <i class="bi bi-box-arrow-up"></i> Exporter les données
        </button>
      </div>

      <div class="row">
        <div class="col-md-2 mb-3">
          <FormSelectAreaComponent
            :fields="selectFluxDatas"
            :initial-values="packTrade"
            @field-changed="handleFieldFluxChange"
            @search="performSearch"
          />
        </div>

        <div class="col-md-10">
          <div class="block-trade-table" v-if="tableData.length !== 0">
            <TableComponent :table-data="tableData" :fields="tablefields" />
          </div>
          <div v-else>
            <NoResultsMessageComponent :message="filterMessage" />
          </div>

          <div class="scroll-sm-pagin">
            <PaginnationComponent
              :current-page="currentPage"
              :total-pages="totalPages"
              :maxvisible-pages="maxVisiblePages"
              @page-change="checkToPage"
            />
          </div>
        </div>
      </div>

      <LoaderBlockComponent :isLoading="showSpinner" :message="loaderMessage" />
    </div>
  </div>
</template>

<script>
import TableComponent from "../../components/front/TableComponent.vue";
import PaginnationComponent from "../../components/front/PaginnationComponent.vue";
import FormSelectAreaComponent from "../../components/front/FormSelectAreaComponent.vue";
import NoResultsMessageComponent from "../../components/front/NoResultsMessageComponent.vue";
import filterTableMixin from "../../mixins/filterTableMixin.js";
import LoaderBlockComponent from "../../components/front/LoaderBlockComponent.vue";
import SearchInputComponent from "../../components/front/SearchInputComponent.vue";
import UnderNavComponent from "@/components/front/UnderNavComponent.vue";
import actionMixin from "@/mixins/actionMixin";

export default {
  data() {
    return {};
  },

  mixins: [filterTableMixin, actionMixin],

  components: {
    FormSelectAreaComponent,
    TableComponent,
    PaginnationComponent,
    LoaderBlockComponent,
    SearchInputComponent,
    NoResultsMessageComponent,
    UnderNavComponent,
  },
  methods: {
    downloadFile() {
      this.showSpinner = true;
      this.loaderMessage = "Exportation des flux globaux en cours ...";
      //EXPORTER LES ECHANGES D'UNE ANNEE
      const fileName = "Flux-Commerciaux-Exercice-" + this.filterYear + ".csv";
      const url = `/trade-flow/countries/rankings/export?year=${this.filterYear}`;
      this.downloadFromBackend(url, fileName);
    },
  },

  mounted() {},
};
</script>

<style scoped lang="scss">
.btn-right {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>