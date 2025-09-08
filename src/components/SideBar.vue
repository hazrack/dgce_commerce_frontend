<template>
  <div class="obk-sidebar">
    <div>
      <div class="py-2 px-2">
        <div class="logo-obk">
          <h4>COMEX MAP</h4>
          <img src="../assets/images/comex-map-icon.jpeg" class="img-logo-size" alt="" />
        </div>

        <b-overlay :show="show" rounded="sm" class="product-loader">
          <div
            class="obk-links"
            :class="{ 'no-active-obk-bg': showConf }"
            @click="showConf = false"
          >
            <div
              class="obk-liens"
              :class="{ 'is-for-current-nav-childreen': WhichActiveIcon == i }"
              v-for="(item, i) in navlinks"
              :key="i"
              @click="checkLinkClass(i)"
            >
              <router-link
                :to="item.url"
                
              >
                <img
                  v-if="WhichActiveIcon != i"
                  class="side-light-img"
                  :src="getIconUrl(item.icon)"
                  alt=""
                />
                <img
                  v-if="WhichActiveIcon == i"
                  class="side-blue-img"
                  :src="getIconUrl(item.blueIcon)"
                  alt=""
                />

                <span class="">
                  {{ item.text }}
                </span>
              </router-link>
            </div>
          </div>



        <div class="admin-menu" v-if="retLogUser.roles=='admin'">
        <div 
          class="obk-liens"
          @click="toggleAdminMenu"
        >
          <a>
            <img
              class="side-light-img"
              :src="getIconUrl('user-pr.svg')"
              alt=""
            />
            <span>Administrateur</span>
            <!-- <i class="arrow" :class="{ 'rotate': isAdminMenuOpen }"></i> -->
          </a>
        </div>
        
        <transition name="slide">
          <div v-show="isAdminMenuOpen" class="admin-submenu">
            <div
              class="obk-liens submenu-item"
              v-for="(subItem, index) in adminSubItems"
              :key="'sub-'+index"
              @click.stop="checkLinkClass('admin-'+index)"
            >
              <router-link :to="subItem.url">
                <img
                  :src="getIconUrl(subItem.icon)"
                  alt=""
                />
                <span>{{ subItem.text }}</span>
              </router-link>
            </div>
          </div>
        </transition>
      </div>
          
        </b-overlay>


        <div class="logout-block mb-3">
          <div class="logout-content">
            <div
              class="logout-liens"
              v-for="(item, i) in logoutLinks"
              :key="i"
              @click="logoutUser"
            >
              <router-link :to="item.url">
                <img 
                :src="getIconUrl(item.icon)"
                alt="" />

                <span :class="item.color">
                  {{ item.text }}
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      showConf: false,
      show: false,
      WhichActiveIcon: null,
      scrollData: 0,
      lastActiveTime: new Date(),
      LogoutTimeOut: 900000,
      navlinks: [
        {
          icon: "dashboard-vts.svg",
          blueIcon: "dashboard-vts.svg",
          text: "Tableau de bord",
          url: "/administration/dashboard",
        },
        
        {
          blueIcon: "document.svg",
          icon: "document.svg",
          text: "Nos Accords",
          url: "/administration/accord",
        },  
        {
          blueIcon: "trade-side.svg",
          icon: "trade-side.svg",
          text: "Nos Echanges",
          url: "/administration/echanges",
        },  
        {
          blueIcon: "search-engine.svg",
          icon: "search-engine.svg",
          text: "Rang Produits",
          url: "/administration/products-ranking",
        }, 
              
        {
          blueIcon: "employee.svg",
          icon: "employee.svg",
          text: "Organisations",
          url: "/administration/organisation",
        }, 

        {
          blueIcon: "product.svg",
          icon: "product.svg",
          text: "Nos Produits",
          url: "/administration/list-produits",
        },         
        
        {
          blueIcon: "earth-grid.svg",
          icon: "earth-grid.svg",
          text: "O M C",
          url: "/administration/etat-membres",
        },
        {
          blueIcon: "collaboration.png",
          icon: "collaboration.png",
          text: "Coopération",
          url: "/administration/cooperation",
        },
            

        
      ],
     
      isAdminMenuOpen: false,
      adminSubItems: [
        {
          icon: "group.svg",
          text: "Utilisateurs",
          url: "/administration/utilisateurs"
        },
      ],
      
      logoutLinks: [
        {
          icon: "logout-icon.svg",
          text: "Se déconnecter",
          url: "#!",
          color: "text-danger",
        },
      ],
    };
  },
  computed: {
        ...mapGetters(["retLogUser"]),
  },
  methods: {
    toggleAdminMenu() {
      this.isAdminMenuOpen = !this.isAdminMenuOpen;
    },

    getIconUrl(fileName) {
      return new URL(`../assets/icons/${fileName}`, import.meta.url).href;
    },

    checkLinkClass(e) {
      this.WhichActiveIcon = e;
    },
    callShowConf() {
      this.WhichActiveIcon = null;
      this.showConf = !this.showConf;
    },
    logoutUser() {
      this.$store.commit("mutLogin", false);
      localStorage.clear();
      this.$router.push("/accueil");
    },
    onScroll(e) {
      this.scrollData = window.top.scrollY;
    },
    InactivTime() {
      // RENITIALISATION DE LA VARIABLE
      this.lastActiveTime = new Date();
    },

    logoutInactivUser() {
      var currentTime = Date.now();
      // VERIFICATION TEMPS D'INACTIVITÉ SUPERIEUR AU TEMPS LIMIT AVANT DECONNECTION
      if (currentTime - this.lastActiveTime > this.LogoutTimeOut) {
        this.logoutUser();
      }

    },
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },

  mounted() {
    // VERIFICATION DU SCROLL POUR L'EMPLACEMENT DE L'ICON USER DANS LA NAVBAR
    window.addEventListener("scroll", this.onScroll);

    // RENITIALISATION DU TEMPS D'ACTIVITÉ AVEC DECONNECTION AUTOMATIQUE
    // LORS DU SURVOL DE LA SOURIS
    window.addEventListener("mousemove", this.InactivTime);
    // LORS DU CLICK
    window.addEventListener("keypress", this.InactivTime);
    // LORS DU SCROLL
    window.addEventListener("scroll", this.InactivTime);
  },

  created() {
    //APPEL DE LA FUNCTION DE LOGOUT AUTOMATIQUE CHAQUE 1SECONDE
    this.interval = setInterval(() => this.logoutInactivUser(), 1000);
  },
};
</script>

<style scoped lang="scss">

.not-colapsed-sidebar {
  .obk-sidebar {
    width: 240px !important;
    //  transition: 0.5s ease;
  }
  a span {
    -webkit-animation: 2.5s ease 0s normal forwards 1 fadein;
    animation: 2.5s ease 0s normal forwards 1 fadein;
  }
}

.obk-liens img {
    width: 25px;

    background: #fff;
    padding: 2px;
    border-radius: 5px;
}


@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.img-logo-size{
border-radius: 50%;
    }

.colapsed-sidebar {
  width: 100px !important;

  .obk-sidebar {
    width: 100px;
    transition: 0.5s ease;
  }

  .logo-obk {
    text-align: center;
    img {
      width: 70px;
      
    }
    
  }

  .obk-liens,
  .logout-liens,
  .block-conf {
    text-align: center;
    a span,
    span {
      display: none !important;
    }
  }
}

.logout-liens span {
    color: #fff !important;
}

.obk-sidebar {
  position: fixed;
  height: 100vh;
  background: #1d1d1d;
  border-right: 2px solid white;
  box-shadow: inset -21px 0 12px -10px rgba(235, 255, 255, 0.5);

  .obk-liens {
    margin-top: 1rem;

    a.router-link-exact-active.router-link-active,
    &.is-for-current-nav-childreen a {
      background: rgba(147, 70, 70, 0.462);
      border-radius: 10px;
      font-weight: bold;
      color: #fff !important;

      span {
        border-right: 3px solid #fff;
      }
    }
  }

  .no-active-obk-bg {
    .obk-liens {
      a.router-link-exact-active.router-link-active,
      &.is-for-current-nav-childreen a {
        background: none !important;
        color: #fff !important;
        font-weight: normal;

        span {
          border-right: none !important;
        }
      }
    }
  }

  .obk-liens,
  .logout-liens {
    a {
      font-size: 13px;
      color: #fff !important;
      text-decoration: none;
      padding: 1rem 1rem;

      span {
        padding-left: 1rem;
        padding-right: 2rem;
      }
    }
  }

  .conf {
    padding: 0.8rem 1rem;

    &:hover {
      cursor: pointer;
    }
    span {
      font-size: 13px !important;
      color: #fff !important;
    }

    &.active {
      background: rgba(147, 70, 70, 0.462);
      border-radius: 10px;

      p {
        font-weight: bold;
        color: #0f4476 !important;
      }
    }
  }

  .conf-child {
    padding-left: 1vw;
    img {
      width: 1vw;
    }
  }

  .logo-obk {
    text-align: center;
    margin: 20px auto;

    &:hover {
      cursor: pointer;
    }
  }
  

.logo-obk h4 {
  // font-size: 2rem; /* Taille du texte */
  font-weight: bold; /* Texte en gras */
  font-family: 'Poppins', sans-serif; /* Police stylée */
  text-transform: uppercase; /* Majuscules */
  background: linear-gradient(45deg, #ff6b07, #fff); /* Dégradé */
  background-clip: text; /* propriété standard */
  -webkit-background-clip: text; /* fallback pour WebKit (Chrome, Safari) */  -webkit-text-fill-color: transparent; /* Effet de texte en dégradé */
  letter-spacing: 2px; /* Espacement des lettres */
  transition: transform 0.3s ease-in-out;
}

.logo-obk:hover h4 {
  transform: scale(1.1); /* Effet zoom au survol */
}

  .logout-liens {
    margin-top: 1rem;
  }
  .logout-block {
    position: absolute;
    bottom: 0;
  }
}


  .admin-menu {
    span{
      cursor: pointer;
    }
  }

</style>