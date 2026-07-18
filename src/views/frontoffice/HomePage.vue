<template>
  <div>
    <WelcomeModal />

    <div class="show-on-mobile">
          <UnderNavComponent />
    </div>
    <div class="homepage-space">
       <!-- Section Ministre -->
      <div class="ministre-section">
        <div class="container">
          <div class="ministre-content">
            <div class="ministre-image-wrapper">
              <div class="ministre-image-container">
                <img
                  src="../../assets/images/img-ministre-1.jpeg"
                  alt="Ministre du Commerce"
                  class="ministre-photo"
                />
                <div class="ministre-badge">
                  <span>Mr. Ibrahim Kalil Konaté </span>
                </div>
              </div>
            </div>
            <div class="ministre-info">
              <div class="ministre-header">
                <h3 class="ministre-title">Message du Ministre</h3>
                <div class="ministre-divider"></div>
              </div>
              <div class="ministre-text">
                <p class="ministre-quote">
                  "Le développement du commerce extérieur de la Côte d'Ivoire
                  constitue l'une des priorités majeures de notre Pays. Nous
                  nous engageons à faciliter les échanges commerciaux
                  internationaux et à créer un environnement propice aux
                  affaires."
                </p>
                <div class="ministre-signature">
                  <p class="signature-name">
                    Le Ministre du Commerce et de l’Industrie
                  </p>
                  <p class="signature-title">République de Côte d'Ivoire</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="home-apropos-block my-5">
        <div class="container">
          <div class="details-apropos">
            <!-- <h2 class="top-title-block">DIRECTION GÉNÉRALE DU COMMERCE EXTÉRIEUR (DGCE)</h2> -->
            <div class="details-text">
              <p>
                Les Accords commerciaux constituent un fondement essentiel pour
                le développement des relations commerciales internationales.
                <br />
                Ces Accords facilitent le déploiement de la politique
                commerciale des Etats. Ils visent à créer de meilleures
                opportunités d'affaires pour les entreprises, en leur assurant
                plus de prévisibilité dans le développement de leurs
                partenariats et dans la surmontée des obstacles au commerce.
                <br />
                Cette cartographie fournit des renseignements clés sur les
                Accords commerciaux préférentiels et non préférentiels signés
                par la Côte d'Ivoire, ainsi que sur les flux commerciaux qui
                dynamisent ses relations avec les partenaires internationaux.
              </p>
            </div>
          </div>
        </div>
      </div>

     

      <div class="my-5 text-center big-screen-second-chart">
          <h3 class="ministre-title">Tableau statistique par année</h3>
        <div class="center-divider">
          <div class="ministre-divider"></div>
        </div>
      </div>

      <div class="espace-stats container my-5 big-screen-second-chart">
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
              <p class="head-stats">Flux d'échanges commerciaux</p>
            </div>
            <BarChart
              :labels="labelsParContinent"
              :datasets="barChartDataParContinent"
            />
          </div>
        </div>
      </div>

      <div class="w-50 my-5 mx-auto big-screen-second-chart">
        <BarChart :labels="labelsParAnnee" :datasets="barChartData" />
      </div>

      <div>
        <div class="text-center">
          <h2 class="ministre-title">Structures partenaires</h2>
          <div class="center-divider">
          <div class="ministre-divider"></div>
        </div>
        </div>
        <PartenaireComponent />
      </div>

      <LoaderBlockComponent :isLoading="showSpinner" :message="loaderMessage" />
    </div>


  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PartenaireComponent from "../../components/front/PartenaireComponent.vue";
import DonutInteractive from "../../components/stats/DonutInteractive.vue";
import LoaderBlockComponent from "../../components/front/LoaderBlockComponent.vue";
import BarChart from "../../components/stats/BarsChart.vue";
import UnderNavComponent from "@/components/front/UnderNavComponent.vue";
import WelcomeModal from "@/components/front/WelcomModalComponent.vue";
import QuillEditor from "@/components/front/QuillEditorComponent.vue";  

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
    UnderNavComponent,
    WelcomeModal,
    QuillEditor
  },

  computed: {
    ...mapGetters(["retglobalStats", "retstatsSeriesHistory"]),

    labelsParAnnee() {
      //STATS BARCHAT FLUX 7 ANNEE EN ARRIERE
      const endYear = new Date().getFullYear(); // Exemple : 2024
      // return Array.from({ length: 7 }, (_, i) => endYear - 7 + i);
      return Array.from({ length: 3 }, (_, i) => endYear - 3 + i);
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
        }
      },
    },
  },

  methods: {
    initStatsBlock() {
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
          name: "REGIONAUX",
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
        // data: item.data,
          data: item.data.slice(-3), // Recupererer les 3 dernières années valeurs sur les 7 ans
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
    //STRUCTURE CALL
    this.showSpinner = true;

    setTimeout(() => {
      //LOAD DATA
      this.loadData();
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.homepage-space {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  min-height: 100vh;
  padding: 2rem 0;
}

// Section DGCE existante
.home-apropos-block {
  .details-apropos {
    padding: 40px;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 102, 0, 0.1);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #ff6600 0%, #008c00 100%);
    }

    .top-title-block {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 2rem;
      text-align: center;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 3px;
        background: linear-gradient(90deg, #ff6600 0%, #008c00 100%);
        border-radius: 2px;
      }
    }

    .details-text {
      font-size: 18px;
      line-height: 1.8;
      color: #555;
      text-align: justify;
      margin-bottom: 0;

      p {
        margin: 0;
      }
    }
  }
}

.ministre-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 4rem 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(
        circle at 20% 50%,
        rgba(255, 102, 0, 0.05) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(0, 140, 0, 0.05) 0%,
        transparent 50%
      );
  }
}

.ministre-content {
  display: flex;
  align-items: center;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.ministre-image-wrapper {
  flex: 0 0 300px;
}

.ministre-image-container {
  position: relative;

  .ministre-photo {
    width: 280px;
    height: 350px;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border: 5px solid white;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.2);
    }
  }

  .ministre-badge {
    position: absolute;
    bottom: -20px;
    left: 47%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #ff6600 0%, #e55a00 100%);
    color: white;
    width: 80%;
    text-align: center;
    padding: 12px 30px;
    border-radius: 25px;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 1px;
    box-shadow: 0 8px 25px rgba(255, 102, 0, 0.3);

    span {
      position: relative;
      z-index: 1;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #008c00 0%, #006600 100%);
      border-radius: 25px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover::before {
      opacity: 1;
    }
  }
}

.ministre-info {
  flex: 1;
}

.ministre-header {
  margin-bottom: 2rem;
}
.ministre-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  text-shadow: 1px 1px 1px #000;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.ministre-divider {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #ff6600 0%, #008c00 100%);
  border-radius: 2px;
}
.center-divider{
  display: flex;
  justify-content: center;
  align-items: center;
}
.ministre-text {
  .ministre-quote {
    font-size: 1.25rem;
    line-height: 1.8;
    color: #555;
    font-style: italic;
    margin: 0 0 2rem 0;
    padding: 2rem;
    background: rgba(255, 102, 0, 0.05);
    border-left: 5px solid #ff6600;
    border-radius: 0 15px 15px 0;
    position: relative;

    &::before {
      content: '"';
      position: absolute;
      top: 10px;
      left: 15px;
      font-size: 3rem;
      color: #ff6600;
      font-family: Georgia, serif;
      line-height: 1;
    }

    &::after {
      content: '"';
      position: absolute;
      bottom: 10px;
      right: 15px;
      font-size: 3rem;
      color: #ff6600;
      font-family: Georgia, serif;
      line-height: 1;
    }
  }

  .ministre-signature {
    .signature-name {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0 0 0.5rem 0;
    }

    .signature-title {
      font-size: 1rem;
      color: #666;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
}

// Responsive
@media (max-width: 968px) {
  .ministre-content {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
  }

  .ministre-image-wrapper {
    flex: none;
  }

  .ministre-header .ministre-divider {
    margin: 0 auto;
  }
}

@media (max-width: 576px) {
  .ministre-image-container .ministre-photo {
    width: 250px;
    height: 300px;
  }
  .big-screen-second-chart {
    display: none;
  }

  .ministre-header .ministre-title {
    font-size: 2rem;
  }

  .ministre-text .ministre-quote {
    font-size: 1.1rem;
    padding: 1.5rem;
  }

  .home-apropos-block .details-apropos {
    padding: 25px;
  }

  .home-apropos-block .details-apropos .top-title-block {
    font-size: 2rem;
  }
  .show-on-mobile{
    display: block !important;
  }
}

.head-stats {
  text-transform: uppercase;
  font-size: 20px !important;
  color: #2c3e50;
  text-shadow: 1px 1px 1px #000;
}

.show-on-mobile{
  display: none;
}
</style>

