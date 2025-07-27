<template>
  <div>
    <div class="input-search-area">
      <div class="search-container">
        <div class="search-input-wrapper">
          <i class="fas fa-search search-icon"></i>
          <input
            type="search"
            v-model="searchQuery"
            @input="handleSearch"
            @focus="onFocus"
            @blur="onBlur"
            :placeholder="placeHolderText"
            class="search-input"
          />
        </div>

        <!-- Indicateur de recherche active -->
        <div v-if="isSearching" class="search-loader">
          <div class="spinner"></div>
        </div>

        <!-- Barre de progression moderne -->
        <div class="search-progress-bar" :class="{ active: isFocused }"></div>
      </div>

      <!-- Suggestions rapides (optionnel) -->
      <div v-if="showSuggestions && isFocused" class="quick-suggestions">
        <div class="suggestion-header">
          <i class="fas fa-lightbulb"></i>
          <span>Suggestions rapides</span>
        </div>
        <div
          class="suggestion-item"
          v-for="suggestion in suggestions"
          :key="suggestion"
          @click="selectSuggestion(suggestion)"
        >
          <i class="fas fa-search suggestion-icon"></i>
          {{ suggestion.title }}
        </div>
      </div>
    </div>

    <div>
      <b-modal id="modal-simple-flux" v-model="sugestModal" hide-footer>
        <template #header>
          <div class="d-flex justify-content-between w-100">
            <div>
              <p class="suffix-clicked">
                <span>Accords {{ currentAccord.typeOfAgreement }} / </span>
                <span class="label-orange">
                  {{ currentAccord.countryLabel }} {{ currentAccord.organizationLabel }}
                </span>
                
              </p>
            </div>
            <div>
              <span class="close-modal-icon" @click="sugestModal = false">
                <i class="bi bi-x-lg"></i>
              </span>
            </div>
          </div>
        </template>
        <div class="mx-3">
          <div>
            <div class="line-block-text my-3">
              <div class="text-center detail-title">
                <p>{{ currentAccord.title }} </p>
              </div>

              <div class="detail-content my-4">
                <div class="details-link">
                  <div v-if="currentAccord.documentUrl">
                    <a
                      href="#"
                      @click.prevent="downloadFile(currentAccord.documentUrl)"
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
  </div>
</template>

<script>
import actionMixin from "@/mixins/actionMixin";
import { mapGetters } from "vuex";
export default {
  name: "SearchInputComponent",
  props: {
    placeHolderText: {
      type: String,
      default: "Rechercher un accord",
    },
    showSuggestions: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      searchQuery: "",
      timeout: null,
      isFocused: false,
      isSearching: false,
      suggestions: [],
      currentAccord: "",
      sugestModal: false,
    };
  },
  mixins: [actionMixin],

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
          this.suggestions = this.retlistOfAgreement.datas;
          console.log("====================================");
          console.log("LES ACCORD ", this.suggestions);
          console.log("====================================");
        } else {
          this.suggestions = [];
        }
      },
    },
  },

  methods: {
    handleSearch() {
      clearTimeout(this.timeout);

      if (this.searchQuery.length < 2 && this.searchQuery.length !== 0) {
        return;
      }

      this.isSearching = true;

      this.timeout = setTimeout(() => {
        this.triggerSearch();
        this.isSearching = false;
      }, 800);
    },

    triggerSearch() {
      console.log("====================================");
      console.log("IL ES");
      console.log("====================================");

      if (this.searchQuery.length > 2) {
        this.$store.dispatch("SearchAgreements", {
          query: this.searchQuery,
          page: 0,
          size: 5,
        });
      }
      if (this.searchQuery.length == 0) {
        this.$store.dispatch("getListOfAgreement", { page: 0, size: 5 });
      }
    },

    onFocus() {
      this.isFocused = true;
    },

    onBlur() {
      // Délai pour permettre le clic sur les suggestions
      setTimeout(() => {
        this.isFocused = false;
      }, 1500);
    },

    selectSuggestion(suggestion) {
      this.searchQuery = suggestion.title;
      this.currentAccord = suggestion;
      this.sugestModal = true;
      this.isFocused = false;

      console.log("====================================");
      console.log("LE SUGEST ", this.sugestModal);
      console.log("====================================");
      console.log("====================================");
      console.log("LES ACCORD ", this.currentAccord);
      console.log("====================================");
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
};
</script>

<style scoped lang="scss">
/* Conteneur principal */
.input-search-area {
  width: 100%;
  max-width: 500px;
  margin: 10px auto;
  position: relative;
}

/* Container de recherche avec effet glassmorphism */
.search-container {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 140, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 140, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 140, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

/* Wrapper de l'input */
.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

/* Icône de recherche */
.search-icon {
  position: absolute;
  left: 18px;
  color: #ff8c00;
  font-size: 18px;
  z-index: 2;
  transition: all 0.3s ease;
}

/* Input principal */
.search-input {
  width: 100%;
  padding: 18px 60px 18px 55px;
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: 500;
  color: #2c3e50;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: #7f8c8d;
    font-weight: 400;
    transition: all 0.3s ease;
  }

  &:focus {
    &::placeholder {
      color: #bdc3c7;
      transform: translateY(-2px);
    }
  }
}

/* Loader de recherche */
.search-loader {
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #ecf0f1;
  border-top: 2px solid #ff8c00;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Barre de progression moderne */
.search-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 0;
  background: linear-gradient(90deg, #ff8c00, #008c00);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &.active {
    width: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    animation: shimmer 2s infinite ease-in-out;
  }
}

@keyframes shimmer {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

/* Suggestions rapides */
.quick-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 140, 0, 0.2);
  border-top: none;
  z-index: 1000;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.suggestion-header {
  padding: 15px 20px 10px;
  border-bottom: 1px solid #ecf0f1;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;

  i {
    color: #ff8c00;
  }
}

.suggestion-item {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #7f8c8d;
  font-size: 14px;

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(255, 140, 0, 0.05),
      rgba(0, 140, 0, 0.05)
    );
    color: #2c3e50;
    padding-left: 24px;
  }

  &:last-child {
    border-radius: 0 0 16px 16px;
  }
}

.suggestion-icon {
  color: #bdc3c7;
  font-size: 12px;
  transition: all 0.2s ease;
}

.suggestion-item:hover .suggestion-icon {
  color: #ff8c00;
}

/* Effets spéciaux au focus */
.search-container:focus-within {
  border-color: rgba(255, 140, 0, 0.5);
  box-shadow: 0 0 0 4px rgba(255, 140, 0, 0.1), 0 12px 40px rgba(0, 140, 0, 0.2);

  .search-icon {
    color: #008c00;
    transform: scale(1.1);
  }
}

/* Version mobile responsive */
@media (max-width: 768px) {
  .input-search-area {
    max-width: 100%;
    margin: 15px;
  }

  .search-input {
    padding: 16px 50px 16px 50px;
    font-size: 16px; /* Évite le zoom sur iOS */
  }

  .search-container {
    border-radius: 12px;
  }

  .quick-suggestions {
    border-radius: 0 0 12px 12px;
  }
}

/* Animation d'entrée */
.input-search-area {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Support du mode sombre */
@media (prefers-color-scheme: dark) {
  .search-container {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 140, 0, 0.3);
  }

  .search-input {
    color: #ecf0f1;

    &::placeholder {
      color: #95a5a6;
    }
  }

  .quick-suggestions {
    background: #2c3e50;
    border-color: rgba(255, 140, 0, 0.3);
  }

  .suggestion-header {
    color: #ecf0f1;
    border-color: #34495e;
  }

  .suggestion-item {
    color: #bdc3c7;

    &:hover {
      background: linear-gradient(
        90deg,
        rgba(255, 140, 0, 0.1),
        rgba(0, 140, 0, 0.1)
      );
      color: #ecf0f1;
    }
  }
}
</style>