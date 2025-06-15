<template>
  <div>
    <div class="container-fluid p-0">
      <header class="header-navb p-3">
        <div class="logo-block" @click="$emit('sideBarEvent')">
          <img src="../assets/icons/icon-toggle.svg" alt="" />
          <p class="fw-bold mb-0 mx-3">{{ $route.meta.title }}</p>
        </div>

        <div class="link-user-info">
          <p class="user-info">
            <span class="mx-2"> </span>
            Admin
            {{ retLogUser.username }} .
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
    };
  },

  computed: {
    ...mapGetters(["retLogUser"]),
  },

  methods: {
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
  mounted() {},
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