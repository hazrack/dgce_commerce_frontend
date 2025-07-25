<template>
  <div>
    <div v-if="showAllNav" class="container-fluid p-0">
      <div class="top-head-civ fw-bold text-light text-center py-3">
        <p >MINISTÈRE DU COMMERCE ET DE L'INDUSTRIE</p>
      </div>

      <div class="py-2">
        <div class="row px-4 republic-head">
          <div class="repub-left-text fw-bold col-md-4 text-center">
            <p>MINISTÈRE DU COMMERCE ET DE L'INDUSTRIE</p>
            <hr class="black-line" />
            <p class="pb-3">DIRECTION GENERALE DU COMMERCE EXTERIEUR</p>
            
          
          </div>

          <div class="repub-central-img col-md-4 text-center">
            <img
              src="../assets/icons/amoirie-civ.png"
              width="170"
              class="normal-zone-img"
              alt=""
            />
          </div>

          <div class="repub-right-text col-md-4 text-center">
            <p class="color-text">
              CARTOGRAPHIE DES ACCORDS ET FLUX COMMERCIAUX
            </p>
            <p>Vue d'ensemble des relations commerciales entre
              la Côte d'Ivoire et ses partenaires d'affaires</p>
          </div>
        </div>
      </div>


      <div class="full-navbar-space px-3 py-2" >
        

        <div :class="isSticky ? 'bar-fixed-top' : 'bar-static-top'">
          <nav >
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
          <img
              src="../assets/icons/amoirie-civ.png"
              width="80"
              class="little-img"
              alt=""
            />
        </div>

      </div>

    </div>


     <div v-if="!showAllNav" >
        <div class="my-3 py-3 mobil-nav">

          <div class="space-slide">
          <Slide left>
            <nav>
              <ul >
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
          <div>
            <div>
            <img
              src="../assets/icons/amoirie-civ.png"
              width="100"
              class="normal-zone-img"
              alt=""
            />
            </div>
          </div>
        </div>
        </div>

        </div>

</template>

<script>
import axios from "../services/index.js";
import { mapGetters } from "vuex";
import { Slide } from 'vue3-burger-menu'

export default {
  data() {
    return {
      showAllNav: window.innerWidth > 700,
      isSticky: false, 
      routes: [
        { name: "Accueil", path: "/accueil" },
        { name: "Accord commerciaux", path: "/accord-commercial" },
        { name: "Flux commerciaux", path: "/flux-commercial" },
        { name: "Point Cooperation", path: "/point-cooperations" },
        { name: "Faqs", path: "/faq" },
        { name: "Contact", path: "/contact" }
      ],
    };
  },



  components: {
    Slide,
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
.top-head-civ{
  background: #008c00;
}
.republic-head {

  align-items: center;

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
}

}

.bar-fixed-top{
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
    color: #FF6B07 !important; /* Souligne le lien actif */
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
    color: #86838c; /* Texte en blanc */
    text-decoration: none; /* Supprime le soulignement */
    padding: 10px 15px;
    border-radius: 5px;
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
    display: block ;
  }
}

.bar-static-top {
  position: relative !important;
  top: auto;
  box-shadow: none;
  background-color: transparent;

  .active {
    text-decoration: none;
    color: #FF6B07 !important; 
  }
  
}

.mobil-nav{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

  
</style>