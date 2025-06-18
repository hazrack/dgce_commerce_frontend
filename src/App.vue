<template>
  <div id="app">
    <div class="block" v-if="!showDash">
      <FrontNavbar v-if="!hideClientNavMode" />
      <router-view />
      <Footer v-if="!hideClientNavMode" />
    </div>
    <div class="d-flex" v-else>
      <div
        :class="{
          'not-colapsed-sidebar': visible,
          'colapsed-sidebar': !visible,
        }"
      >
        <SideBar :visible="visible" />
      </div>
      <div
        :class="{ 'reduiced-topbar': visible, 'not-reduiced-topbar': !visible }"
      >
        <TopBar @sideBarEvent="visible = !visible" />
        <div class="px-3 mt-3">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "./components/TopBar.vue";
import SideBar from "./components/SideBar.vue";
import Footer from "./components/Footer.vue";
import FrontNavbar from "./components/FrontNavbar.vue";

export default {
  name: "App",
  data() {
    return {
      visible: true,
      showDash: false,
      hideClientNavMode: false,
    };
  },
  watch: {
    $route(to) {
      this.updateHideClientNavMode(to.path);
    },
  },
  methods: {
    callSideBar(e) {
      this.visible = e;
    },
    updateHideClientNavMode(path) {
      this.hideClientNavMode = path.includes("/login");
    },
  },
  components: {
    TopBar,
    FrontNavbar,
    SideBar,
    Footer,
  },
  mounted() {
    this.showDash = this.$store.state.userLogStatus;
    this.updateHideClientNavMode(this.$route.path);
  },
};
</script>


<style lang="scss">
@import url("https://fonts.cdnfonts.com/css/poppins");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  // font-family: Arial, Helvetica, sans-serif;
}

.bm-burger-bars {
  background-color: #fff;
}

.app-box-shadow-block {
  box-shadow: 0px 3px 12px #0000008c;
}

.default-space {
  margin-top: 6rem;
  margin-bottom: 3.4rem;
}

.img-logo-size {
  width: 130px;
  height: auto;
}

.espace-logo {
  display: flex;
  justify-content: center;
}

.header-banner {
  position: relative;
  width: 100%;
  height: 60vh; // Ajuste selon besoin
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .header-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9); // Fond blanc semi-transparent
    padding: 20px 40px;
    border-radius: 8px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2); // Ombre pour relief

    .title {
      font-size: 32px !important; // Texte plus grand
      font-weight: bold;
      color: #333;
      text-transform: uppercase;
      text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3); // Ombre sur texte
    }
  }
}

@media (max-width: 700px) {
  .header-banner {
    text-align: center;
  }
  .header-content {
    width: 90%;
    left: 50% !important;
  }
}

.lead-title {
  font-size: 16px !important;
  font-weight: 700;
  line-height: 26px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
  color: #c6183d;
}

.top-title-block {
  font-size: 32px !important;
  font-weight: 800;
  color: #ff6b07;
  text-shadow: 1px 2px 2px #000;
}

.logo-img-block {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  width: 120px;
  height: 120px;

  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
}

.logo-img-simple {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: contain; // Garde le ratio du logo sans le couper
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
}

.VueCarousel-pagination {
  .VueCarousel-dot-container {
    display: none;
  }
}

button.VueCarousel-navigation-button {
  background: #c6183d !important;
  border-radius: 48px;
  padding: 12px 10px 12px 10px !important;
  color: #fff !important;
  transition: transform 0.3s ease-in-out;

  &:hover {
    background: #000 !important;
    color: #c6183d !important;
  }
}
.dropdown-toggle {
  &::after {
    display: none !important;
  }

  &.btn-secondary {
    background: transparent !important;
    border: none !important;
  }

  &.btn {
    padding: 0 !important;
  }
}

#app {
  overflow-x: hidden;
}

body {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0;
  background: #f8f8f8 !important;

  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  p {
    margin-bottom: 0 !important;
  }
}

//NAVIGATION SIDEBAR AND TOPBAR WIDTH

.colapsed-sidebar {
  padding: 0;
  transition: 0.5s ease;
  width: 100px;
}

.not-colapsed-sidebar {
  width: 240px;
  padding: 0;

  // transition: 0.5s;
}
.not-reduiced-topbar {
  width: calc(100% - 100px);
}

.reduiced-topbar {
  width: calc(100% - 240px);
}

.bg-fond-orange {
  background: #c6183d;
}

.fw-bold {
  font-weight: bold !important;
}

.form-label-style {
  label {
    font-style: italic;
    font-weight: bold;
    color: red;
    margin: 5px 0;
  }

  .form-div {
    margin-bottom: 5px;
  }
}

//
//
//
//
//
//GLOBAL MODAL ZONE CONFIGURATION
//
//
//

.overflow-scroll-block {
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px; /* Largeur de la barre de scroll */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff8c00; /* Couleur du scroll */
    border-radius: 3px; /* Arrondi */
  }
}

.custom-green {
  color: #008c00;
}

.modal-content-scrollable {
  max-height: 80vh;
  overflow-y: auto;
}

/* Masquer la barre de défilement tout en permettant le défilement */
.modal-content-scrollable::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* Optionnel : rendre le fond transparent */
}

.modal-content-scrollable {
  -ms-overflow-style: none; /* IE et Edge */
  scrollbar-width: none; /* Firefox */
}

button.close {
  border: none;
  background: transparent;
  font-size: 1.5rem;
  font-weight: bold;
  color: #888;
  transition: color 0.3s ease, transform 0.2s ease;
  position: absolute;
  top: 15px;
  right: 20px;
  z-index: 1000;
}

button.close:hover {
  color: #e74c3c;
  transform: scale(1.2);
  cursor: pointer;
}

.label-orange {
  color: #ff6b07;
}




#modal-simple-flux,
#modal-multi-flux {
  .modal-dialog {
    max-width: 900px !important;
  }

  .modal-content {
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border: none;
    padding: 1rem;
    background-color: #ffffff;
    position: relative;
  }

  .modal-title {
    text-transform: uppercase !important;
    p {
      font-weight: bold;
      font-size: 20px;
    }
  }
}



#modal-global-form {
  .modal-dialog {
    max-width: 500px !important;
  }
}

#confirm-delete-modal {
  .modal-content {
    border-radius: 12px;
    border: none;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  }

  #header {
    
    display: flex;
    justify-content: space-between;

    background-color: #c6183d;
    color: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 15px;

    .modal-title {
      font-size: 18px;
      font-weight: bold;
    }

    .close {
      color: white;
      opacity: 1;
      font-size: 20px;
    }
  }

  .modal-body {
    padding: 20px;
    text-align: center;
    p {
      font-size: 16px !important;
    }
  }
}




#user-modal-form {
  .modal-dialog {
    max-width: 1000px !important;
  }

  .subscribe-display {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;

    .simple-input {
      max-width: 280px;
    }
  }
}


.close-modal-icon {
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease;
  &:hover {
    color: #dc3545; /* Rouge au survol */
  }
}


p {
  font-size: 14px !important;
}

.dropdown-toggle.btn-secondary {
  font-weight: bold !important;
  font-style: italic !important;
}
.dropdown-menu {
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 8px !important;

  .dropdown-item {
    font-weight: 500;
    color: #4b5563;
    transition: all 0.2s ease;

    &:hover {
      background-color: #ff6b07;
      color: #fff;
    }

    &:active {
      background-color: #ff6b07;
    }
  }
}

.custom-icon-space {
  border: 2px solid #000;
  padding: 4px;
  width: 35px;
  height: 35px;
  text-align: center;
  border-radius: 50%;
  background: #fff;

  &:hover {
    border-color: #ff6b07;
    cursor: pointer;
  }
}

.shadow-title {
  font-weight: bold !important;
  font-size: 20px !important;
  text-shadow: 0px 0px 1px #000;
  letter-spacing: 2px;
}

.line-block-text {
  background: #e3e3e3;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px #0000008c;
  font-size: 18px;
  color: #333;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease-out forwards;

  p {
    margin: 0;
    font-weight: 600;
  }
  .line-title {
    text-transform: uppercase;
    &:hover {
      color: #ff6b07;
    }
  }
  
}

.detail-title {
  border-bottom: 5px solid #008c00;
  padding-bottom: 2px;

  p {
    font-size: 16px !important;
  }
}

.editing-block {
  display: flex;
  gap: 10px;
  font-family: "Segoe UI", sans-serif;

  button {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    background: transparent;
    border: 1px solid;
    border-radius: 3px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.3, 0, 0.1, 1);

    span {
      margin-right: 6px;
      i {
        font-size: 13px;
      }
    }

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  .edite-btn {
    border-color: #2e7d32; // Vert plus foncé
    &:hover {
      background: #2e7d32;
      color: #fff;
      i {
        animation: pencil-pulse 0.5s;
      } // Animation spécifique
    }
  }
  .more-btn {
    border-color: #ff6b07; // Vert plus foncé
    &:hover {
      background: #ff6b07;
      color: #fff;
      i {
        transform: scale(1.1);
      } // Animation spécifique
    }
  }

  .delete-btn {
    border-color: #c62828; // Rouge plus foncé
    &:hover {
      background: #c62828;
      color: #fff;
      i {
        transform: scale(1.1);
      } // Légère mise à l'échelle
    }
  }
}

.detail-content {
  .telechargement {
    color: #008c00;
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
  }

  .line-bottom {
    margin: 4px 0;
    border-bottom: 1px solid #ccc;
    padding: 5px 0;
  }

  .detail-hr {
    height: 7px;
    background-color: #ff6b07;
    border: none;
    width: 25%;
    margin: 4px 0;
    opacity: 1;
  }

  .not-file-link {
    font-style: italic;
    font-weight: 350 !important;
    color: red;
  }
}

///
///
/// ESPACE B-TABLE
///
///

.simple-table {
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  font-size: 0.95rem;

  thead {
    background-color: #f5f7fa;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  thead,
  tbody,
  tr,
  th {
    font-size: 13px;
  }

  thead th {
    text-transform: uppercase !important;
    font-weight: 600;
    font-style: italic;
  }

  th,
  td {
    padding: 1rem;
    text-align: center;
    vertical-align: middle;
  }

  tbody {
    tr {
      &:hover {
        background-color: #f0f8ff;
        transition: background-color 0.3s ease;
      }
    }
  }

  td {
    border-color: #e6e9ef;
    font-style: italic;
  }

  th {
    border-color: #dfe3e8;
  }
}


.btn-custom {
  display: inline-flex;
  align-items: center;
  gap: 8px;
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




.simple-form-area {
  .simple-input {
    font-size: 1.8rem;
    color: #333;
    text-align: center;
    font-weight: 600;
    margin-bottom: 40px !important;
  }

  .simple-input {
    position: relative;
    margin-bottom: 30px;
    width: 100%;

    input[required] + span::after,
    select[required] + span::after {
      content: " *";
      color: #ff4444; // Rouge pour l'astérisque
      font-weight: bold;
    }

    input,
    select {
      width: 100%;
      padding: 12px 10px;
      background: transparent;
      border: none;
      border-bottom: 2px solid #e0e0e0;
      outline: none;
      color: #333;
      font-size: 1rem;
      transition: 0.3s;

      &:focus,
      &:valid {
        border-bottom-color: #ff7b25; // Orange quand actif

        ~ span {
          transform: translateY(-25px);
          font-size: 0.8rem;

          &::before {
            color: #ff4444;
          }
        }

        ~ i {
          height: 2px;
          background: #ff7b25;
        }
      }
    }

    span {
      position: absolute;
      left: 10px;
      top: 12px;
      color: #888;
      font-size: 1rem;
      pointer-events: none;
      transition: 0.3s;
    }

    i {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: #e0e0e0;
      transition: 0.3s;
    }
  }

}

.block-trade-table {
  overflow-x: auto;
  overflow-y: hidden; // Désactive le défilement vertical
  white-space: nowrap; // Empêche le retour à la ligne
  width: 100%;
  max-width: 100%; // S'assure qu'il ne dépasse pas son conteneur
  -webkit-overflow-scrolling: touch; // Améliore le scroll sur mobile

  // Custom scrollbar (pour WebKit: Chrome, Safari, Edge)
  &::-webkit-scrollbar {
    height: 6px;
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;

    &:hover {
      background: #555;
    }
  }

  // Pour Firefox
  scrollbar-width: thin;
  scrollbar-color: #888 #f5f5f5;

  // Si le contenu est un tableau
  table {
    width: auto;
    min-width: 100%; // Force le tableau à être plus large que le conteneur si nécessaire
    border-collapse: collapse; // (Optionnel) Pour un style plus propre
  }

  // Si le contenu est une liste flex (ex: cartes horizontales)
  .horizontal-list {
    display: inline-flex;
    gap: 16px; // Espacement entre les éléments
  }
}

.suffix-clicked {
  font-style: italic;
  font-weight: bold !important;
}
</style>
