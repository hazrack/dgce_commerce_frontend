<template>
  <div class="login-page">
    <div class="box">
      <div class="login-form-z">
        <h2 class="libelle-form mb-5">Authentification</h2>

        <form @submit.prevent="LoginField">
          <div class="login-input-box">
            <input type="text" v-model="userData.email" required />
            <span class="libelle-form">Email</span>
            <i></i>
          </div>
          <div class="login-input-box">
            <input type="password" v-model="userData.password" required />
            <span class="libelle-form">Mot de passe </span>
            <i></i>
          </div>

          <div class="mt-4 text-center">
            <button class="btn-custom" type="submit">
              Connexion <i class="bi bi-lock"></i>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Ajout du loader -->
    <LoaderBlockComponent :isLoading="showSpinner" :message="loaderMessage" />
  </div>
</template>

<script>
import axiosinstance from "../../services/loginAndRegistration.js";
import Swal from "sweetalert2";
import LoaderBlockComponent from "../../components/front/LoaderBlockComponent.vue";

export default {
  data() {
    return {
      showSpinner: false,
      loaderMessage: "Authentification en cours...",
      userData: {
        email: "",
        password: "",
      },
    };
  },
  components: { LoaderBlockComponent },
  methods: {
    LoginField() {
      this.showSpinner = true;
      console.log("VERIFICATION Pass " + this.userData.password);

      if (this.userData.email !== "" && this.userData.password !== "") {
        axiosinstance
          .post(`/users/login`, this.userData)
          .then((data) => {
            if (data.status === 200) {
              localStorage.setItem("token", data.data.token);
              localStorage.setItem("codeUser", data.data.codeUser);
              localStorage.setItem("currentRole", data.data.roles);

              setTimeout(() => {
                this.$store.commit("MutLogedUser", data.data);
              }, 100);

              setTimeout(() => {
                this.$router.push({ name: "dashboard" });
                this.$store.commit("mutLogin", true);
              }, 1000);
            }
          })
          .catch((error) => {
            setTimeout(() => {
              this.showSpinner = false;
              const message =
                error.response &&
                error.response.data &&
                error.response.data.message
                  ? error.response.data.message
                  : "Une erreur est survenue.";

              Swal.fire({
                title: "Erreur",
                text: message,
                timer: 3000,
                showConfirmButton: false,
              });
            }, 1000);
          });
      }
    },
  },
  mounted() {},
};
</script>


<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5; // Fond gris clair
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;

  .box {
    position: relative;
    width: 100%;
    max-width: 400px;
    background: #ffffff;
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border: 1px solid #e0e0e0;
  }

  .login-form-z {
    h2 {
      font-size: 1.2rem;
      color: #333;
      text-align: center;
      font-weight: 600;
      margin-bottom: 40px !important;
    }
  }

  .block-images {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    .img-logo-size {
      max-width: 150px;
      height: auto;
    }
  }

  .login-input-box {
    position: relative;
    margin-bottom: 30px;
    width: 100%;

    input[required] + span::after {
      content: " *";
      color: #ff4444; // Rouge pour l'astérisque
      font-weight: bold;
    }

    input {
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
          color: #4caf50;

          &::before {
            // L'astérisque reste rouge même quand le champ est actif
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

  .libelle-form {
    color: #666 !important; // Gris foncé pour le texte
  }
}

// Style personnalisé pour SweetAlert2
.swal2-popup {
  background: #ffffff !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
  border: 1px solid #e0e0e0 !important;
  padding: 2rem !important;

  .swal2-title {
    color: #333 !important;
    font-size: 1.5rem !important;
    font-weight: 600 !important;
  }

  .swal2-content {
    color: #666 !important;
    font-size: 1rem !important;
  }

  // Style pour les alertes d'erreur
  &.swal2-icon-error {
    .swal2-icon {
      color: #ff4444 !important;
      border-color: #ff4444 !important;
    }

    .swal2-title {
      color: #ff4444 !important;
    }
  }

  // Style pour les alertes de succès (au cas où vous en auriez besoin plus tard)
  &.swal2-icon-success {
    .swal2-icon {
      color: #4caf50 !important;
      border-color: #4caf50 !important;
    }

    .swal2-title {
      color: #4caf50 !important;
    }
  }

  // Style pour le bouton de confirmation (si vous l'utilisez)
  .swal2-confirm {
    background-color: #4caf50 !important;
    border: none !important;
    padding: 0.5rem 1.5rem !important;
    border-radius: 30px !important;
    font-weight: 600 !important;
    transition: all 0.3s !important;

    &:hover {
      background-color: #45a049 !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
    }

    &:active {
      transform: translateY(0) !important;
    }
  }
}
</style>
