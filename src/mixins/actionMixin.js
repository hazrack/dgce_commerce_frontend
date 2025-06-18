import axios from "../services/index.js";
import Swal from "sweetalert2";

export default {
    methods: {

      processAfterSuccess(callback = null) {
        Swal.fire({
          title: "Succès !",
          text: "Action effectuée avec succès !",
          timer: 2500,
          showConfirmButton: false,
        });
  
        setTimeout(() => {
          if (callback) callback();
          this.editMode = false;
        }, 300);
  
        setTimeout(() => {
          this.showSpinner = false;
        }, 1500);
      },
  
      processError(error) {
        this.showSpinner = false;

         if (error.response && error.response.status === 401) {
    // Si tu utilises Vuex, déclenche une mutation globale :
          this.$store.commit("mutLogin", false);
          localStorage.clear();

          Swal.fire({
            title: "Session expirée",
            text: "Votre session a expiré. Veuillez vous reconnecter.",
            icon: "warning",
            timer: 3000,
            showConfirmButton: false,
          });

          return;
        }

        const message =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Une erreur est survenue.";
  
        Swal.fire({
          title: "Erreur",
          text: message,
          timer: 3000,
          showConfirmButton: false,
        });
      },
  
      processRequest({ method, url, data = null, onSuccess = null }) {
        this.showSpinner = true;
        axios[method](url, data)
          .then(() => {
            this.processAfterSuccess(onSuccess);
            this.showUserForm = false;
          })
          .catch((error) => {
            this.processError(error);
          });
      },

      downloadFromBackend(url,fileName) {
        axios
          .get(`${url}`, {
            responseType: "blob",
          })
          .then((response) => {
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.showSpinner = false;
          })
          .catch((error) => {
            this.showSpinner = false;
            console.error("Erreur lors du téléchargement :", error);
            this.processError(error);
          });
      },
    
    }
  };
  