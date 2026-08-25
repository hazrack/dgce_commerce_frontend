<template>
  <div>
    <div v-if="showAllNav" class="container-fluid p-0">
      <div class="top-head-civ fw-bold text-light text-center py-3">
        <div class="marquee-container">
          <div class="marquee-content">
            <p>
              REPUBLIQUE DE CÔTE D'IVOIRE <span class="mx-2">
                <img
              src="../assets/images/flag-civ.png"
              width="20"
              alt=""
            />
              </span> 
               -  Ministère du commerce, de l'industrie et de l'artisanat  -  Bienvenue sur la plateforme de la Cartographie des Accords et des Flux Commerciaux
            </p>
          </div>
        </div>
      </div>

      <div class="py-2">
        <div class="px-4 republic-head">
          <div class="repub-left-text fw-bold ">
           
            

            <img
              src="../assets/icons/comexmap.jpeg"
              width="210"
              class="normal-zone-img"
              alt=""
            />
          </div>

          

          <div class="repub-right-text ">
            <!-- <img
              src="../assets/images/dgce.png"
              width="200"
              class="normal-zone-img"
              alt=""
            /> -->

            <img
              src="../assets/icons/mci.jpeg"
              width="250"
              class="normal-zone-img"
              alt=""
            />
            
          </div>
        </div>
      </div>

      <div class="full-navbar-space px-3 py-2">
        <div :class="isSticky ? 'bar-fixed-top' : 'bar-static-top'">
          <nav>
            <ul class="nav">
              <li v-for="route in routes" :key="route.path" class="nav-item">
                <router-link
                  :to="route.path"
                  class="nav-link"
                  :class="{ active: $route.path === route.path }"
                >
                  {{ route.name }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <SearchCustomComponent />
        </div>
      </div>
    </div>

    <div v-if="!showAllNav">
      <div class="mobil-nav">
        <div class="space-slide">
          <Slide left>
            <nav>
              <ul>
                <li v-for="route in routes" :key="route.path" class="nav-item">
                  <router-link
                    :to="route.path"
                    class="nav-link"
                    :class="{ active: $route.path === route.path }"
                  >
                    {{ route.name }}
                  </router-link>
                </li>
              </ul>
            </nav>
            
          </Slide>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Slide } from "vue3-burger-menu";
import SearchCustomComponent from "./front/SearchCustomComponent.vue";

export default {
  data() {
    return {
      showAllNav: window.innerWidth > 700,
      isSticky: false,
      routes: [
        { name: "ACCUEIL", path: "/accueil" },
        { name: "ACCORDS COMMERCIAUX", path: "/accords-commerciaux" },
        { name: "FLUX COMMERCIAUX", path: "/flux-commerciaux" },
        // { name: "POINTS DE COOPERATIONS", path: "/points-cooperations" },
        { name: "FAQ", path: "/faq" },
        { name: "CONTACTS", path: "/contacts" },
      ],
    };
  },

  components: {
    Slide,
    SearchCustomComponent,
  },

  computed: {
    ...mapGetters(["retLogUser"]),
  },

  methods: {
    handleResize() {
      this.showAllNav = window.innerWidth > 700; // Met à jour showAllNav selon la largeur de l'écran
    },
    handleScroll() {
      const scrollTop = window.scrollY;
      this.isSticky = scrollTop >= 315;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize); // Nettoyage de l'écouteur
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
.top-head-civ {
  background: #008c00;
}
.republic-head {
  // align-items: center;
    display: flex;
    justify-content: space-between;
    justify-items: center;

  hr.black-line {
    height: 10px;
    background: #000 !important;
    opacity: 1;
    width: 70%;
    margin: 10px auto;
    border: none;
  }

  .repub-right-text {
    text-transform: uppercase;
    font-weight: bold;
    text-align: right;
  }
}

.bar-fixed-top {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 8px 0;

  .active {
    text-decoration: underline;
    color: #ff6b07 !important; /* Souligne le lien actif */
  }
}

//////////////////////////////////////@at-root/////////////////@at-root/@at-root
/// ////////////////////////////////////////////////////////@at-root/////////////////@at-root/@at-root
/// ////////////////////////////////////////////////////////@at-root/////////////////@at-root/@at-root
/// ////////////////////////////////////////////////////////@at-root/////////////////@at-root/@at-root
/// //////////////////

.logo-img-block {
  padding: 5px;
  width: 84px;
  height: 84px;
  .logo-img-simple {
    width: 100%;
    height: 100%;
  }
}

.full-navbar-space {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #000;
  color: #86838c;
  align-items: center;
  top: 0;
  position: relative;

  .logo-block {
    display: flex;
    align-items: center;

    :hover {
      cursor: pointer;
    }
  }
  .link-user-info {
    margin-right: 1rem;

    .user-img:hover {
      cursor: pointer;
    }
  }

  .user-info {
    text-transform: capitalize;
  }

  .link-user-info {
    display: flex;
    align-items: center;

    .user-img img {
      border-radius: 50%;
    }
    p {
      margin: 10px 1rem;
      font-size: 14px;
    }
  }

  .user-more-action {
    position: absolute;
    right: 3px;
    top: 64px;
    z-index: 1000;
    width: 14vw;
    padding: 7px 14px;
    border-radius: 0px 0px 5px 5px;
    background: #000;
    p {
      margin: 4px 0;
      font-weight: bold;

      &:hover {
        cursor: pointer;
        color: #c6183d;
      }
    }
    p.no-allow:hover {
      cursor: not-allowed;
    }
  }

  .nav-item {
    font-weight: bold; /* Texte en gras */
    font-size: 16px !important;
  }

  .nav-link {
    text-decoration: none; /* Supprime le soulignement */
    padding: 10px 15px;
    border-radius: 5px;
  }

  .bar-fixed-top {
    .nav-link {
          color: #86838c;

    }
  }
  .bar-static-top{
    .nav-link {
          color: #fff;

    }
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.2); /* Effet au survol */
  }

  .active {
    text-decoration: underline;
    color: #fff; /* Souligne le lien actif */
  }
}

.mx-20 {
  margin: 0 20px;
}

.side-link-crop {
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  display: flex;
  flex-direction: column;
  width: 100%;
  word-break: break-all;
  height: 70% !important;
  overflow-y: auto;
}

.admin-cursor {
  p {
    cursor: progress !important;
  }
}

.zone-small-screen {
  ul.nav.small-screen {
    display: block;
  }
}

.bar-static-top {
  position: relative !important;
  top: auto;
  box-shadow: none;
  background-color: transparent;

  .active {
    text-decoration: none;
    color: #ff6b07 !important;
  }
}

.mobil-nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.marquee-container {
  overflow: hidden;
  white-space: nowrap;
  color: #fff;
  font-weight: bold;
}

.marquee-content {
  display: inline-block;
  padding-left: 100%;
  animation: scroll-text 80s linear infinite;
}

@keyframes scroll-text {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>