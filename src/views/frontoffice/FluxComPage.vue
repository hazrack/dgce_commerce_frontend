<template>
  <div>
   <UnderNavComponent />
  <div class="container-fluid my-5">

    <div class="row">

      <div class="col-md-2">
        <FormSelectAreaComponent 
          :fields="selectFluxDatas"
          :initial-values="packTrade"
          :showMoreProductBtn="true"
          @is-more-product="checkSearchProduct"
          @field-changed="handleFieldFluxChange"
        />

        <div v-if="showSearch">
          <SearchInputComponent :placeHolderText="'Autres produits..'" @search="performSearch" />
        </div>
        
      </div>

      <div class="col-md-10">
        <div class="block-trade-table" v-if="tableData.length !== 0">
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

export default {
  data() {
    return {

      showSearch:false,


    };
  },

  mixins: [filterTableMixin],

  components: {
    FormSelectAreaComponent,
    TableComponent,
    PaginnationComponent,
    LoaderBlockComponent,
    SearchInputComponent,
    NoResultsMessageComponent,
    UnderNavComponent
  },
  methods: {
    checkSearchProduct(value) {
      this.showSearch = value;
    },
  },

  mounted() {
    console.log("LE HORS PRIMES");
    
  },
};
</script>

<style scoped lang="scss">

</style>