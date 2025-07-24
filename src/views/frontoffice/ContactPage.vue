<template>
  <div class="contact-form-page">
    <div class="formulaire-zone mt-4 mb-2">
      <form @submit.prevent="submitPrimeForm">
        <div class="form-zone">
          <h2 data-aos="fade-up" data-aos-duration="1000">CONTACTEZ-NOUS</h2>

          <div class="blockBox">
            <div
              class="inputBox"
              v-for="(field, index) in contactFields"
              :key="index"
            >
              <!-- Gestion des champs select -->
              <!-- <template v-if="field.type === 'select'">
                <select 
                  v-model="packs[field.model]" 
                  :required="field.required"
                  @change="field.model === 'periodicite' ? handlePeriodChange($event.target.value) : null"
                >
                  <option
                    v-for="option in field.options"
                    :key="option.value"
                    :value="option.label"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </template> -->

              <!-- Gestion du textarea -->
              <template v-if="field.type === 'textarea'">
                <textarea
                  v-model="packs[field.model]"
                  :required="field.required"
                  rows="4"
                ></textarea>
              </template>

              <!-- Gestion des champs input classiques -->
              <template v-else>
                <input
                  :type="field.type"
                  :required="field.required"
                  v-model="packs[field.model]"
                  :readonly="field.readonly"
                  :minlength="field.type === 'tel' ? 8 : null"
                  :maxlength="field.type === 'tel' ? 15 : null"
                />
              </template>

              <span>{{ field.label }}</span>
              <i></i>
            </div>
          </div>

          <div class="text-center mt-5">
            <button type="submit" value="S'INSCRIRE" />
          </div>
          <span class="hide-span">.........</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "../../services/index.js";
import Swal from "sweetalert2";

import _ from "lodash";
import moment from 'moment'
import { mapGetters } from "vuex";

export default {
  data() {
    return {

      packs: {},
      contactFields: [],
    };
  },
  created() {
    
  },

  computed: {
  },
  
  methods: {

    getFieldsReformDaata(){

    this.contactFields = [

     
      {
        label: "Nom ",
        type: "text",
        required: true,
        model: "nom",
      },
      {
        label: "Prenom ",
        type: "text",
        required: true,
        model: "prenom",
      },
      {
        label: "Téléphone",
        type: "tel",
        required: true,
        model: "telephone",
      },
      {
        label: "Email",
        type: "email",
        required: true,
        model: "email",
      },

      {
        label: "Message ",
        type: "textarea",
        required: false,
        model: "message",        
      },
     
    ];

   
    },

   

    
    getDefaultPacksData() {

      this.packs = {
        nom: "",
        prenom: "",
        email:"",
        telephone: "",
        message:""
        
      };
    },
   

    submitPrimeForm() {
      this.createNewEtudiant(this.packs);
    },

    createNewEtudiant(datas) {
      console.log('LES DONNEE PASSEE : ',datas);
      
      axios
        .post("/contact/submit-client", datas)
        .then((res) => {
          console.log("LE RETOUR CHECK ", res.data); 
          
          Swal.fire({
          icon: "success",
          title: "Message envoyé !",
            text: "Nous vous répondrons bientôt.",
            timer: 4000,
            showConfirmButton: false
          });

          setTimeout(() => {
            this.getDefaultPacksData();
          }, 100);
        })
        .catch((error) => {
          console.log('ERREUR ', error.response);
          
          Swal.fire({
          icon: "error",
          title: "Erreur rencontré !",
            text: `${error.response.data.message}`,
            timer: 4000,
            showConfirmButton: false
          });
        });
    },
  },

  mounted() {


    setTimeout(() => {
        this.getDefaultPacksData();
        this.getFieldsReformDaata();
    }, 20);
  },
};
</script>

<style lang="scss" scoped>



@media (max-width: 700px) {
  .formulaire-zone {
    .blockBox {
      display: block !important;

    }
  }

}

.contact-form-page{
  margin: 50px 0;
  height: 80vh;
  overflow: hidden;
}
.right-block {
  display: flex;
  gap: 14px;
}

.form-zone {
  padding: 30px 20px;
  height: 350px;

  .inputBox {
    width: 100%;

    i {
      background: #fff;
    }

    input:valid ~ span,
    input:focus ~ span,
    select:valid ~ span,
    select:focus ~ span {
      color: #fff;
    }
  }



  

}

.form-zone {
  position: absolute;
  inset: 2px;
  // background: #28292d;  //GRIS NOIR
  background: #242222; 
  z-index: 10;
  border-radius: 8px;
  padding: 25px 40px;
  display: flex;
  flex-direction: column;

  h2 {
    color: #FF6B07;
    text-align: center;
    letter-spacing: 0.1em;
    font-weight: bold;
    text-transform: uppercase;
  }

  .inputBox {
    position: relative;
    width: 300px;
    margin-top: 35px;

    input,select, textarea {
      position: relative;
      width: 100%;
      padding: 20px 10px 10px;
      background: transparent;
      border: none;
      outline: none;
      color: #fff;
      font-size: 1em;
      letter-spacing: 0.05em;
      z-index: 10;

      // resize: none; /* Empêche le redimensionnement manuel */

    }

    span {
      position: absolute;
      left: 0;
      padding: 20px 0px 10px;
      font-size: 1em;
      color: #8f8f8f;
      pointer-events: none;
      letter-spacing: 0.05em;
      transition: 0.5s;
    }

    input:valid ~ span,
    input:focus ~ span, select:valid ~ span,
    select:focus ~ span,
    input:read-only ~ span {
      color: #FF6B07;
      transform: translateX(0px) translateY(-34px);
      font-size: 0.75em;
    }

    i {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: #FF6B07;
      border-radius: 4px;
      transition: 0.5s;
      pointer-events: none;
      z-index: 9;
    }

    input:valid ~ i,
    input:focus ~ i, select:valid ~ span,
    select:focus ~ span {
      height: 44px;
    }
  }

  .links {
    display: flex;
    justify-content: space-between;

    a {
      margin: 12px 0;
      font-size: 0.75em;
      color: #8f8f8f;
      text-decoration: none;
      cursor: pointer !important;
      &:hover,
      &:nth-child(2) {
        color: #FF6B07;
      }
    }
  }

  button,
  input[type="submit"] {
    border: none;
    outline: none;
    background: #000;
    color: #fff;
    transition: 0.5s ease-in;
    padding: 11px 16px;
    width: 50% !important;
    margin: 20px 0 ;
    border-radius: 4px;
    font-weight: 600;
  }

  input[type="submit"]:hover {
    cursor: pointer !important;
    transition: 0.5s ease-in;
    background: #ff8c00 !important;
    color: #fff;
    transform: scale(1.05);
  }

  


  
}


.formulaire-zone {
  position: relative;
  min-height: 500px;

  .form-zone {
    background: transparent;
    .inputBox {
      width: 100%;

      i {
        background: #d9d9d9;
      }

      input,select, textarea {
        color: #23242a;
      }

      input:valid ~ span,
      input:focus ~ span,
      select:valid ~ span,
      select:focus ~ span,
      textarea:valid ~ span,
      textarea:focus ~ span {
        color: #FF6B07;
      }
    }
  }
}

.formulaire-zone {
  .blockBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .inputBox {
      flex: 0 0 48%;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
  }


}

.h2-spacing-pack {
  margin: 50px 0 -5px 0;
}

input:read-only ~ i {
  height: 44px;
}

.hide-span{
  opacity: 0;
}
.success-recu{
  p {
    font-weight: 500 !important;
    color: #fff !important;
    font-size: 16px !important;
  }
}

.newline-home {
    text-align: center;
    color: #fff;

    .block-images{
      img{
        border-radius: 50%;
      }
    }
}


textarea {
  margin-top: 10px;
    height: 100px; /* Ajuste la hauteur du textarea */
  }

textarea:valid ~ span,
  textarea:focus ~ span {
    color: #FF6B07;
    transform: translateX(0px) translateY(-34px);
    font-size: 0.75em;
  }
</style>

