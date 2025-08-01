<template>
  <div>
    <UnderNavComponent />

    <div class="detail-servicepage-space">
      <div class="home-services-block">
        <div class="container my-5">
          <div class="row">
            <div class="col-md-3 mt-4">
              <SideTitleComponent
                :items="sideComTitleList"
                @item-selected="handleSideTitleSelection"
              />
            </div>

            <div class="col-md-9 mt-4">
              <div v-if="!showMultilateralBlock">
                <div class="select-flux">
                  <FormComponent
                    :fields="selectAccordDatas"
                    :initial-values="packs"
                    @field-changed="handleFieldChange"
                  />
                </div>

                <div class="my-4">
                  <l-map
                    :zoom="2"
                    :center="[29, 0]"
                    style="height: 500px; width: 100%"
                  >
                    <l-tile-layer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />

                    <l-marker
                      v-for="(marker, index) in markers"
                      :key="
                        index +
                        '-' +
                        (currentClick === marker.id ? 'green' : 'orange')
                      "
                      :lat-lng="[marker.lat, marker.lng]"
                      :icon="
                        getIcon(currentClick === marker.id ? 'green' : 'orange')
                      "
                    >
                      <LPopup>
                        <div
                          class="info-marque text-center"
                          @click="checkMarkerDetail(marker)"
                        >
                          <p>{{ marker.label }}</p>
                          <p role="button" class="label-orange">voir plus -></p>
                        </div>
                      </LPopup>
                    </l-marker>
                  </l-map>
                </div>
              </div>

              <div v-else>
                <!--  -->
                <!--  -->
                <!--  -->
                <!-- MUTILATERAL -->

                <div
                  class="top-multi-block-info d-flex align-items-center justify-content-end"
                >

                  <SwitchBlockComponent
                    :options="switchOptions"
                    @switchValue="toSwitchedCountry"
                  />
                </div>

                <div class="overflow-scroll-block multi-block-size">
                  <div v-if="!isSwitchCountry">
                    <div
                      class="line-block-text my-3"
                      v-for="(accord, index) in listOfmultiAccord"
                      :key="index"
                    >
                      <div
                        class="line-title d-flex align-items-center justify-content-between"
                      >
                        <p>
                          {{
                            accord.title.length > 70
                              ? accord.title.substring(0, 90) + "..."
                              : accord.title
                          }}
                        </p>

                        <span
                          class="icon-arrow custom-icon-space"
                          @click="seeAboutMultiAccord(accord)"
                        >
                          <i class="bi bi-arrow-right"></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div v-else>
                    <div
                      class="line-block-text my-3"
                      v-for="(country, index) in listOfCountry"
                      :key="index"
                    >
                      <div
                        class="line-title d-flex align-items-center justify-content-between"
                      >
                        <p>
                          {{ country.countryLabel }}
                        </p>

                        <p>Membre depuis {{ country.year }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="pt-4">
                    <PaginnationComponent
                      :current-page="currentPage"
                      :total-pages="totalPages"
                      :maxvisible-pages="maxVisiblePages"
                      @page-change="checkToPage"
                    />
                  </div>
                </div>

                <b-modal
                  id="modal-multi-flux"
                  hide-footer
                  v-model="showMultilateralModal"
                  >
                  <template #header>
                    <div class="d-flex justify-content-between w-100">
                      <div>
                        <p class="suffix-clicked">
                          <span>Accords Multilateral / </span>
                          <span class="label-orange"> OMC </span>
                        </p>
                      </div>
                      <div>
                        <span
                          class="close-modal-icon"
                          @click="showMultilateralModal = false"
                        >
                          <i class="bi bi-x-lg"></i>
                        </span>
                      </div>
                    </div>
                  </template>
                  <div class="mx-3">
                    <div>
                      <div class="line-block-text my-3">
                        <div class="text-center detail-title">
                          <p>{{ currentAccord.title }}</p>
                        </div>

                        <div class="detail-content my-4">
                          <div class="details-link">
                            <div v-if="currentAccord.documentUrl">
                              <a
                                href="#"
                                @click.prevent="
                                  downloadFile(currentAccord.documentUrl)
                                "
                                class="telechargement"
                              >
                                <span class="icon-arrow">
                                  Télécharger la pièce jointe
                                  <i class="bi bi-arrow-down"></i>
                                </span>
                              </a>
                            </div>

                            <div v-else>
                              <p class="not-file-link">Pas de pièce jointe</p>
                            </div>
                          </div>

                          <div
                            class="line-bottom d-flex align-items-center justify-content-between"
                          >
                            <p class="basique-line">Accord signé le :</p>
                            <p class="boucle-text">
                              {{ currentAccord.signDate }}
                            </p>
                          </div>
                          <div
                            class="line-bottom d-flex align-items-center justify-content-between"
                          >
                            <p class="basique-line">Accord signé à :</p>
                            <p class="boucle-text">
                              {{ currentAccord.signCountry }}
                            </p>
                          </div>
                          <div
                            class="line-bottom d-flex align-items-center justify-content-between"
                          >
                            <p class="basique-line">Entré en vigueur le :</p>
                            <p class="boucle-text">
                              {{ currentAccord.effectiveDate }}
                            </p>
                          </div>
                          <div class="text-center mt-4">
                            <p class="basique-line">DISPOSITIF DE SUIVI</p>
                            <hr class="detail-hr mx-auto" />
                            <p class="boucle-text mt-3">
                              {{ currentAccord.trackingDevice }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-modal>
              </div>

              <!--  -->
              <!--  -->
              <!--  -->
              <!--  -->
              <!--  -->
              <!-- MODAL REGIONNAL AND BILATERAL -->

              <b-modal
                id="modal-simple-flux"
                hide-footer
                v-model="showSimpleModal"
              >
                <template #header>
                  <div class="d-flex justify-content-between w-100">
                    <div>
                      <p class="suffix-clicked">
                        <span v-if="titleModalText == 1"
                          >Accords Billateraux /
                        </span>
                        <span v-if="titleModalText == 2"
                          >Accords regionnaux /
                        </span>
                        <span class="label-orange">{{
                          selectedCountry.label
                        }}</span>
                      </p>
                    </div>

                    <div>
                      <span
                        class="close-modal-icon"
                        @click="showSimpleModal = false"
                      >
                        <i class="bi bi-x-lg"></i>
                      </span>
                    </div>
                  </div>
                </template>
                <div class="mx-3">
                  <div
                    v-if="!showSimpleBlock"
                    class="overflow-scroll-block simple-block-size"
                  >
                    <div
                      class="line-block-text my-3"
                      v-for="(accord, index) in listOfAccord"
                      :key="index"
                    >
                      <div
                        class="line-title d-flex align-items-center justify-content-between"
                      >
                        <p>
                          {{
                            accord.title.length > 70
                              ? accord.title.substring(0, 70) + "..."
                              : accord.title
                          }}
                          <span class="custom-green" v-if="titleModalText == 2"
                            >( {{ accord.organizationLabel }} )</span
                          >
                        </p>

                        <span
                          class="icon-arrow custom-icon-space"
                          @click="seeAboutSimpleAccord(accord)"
                        >
                          <i class="bi bi-arrow-right"></i>
                        </span>
                      </div>
                    </div>

                    <NoResultsMessageComponent
                      :message="'Aucun Accord signé.'"
                      v-if="listOfAccord.length === 0"
                    />
                  </div>

                  <div v-else>
                    <div class="line-block-text my-3">
                      <div
                        class="d-flex align-items-center justify-content-between"
                      >
                        <div
                          class="custom-icon-space line-title mb-3"
                          @click="showSimpleBlock = !showSimpleBlock"
                        >
                          <span class="icon-arrow"
                            ><i class="bi bi-arrow-left"></i
                          ></span>
                        </div>

                        <div class="info-orga">
                          <span
                            class="custom-green"
                            v-if="titleModalText == 2"
                            >{{ currentAccord.organizationLabel }}</span
                          >
                        </div>
                      </div>

                      <div class="text-center detail-title">
                        <p>{{ currentAccord.title }}</p>
                      </div>

                      <div class="detail-content my-4">
                        <div class="details-link">
                          <div v-if="currentAccord.documentUrl">
                            <a
                              href="#"
                              @click.prevent="
                                downloadFile(currentAccord.documentUrl)
                              "
                              class="telechargement"
                            >
                              <span class="icon-arrow">
                                Télécharger la pièce jointe
                                <i class="bi bi-arrow-down"></i>
                              </span>
                            </a>
                          </div>

                          <div v-else>
                            <p class="not-file-link">Pas de pièce jointe</p>
                          </div>
                        </div>

                        <div
                          class="line-bottom d-flex align-items-center justify-content-between"
                        >
                          <p class="basique-line">Accord signé le :</p>
                          <p class="boucle-text">
                            {{ currentAccord.signDate }}
                          </p>
                        </div>
                        <div
                          class="line-bottom d-flex align-items-center justify-content-between"
                        >
                          <p class="basique-line">Accord signé à :</p>
                          <p class="boucle-text">
                            {{ currentAccord.signCountry }}
                          </p>
                        </div>
                        <div
                          class="line-bottom d-flex align-items-center justify-content-between"
                        >
                          <p class="basique-line">Entré en vigueur le :</p>
                          <p class="boucle-text">
                            {{ currentAccord.effectiveDate }}
                          </p>
                        </div>
                        <div class="text-center mt-4">
                          <p class="basique-line">DISPOSITIF DE SUIVI</p>
                          <hr class="detail-hr mx-auto" />
                          <p class="boucle-text mt-3">
                            {{ currentAccord.trackingDevice }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-modal>

              <!--  -->
              <!--  -->
              <!--  -->
              <!--  -->
              <!--  -->
            </div>
          </div>
        </div>
      </div>

      <LoaderBlockComponent :isLoading="showSpinner" :message="loaderMessage" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import SearchInputComponent from "../../components/front/SearchInputComponent.vue";
import SwitchBlockComponent from "../../components/front/SwitchBlockComponent.vue";
import SideTitleComponent from "../../components/front/SideTitleComponent.vue";
import FormComponent from "../../components/front/FormComponent.vue";
import LoaderBlockComponent from "../../components/front/LoaderBlockComponent.vue";
import NoResultsMessageComponent from "../../components/front/NoResultsMessageComponent.vue";
import actionMixin from "../../mixins/actionMixin.js";
import PaginnationComponent from "../../components/front/PaginnationComponent.vue";
import UnderNavComponent from "@/components/front/UnderNavComponent.vue";

export default {
  data() {
    return {
      activeDiv: 1,
      showMultilateralBlock: false,
      showSpinner: false,
      loaderMessage: "Chargement...",
      showSimpleModal: false,
      showMultilateralModal: false,
      isSwitchCountry: false,
      selectAccordDatas: [],
      packs: {
        paysBilalSelected: null,
        paysRegioSelected: null,
        orgaRegioSelected: null,
      },
      totalPages: 1,
      currentPage: 0,
      maxVisiblePages: 5,
      titleModalText: 1,
      switchOptions: [
        { id: "agreements", label: "Les ACCORDS", value: false },
        { id: "countries", label: "Les pays membres", value: true },
      ],

      selectedCountry: {
        label: "",
      },

      currentAccord: {
        title: "",
        link: "",
        signDate: "",
        signCountry: "",
        effectiveDate: "",
        trackingDevice: "",
        orga: "",
      },

      listOfCountry: [],

      listOfAccord: [],

      listOfmultiAccord: [],

      showSimpleBlock: false,

      currentClick: null,
      markers: [],
      sideComTitleList: [],
      regionalFilterMapData: [],
    };
  },

  mixins: [actionMixin],

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    SearchInputComponent,
    SwitchBlockComponent,
    SideTitleComponent,
    FormComponent,
    LoaderBlockComponent,
    NoResultsMessageComponent,
    PaginnationComponent,
    UnderNavComponent,
  },

  computed: {
    ...mapGetters([
      "retorgaSelectData",
      "retagreemBilatMapSelect",
      "retagreemBilatMapData",
      "retlistOfOrganization",
      "retlistOfAgreement",
      "retAgrementByCountryIdOrOrgaId",
      "retlistOfOmcs",
    ]),
  },

  watch: {
    retagreemBilatMapData: {
      immediate: true, // Exécute dès le montage
      handler(newValue) {
        if (newValue && Array.isArray(newValue) && newValue.length > 0) {
          this.initMapBillateralMarker(this.retagreemBilatMapData);
        }
      },
    },

    retlistOfAgreement: {
      immediate: true, // Exécute dès le montage
      handler(newValue) {
        if (
          newValue &&
          Array.isArray(newValue.datas) &&
          newValue.datas.length > 0
        ) {
          this.initMultilateralAgreement();
        } else {
          this.showSpinner = false;
          this.listOfmultiAccord = [];
        }
      },
    },

    retAgrementByCountryIdOrOrgaId: {
      immediate: true, // Exécute dès le montage
      handler(newValue) {
        if (
          newValue &&
          Array.isArray(newValue.datas) &&
          newValue.datas.length > 0
        ) {
          this.listOfAccord = this.retAgrementByCountryIdOrOrgaId.datas;
        } else {
          this.listOfAccord = [];
        }
      },
    },

    retlistOfOmcs: {
      immediate: true,
      handler(newValue) {
        if (
          newValue &&
          Array.isArray(newValue.datas) &&
          newValue.datas.length > 0
        ) {
          this.initListOfOmcsBlock();
        } else {
          this.listOfCountry = [];
        }
      },
    },
  },

  methods: {
    initMapBillateralMarker(brutCountries) {
      console.log("ON EST ICI OK OK", brutCountries);
      this.markers = brutCountries.map((item, index) => {
        const [latStr, lngStr] = item.latLng.split(",");
        const lat = parseFloat(latStr);
        const lng = parseFloat(lngStr);

        return {
          id: item.id,
          lat,
          lng,
          label: item.label,
          alphaCode3: item.alphaCode3,
          lieu: item.label, // ou autre champ si disponible
          color: "orange", // ou dynamiquement
        };
      });
    },

    getCountryInOrganizationById(id) {
      const currentOrga = this.retlistOfOrganization.find(
        (item) => item.id === id
      );
      if (currentOrga && currentOrga.countries) {
        this.regionalFilterMapData = currentOrga.countries;
        this.initMapBillateralMarker(this.regionalFilterMapData);
      }
    },

    initMultilateralAgreement() {
      this.currentPage = this.retlistOfAgreement.currentPage;
      this.totalPages = this.retlistOfAgreement.totalPages;
      this.listOfmultiAccord = this.retlistOfAgreement.datas;
      this.showSpinner = false;
      console.log("LE MULTI ACCORD ", this.listOfmultiAccord);
    },

    initListOfOmcsBlock() {
      console.log("LES OMCS ", this.retlistOfOmcs);
      this.currentPage = this.retlistOfOmcs.currentPage;
      this.totalPages = this.retlistOfOmcs.totalPages;
      this.listOfCountry = this.retlistOfOmcs.datas;
    },

    getIcon(color) {
      return new L.Icon({
        iconUrl: new URL(
          `../../assets/icons/marker-icon-${color}.png`,
          import.meta.url
        ).href,
        shadowUrl: new URL(
          "leaflet/dist/images/marker-shadow.png",
          import.meta.url
        ).href,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
    },

    bilaterauxInput() {
      this.selectAccordDatas = [
        {
          label: "Veuillez selectionner un pays",
          type: "select",
          model: "paysBilalSelected",
          required: false,
          options: this.retagreemBilatMapSelect,
        },
      ];
    },

    regionauxInput() {
      this.selectAccordDatas = [
        {
          label: "Veuillez selectionner une organisation",
          type: "select",
          model: "orgaRegioSelected",
          required: false,
          options: this.retorgaSelectData,
        },
      ];
    },

    initServiceBlock() {
      this.sideComTitleList = [
        { id: 1, title: " Billateraux" },
        { id: 2, title: " regionnaux" },
        { id: 3, title: " Multilateraux ( OMC )" },
      ];
    },

    checkMarkerDetail(marker) {
      console.log("les habitans de ce pays ", marker);
      //LORSQUE LE CHOIX EST BILLATERAL
      if (this.activeDiv === 1 && marker) {
        this.callFetchAgreement(marker.id);
      }

      if (marker) {
        this.currentClick = marker.id;
        this.packs.paysBilalSelected = marker.id;
        this.packs.paysRegioSelected = marker.id;
        this.selectedCountry.label = marker.label;

        this.showSimpleBlock = false;
        this.showSimpleModal = true;
      }
    },

    callFetchAgreement(id) {
      this.showSpinner = true;

      if (this.activeDiv === 1) {
        //RECUPERER LES ACCORD PAR L'ID DU PAYS
        this.fetchAgreements(null, id);
      } else if (this.activeDiv === 2) {
        //RECUPERER LES ACCORD PAR L'ID DE L'ORGANISATION
        this.fetchAgreements(id, null);
      }
    },

    fetchAgreements(organizationId = null, countryId = null) {
      this.$store.dispatch("getAgreementsByCountryIdOrOrgaId", {
        orgaId: organizationId,
        countryId: countryId,
      });
      setTimeout(() => {
        this.showSpinner = false;
      }, 1000);
    },

    handleFieldChange({ fieldName, value }) {
      console.log("*****Je veux voir le libele ", fieldName);
      console.log("****Je veux voir la value ", value);

      if (fieldName === "paysBilalSelected") {
        this.checkDataByCountry(value);
      } else if (fieldName === "orgaRegioSelected") {
        console.log("NOUs sommes ici");
        //RECUPERER LES PAYS CONTENU DANS L'ORGANISATION ET LES AFFICHER SUR LA MAP
        this.getCountryInOrganizationById(value);
        this.callFetchAgreement(value);
      }
    },

    checkDataByCountry(val) {
      const currentCountry = this.markers.find((item) => item.id === val);
      this.checkMarkerDetail(currentCountry);
      console.log("HELLO LES NAZES", currentCountry);
    },

    handleSideTitleSelection({ item, key }) {
      console.log("VOIR LA KEY ", key);

      this.activeDiv = key;
      this.titleModalText = key;

      this.packs.paysBilalSelected = null;
      this.packs.paysRegioSelected = null;

      if (key === 1) {
        this.bilaterauxInput();
        //ACTUALISER LA MAP AVEC LES PAYS DES ACCORDS BILLATERAUX
        this.initMapBillateralMarker(this.retagreemBilatMapData);
        this.showMultilateralBlock = false;
        this.isSwitchCountry = false;
      } else if (key === 2) {
        this.regionauxInput();
        //ACTUALISER LA MAP AVEC LES PAYS DE LA DERNIERE ORGANISATION
        this.initMapBillateralMarker(this.regionalFilterMapData);
        this.showMultilateralBlock = false;
        this.isSwitchCountry = false;
      } else if (key === 3) {
        this.showMultilateralBlock = true;
        this.$store.dispatch("SearchAgreements", {
          query: "multilateral",
          page: 0,
          size: 5,
        });
      }
    },

    seeAboutSimpleAccord(item) {
      this.currentAccord = item;
      this.showSimpleBlock = true;
    },

    seeAboutMultiAccord(item) {
      this.currentAccord = item;
      this.showMultilateralModal = true;
    },

    checkToPage(page) {
      this.currentPage = page;

      if (this.isSwitchCountry) {
        this.$store.dispatch("getListOfOmc", {
          page: this.currentPage,
          size: 7,
        });
      } else {
        this.$store.dispatch("SearchAgreements", {
          query: "multilateral",
          page: this.currentPage,
          size: 5,
        });
      }
    },

    toSwitchedCountry(value) {
      this.isSwitchCountry = value;
      //CHANGER LE CONTENU DE LA PAGINATION AVEC LES PAYS MEMBRES
      if (this.isSwitchCountry) {
        this.initListOfOmcsBlock();
      } else {
        //CHANGER LE CONTENU DE LA PAGINATION AVEC LES ACCORDS MULTILATERAL
        this.initMultilateralAgreement();
      }
    },

    downloadFile(documentUrl) {
      //TELECHARGER UN CERTIFICAT PDF
      this.showSpinner = true;
      const fileName = documentUrl.split("/").pop();
      const url = `/agreements/download?filename=${encodeURIComponent(
        fileName
      )}`;
      this.downloadFromBackend(url, fileName);
    },
  },

  mounted() {
    this.showSpinner = true;

    this.initServiceBlock();

    // Appelle getListOfOrganization et getListOfCountries et attend qu'elles soient toutes les deux terminées
    Promise.all([
      this.$store.dispatch("getListOfOrganization"),
      this.$store.dispatch("getBilateralSignedCountries"),
      this.$store.dispatch("getListOfOmc", { page: 0, size: 7 }),
    ]).then(() => {
      setTimeout(() => {
        this.bilaterauxInput();
        this.showSpinner = false; // spinner désactivé après le traitement
      }, 300); // tu peux ajuster le délai ici si tu veux un petit "effet"
    });
  },
};
</script>

<style lang="scss" scoped>
.l-map {
  height: 100%;
}

.info-marque p {
  margin: 2px !important;
  font-size: 12px !important;
  font-weight: bold;
}

//////
//////
//////
//////
//////
//////
//////

.detail-servicepage-space {
  min-height: 100vh;

  .subtitle {
    color: #ff6b07 !important;
    font-weight: bold;
  }
  .header-banner {
    .header-content {
      left: 20%;
    }
  }
}

// .multi-block-size {
//   height: 500px;
// }
.simple-block-size {
  height: 250px;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.select-flux{
  width: 50%;
}

@media (max-width: 576px) {
  .select-flux{
  width: 100%;
}
}
</style>

