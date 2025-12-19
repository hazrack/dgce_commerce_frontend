<template>
  <div>
    <div class="container-fluid p-0">
      <header class="header-navb p-3">
        <div class="logo-block" @click="$emit('sideBarEvent')">
          <img src="../assets/icons/icon-toggle.svg" alt="" />
          <p class="fw-bold mb-0 mx-3">{{ $route.meta.title }}</p>
        </div>

        <!-- Section Nombre de Visiteurs -->
        <div class="visitors-section">
          <img src="../assets/icons/img-visitor.png" alt="visiteurs" width="24" />
          <div class="visitors-info">
            <span class="visitors-label">Visiteurs</span>
            <span class="visitors-count">{{ new Intl.NumberFormat('fr-FR').format(visitorsCount) }}</span>
          </div>
        </div>

        <div class="link-user-info">
          <p class="user-info">
            <span class="mx-2"> </span>
            {{ retLogUser.roles }} 
            {{ retLogUser.firstname }} 
            {{ retLogUser.name }} .
          </p>

          <div class="user-img" @click="showDropdown = !showDropdown">
            <img
              :class="{ 'bg-fond-orange': showDropdown == true }"
              width="40px"
              src="../assets/icons/user.png"
              alt=""
            />
          </div>
        </div>
        <div
          class="user-more-action"
          :class="{ 'admin-cursor': userDropClick == true }"
          v-if="showDropdown"
        >
          <p @click="logoutUser">Déconnexion</p>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
import axios from "../services/index.js";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showDropdown: false,
      userDropClick: false,
      visitorsCount: 220,
    };
  },

  computed: {
    ...mapGetters(["retLogUser"]),
  },

  watch: {
    retLogUser: {
      immediate: true,
      handler(newValue) {
        this.check();
      },
    },
  },

  methods: {
    check() {
      console.log("user man ", this.retLogUser);
    },
    
    // Méthode pour récupérer le nombre de visiteurs
   

    logoutUser() {
      this.userDropClick = true;
      setTimeout(() => {
        this.userDropClick = false;
        this.showDropdown = false;
        this.$store.commit("mutLogin", false);
        localStorage.clear();
        this.$router.push("/accueil");
      }, 2000);
    },
  },

  
};
</script>

<style lang="scss" scoped>
.header-navb {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #008c00;
  color: #fff;
  box-shadow: 0px 6px 4px #ccc;
  align-items: center;
  top: 0;
  position: relative;

  .logo-block {
    display: flex;
    align-items: center;
    text-transform: uppercase;

    :hover {
      cursor: pointer;
    }
  }

  /* Style pour la section visiteurs */
  .visitors-section {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.15);
    padding: 8px 16px;
    border-radius: 8px;
    
    .visitors-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      
      .visitors-label {
        font-size: 11px;
        opacity: 0.9;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .visitors-count {
        font-size: 18px;
        font-weight: bold;
      }
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
</style>