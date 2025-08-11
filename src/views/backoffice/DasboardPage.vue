<template>
  <div class="dashboard-container">
    <div class="dashboard-head">
      <div
        class="stat-card"
        v-for="(item, index) in headStats"
        :key="index"
        :style="{ '--card-color': item.color || '#3B82F6' }"
      >
        <div class="stat-icon">
          <img
            :src="getIconUrl(item.icon)"
            :alt="item.title"
            class="icon-img"
          />
        </div>

        <div class="stat-value">{{ item.total }}</div>
        <div class="stat-title">{{ item.title }}</div>
      </div>
    </div>



    <LoaderBlockComponent :isLoading="showSpinner" :message="loaderMessage" />

    
  </div>

</template>

<script>
import { color } from "d3";
import { mapGetters } from "vuex";
import LoaderBlockComponent from "../../components/front/LoaderBlockComponent.vue";

export default {
  data() {
    return {
      headStats: [],
      showSpinner: false,
      loaderMessage: "Chargement...",

    };
  },

  components: {
    LoaderBlockComponent
  },
  computed: {
    ...mapGetters([
      "retglobalStats"
    ]),
  },

  watch: {
    retglobalStats: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.initHeadStats();
        } 
      },
    },
  },

  methods: {
    initHeadStats() {
      this.headStats = [
        {
          total: this.retglobalStats.totalAgreements || 0,
          title: "ACCORDS COMMERCIAUX",
          icon: "accord-trade.svg",
          color: "#ff6b07",
        },
        {
          total: this.retglobalStats.totalTradeFlow,
          title: "FLUX COMMERCIAUX",
          icon: "flux-trade.svg",
          color: "",
        },
        {
          total: this.retglobalStats.totalOrganizations || 0,
          title: "ORGANISATION",
          icon: "team-group.svg",
          color: "#008c00",
        },
        {
          total: this.retglobalStats.totalProducts,
          title: "PRODUIT",
          icon: "check-product.svg",
          color: "#990033",
        },
      ];
    },

    getIconUrl(fileName) {
      return new URL(`../../assets/icons/${fileName}`, import.meta.url).href;
    },
  },
  mounted() {
    this.showSpinner = true;
    this.$store.dispatch("checkValidateToken");
    this.$store.dispatch("getGlobalStats").then(() => {
      this.$nextTick(() => {
        this.showSpinner = false;
      });
    });

   
  },
};
</script>


<style scoped lang="scss">

.dashboard-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90vh;

  .stat-card {
    width: 100%;
    margin: 10px;
    text-align: center;
    padding: 2px 2px 20px 2px;
    border-radius: 10px;
    box-shadow: 2px 2px 10px #000;
}

.stat-icon {
    width: auto;
    border-radius: 30px;
    margin: 10px;
    // background: #090909;

    .icon-img {
    width: 100%;
}
}

.stat-value, .stat-title {
    font-weight: bold !important;
    font-size: 15px !important;
    text-shadow: 0px 0px 1px #000;
    letter-spacing: 2px;
}

}

</style>