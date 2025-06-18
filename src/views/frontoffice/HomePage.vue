<template>
  <div class="homepage-space">
    <div class="home-apropos-block my-5">
      <div class="container">
        <div class="details-apropos">
          <h2 class="top-title-block">D G C E</h2>
          <div class="details-text">
            <p>
              Les Accords commerciaux constituent un fondement essentiel pour le
              développement des relations commerciales internationales. Ces
              Accords facilitent le déploiement de la politique commerciale des
              Etats. Ils visent à créer de meilleures opportunités d'affaires
              pour les entreprises, en leur assurant plus de prévisibilité dans
              le développement de leurs partenariats et dans la surmontée des
              obstacles au commerce. Cette cartographie fournit des
              renseignements clés sur les Accords commerciaux préférentiels et
              non préférentiels signés par la Côte d'Ivoire, ainsi que sur les
              flux commerciaux qui dynamisent ses relations avec les partenaires
              internationaux.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="espace-stats container my-5">
      <div class="row">
        <div class="col-md-6">
          <div class="px-5 fw-bold my-4">
            <p class="head-stats">Accords commerciaux</p>
          </div>
          <DonutInteractive
            v-if="donutData.length > 0"
            :dataParsed="donutData"
          />
        </div>

        <div class="col-md-6">
          <div class="text-center fw-bold my-4 espace-stats-head">
            <p class="head-stats">Flux d'échange commerciaux</p>
          </div>
          <BarChart
            :labels="labelsParContinent"
            :datasets="barChartDataParContinent"
          />
        </div>
      </div>
    </div>

    <div class="w-50 mx-auto">
      <BarChart :labels="labelsParAnnee" :datasets="barChartData" />
    </div>

    <div class="home-partenaire-block default-space">
      <div class="text-center">
        <h2 class="top-title-block">STRUCTURES</h2>
      </div>

      <PartenaireComponent />
    </div>

    <LoaderBlockComponent :isLoading="showSpinner" :message="loaderMessage" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PartenaireComponent from "../../components/front/PartenaireComponent.vue";
import DonutInteractive from "../../components/stats/DonutInteractive.vue";
import LoaderBlockComponent from "../../components/front/LoaderBlockComponent.vue";
import BarChart from "../../components/stats/BarsChart.vue";

export default {
  data() {
    return {
      packs: {},
      showSpinner: false,
      loaderMessage: "Chargement...",

      donutData: [],
      barChartData: [],
    };
  },
  created() {},
  components: {
    PartenaireComponent,
    DonutInteractive,
    BarChart,
    LoaderBlockComponent,
  },

  computed: {
    ...mapGetters(["retglobalStats", "retstatsSeriesHistory"]),

    labelsParAnnee() {
      //STATS BARCHAT FLUX 7 ANNEE EN ARRIERE
      const endYear = new Date().getFullYear(); // Exemple : 2024
      return Array.from({ length: 7 }, (_, i) => endYear - 7 + i);
    },
    labelsParContinent() {
      return ["Afrique", "Europe", "Asie", "Amérique", "Océanie"];
    },
    barChartDataParContinent() {
      return this.generateBarChartDataParContinent();
    },
  },

  watch: {
    retglobalStats: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.initStatsBlock();
        }
      },
    },

    retstatsSeriesHistory: {
    immediate: true,
    handler(newValue) {
      if (Array.isArray(newValue) && newValue.length > 0) {
        this.initStatsSeriesHistory();
      } else {
        this.loadData();
      }
    },
  },
  },

  methods: {
    initStatsBlock() {

      if (this.retglobalStats.agreementsBilateral == undefined) {
        this.loadData();
        return;
      }

      this.donutData = [
        {
          name: "BILATERAUX",
          value: this.retglobalStats.agreementsBilateral,
          color: "#FFB500",
        },
        {
          name: "MULTILATERAUX",
          value: this.retglobalStats.agreementsMultilateral,
          color: "#008C00",
        },
        {
          name: "REGIONNAUX",
          value: this.retglobalStats.agreementsRegional,
          color: "#000000",
        },
      ];
    },

    initStatsSeriesHistory() {
      console.log("LE retour des stats", this.retstatsSeriesHistory[0].label);
      // console.log("LE retour des stats", this.retstatsSeriesHistory);



      const colors = [
        "#1f77b4",
        "#6baed6",

        "#ff7f0e",
        "#ffbb78",

        "#2ca02c",
        "#98df8a",

        "#d62728",
        "#ff9896",

        "#9467bd",
        "#c5b0d5",
      ];

      // Transforme les données reçues en format attendu pour barChartData
      this.barChartData = this.retstatsSeriesHistory.map((item, index) => ({
        label: item.label,
        data: item.data,
        backgroundColor: colors[index % colors.length], // cycle dans les couleurs
      }));
    },

    loadData() {
      this.showSpinner = true;
      Promise.all([
        this.$store.dispatch("getGlobalStats"),
        this.$store.dispatch("getStatsSeriesHistory"),
      ]).finally(() => {
        this.showSpinner = false;
      });
    },

    generateBarChartDataParContinent() {
      const continents = ["Afrique", "Europe", "Asie", "Amérique", "Océanie"];

      // Tableaux pour chaque dataset
      const importationAn1 = [];
      const exportationAn1 = [];
      const importationAn2 = [];
      const exportationAn2 = [];

      continents.forEach((continent) => {
        const importEntry = this.retstatsSeriesHistory.find(
          (item) => item.label === `${continent} - Importation`
        );
        const exportEntry = this.retstatsSeriesHistory.find(
          (item) => item.label === `${continent} - Exportation`
        );

        const importData =
          importEntry && importEntry.data ? importEntry.data : [];
        const exportData =
          exportEntry && exportEntry.data ? exportEntry.data : [];

        const importAn1 =
          importData.length >= 1 ? importData[importData.length - 1] : 0;
        const importAn2 =
          importData.length >= 2 ? importData[importData.length - 2] : 0;

        const exportAn1 =
          exportData.length >= 1 ? exportData[exportData.length - 1] : 0;
        const exportAn2 =
          exportData.length >= 2 ? exportData[exportData.length - 2] : 0;

        importationAn1.push(importAn1);
        importationAn2.push(importAn2);
        exportationAn1.push(exportAn1);
        exportationAn2.push(exportAn2);
      });

      const currentYear = new Date().getFullYear();

      return [
        {
          label: `Importation ${currentYear - 1}`,
          backgroundColor: "#1f77b4",
          data: importationAn1,
        },
        {
          label: `Exportation ${currentYear - 1}`,
          backgroundColor: "#ff7f0e",
          data: exportationAn1,
        },
        {
          label: `Importation ${currentYear - 2}`,
          backgroundColor: "#2ca02c",
          data: importationAn2,
        },
        {
          label: `Exportation ${currentYear - 2}`,
          backgroundColor: "#d62728",
          data: exportationAn2,
        },
      ];
    },
  },

  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.home-apropos-block {
  .details-apropos {
    padding: 20px;
    background: #f8f9fa; // Légère teinte pour ressortir
    border-radius: 15px;
    box-shadow: 0px 4px 10px #0000008f;

    .details-text {
      font-size: 16px;
      line-height: 1.6;
      color: #555;
      margin-bottom: 20px;
    }
  }
}

.head-stats {
  text-transform: uppercase;
  font-size: 20px !important;
}
</style>

