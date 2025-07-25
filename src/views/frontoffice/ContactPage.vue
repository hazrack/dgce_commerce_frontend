<template>
  <div class="ministry-portal">
     <UnderNavComponent />

    <!-- Section principale -->
    <main class="main-section">
      <div class="page-container">
        <!-- Bannière de présentation -->
        <section class="presentation-banner">
          <div class="banner-content">
            <h2>Service de Contact Citoyen</h2>
            <p>
              Votre voix compte pour le développement du commerce en Côte
              d'Ivoire
            </p>
          </div>
          <div class="banner-decoration">
            <div class="decoration-circle"></div>
            <div class="decoration-circle"></div>
            <div class="decoration-circle"></div>
          </div>
        </section>

        <!-- Zone de contenu principal -->
        <div class="content-layout">
          <!-- Informations de contact -->
          <aside class="contact-info-panel">
            <div class="info-card">
              <h3>Nos Coordonnées</h3>

              <div class="contact-detail">
                <div class="contact-icon">
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    />
                  </svg>
                </div>
                <div class="contact-text">
                  <strong>Adresse</strong>
                  <span>Abidjan, Plateau - Côte d'Ivoire</span>
                </div>
              </div>

              <div class="contact-detail">
                <div class="contact-icon">
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                    />
                  </svg>
                </div>
                <div class="contact-text">
                  <strong>Téléphone</strong>
                  <span>+225 XX XX XX XX</span>
                </div>
              </div>

              <div class="contact-detail">
                <div class="contact-icon">
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                    />
                  </svg>
                </div>
                <div class="contact-text">
                  <strong>Email</strong>
                  <span>contact@commerce.gouv.ci</span>
                </div>
              </div>
            </div>

            <div class="service-hours">
              <h4>Heures de Service</h4>
              <div class="hours-list">
                <div class="hour-item">
                  <span>Lundi - Vendredi</span>
                  <span>08h00 - 17h00</span>
                </div>
                <div class="hour-item">
                  <span>Samedi</span>
                  <span>08h00 - 12h00</span>
                </div>
              </div>
            </div>
          </aside>

          <!-- Formulaire de contact -->
          <section class="contact-form-section">
            <div class="form-container">
              <div class="form-header">
                <h3>Contactez-Nous</h3>
                <p>
                  Remplissez ce formulaire pour nous faire parvenir votre
                  message
                </p>
              </div>

              <form @submit.prevent="submitPrimeForm" class="contact-form">
                <div class="form-grid">
                  <div
                    v-for="(field, index) in contactFields"
                    :key="index"
                    class="field-group"
                    :class="{ 'field-full-width': field.type === 'textarea' }"
                  >
                    <label :for="field.model" class="field-label">
                      {{ field.label }}
                      <span v-if="field.required" class="required-mark">*</span>
                    </label>

                    <!-- Textarea -->
                    <template v-if="field.type === 'textarea'">
                      <textarea
                        :id="field.model"
                        v-model="packs[field.model]"
                        :required="field.required"
                        rows="4"
                        class="field-textarea"
                        :placeholder="`Saisissez votre ${field.label.toLowerCase()}`"
                      ></textarea>
                    </template>

                    <!-- Input fields -->
                    <template v-else>
                      <input
                        :id="field.model"
                        :type="field.type"
                        :required="field.required"
                        v-model="packs[field.model]"
                        :readonly="field.readonly"
                        :minlength="field.type === 'tel' ? 8 : null"
                        :maxlength="field.type === 'tel' ? 15 : null"
                        class="field-input"
                        :placeholder="`Saisissez votre ${field.label.toLowerCase()}`"
                      />
                    </template>
                  </div>
                </div>

                <div class="form-submit">
                  <button type="submit" class="submit-button">
                    <svg
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                    Envoyer le Message
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>

    <LoaderBlockComponent :isLoading="showSpinner" :message="loaderMessage" />
  </div>
</template>

<script>
import LoaderBlockComponent from "@/components/front/LoaderBlockComponent.vue";
import axios from "../../services/loginAndRegistration.js";
import Swal from "sweetalert2";
import UnderNavComponent from "@/components/front/UnderNavComponent.vue";

export default {
  data() {
    return {
      packs: {},
      contactFields: [],
      loaderMessage: "Nous transmettons votre message, un instant...",
      showSpinner: false,
    };
  },
  components: {
    LoaderBlockComponent,
    UnderNavComponent
  },
  methods: {
    getFieldsReformDaata() {
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
        email: "",
        telephone: "",
        message: "",
      };
    },

    submitPrimeForm() {
      console.log("LES DONNEE PASSEE : ", this.packs);
      this.showSpinner = true;

      setTimeout(() => {
        this.showSpinner = false;
      }, 3000);

      axios
        .post("/contact/submit-client", this.packs)
        .then((res) => {
          console.log("LE RETOUR CHECK ", res.data);

          Swal.fire({
            icon: "success",
            title: "Message envoyé !",
            text: "Nous vous répondrons bientôt.",
            timer: 4000,
            showConfirmButton: false,
          });

          setTimeout(() => {
            this.getDefaultPacksData();
          }, 100);
        })
        .catch((error) => {
          console.log("ERREUR ", error.response);

          Swal.fire({
            icon: "error",
            title: "Erreur rencontré !",
            text: `${error.response.data.message}`,
            timer: 4000,
            showConfirmButton: false,
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.ministry-portal {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

// En-tête officiel
.official-header {
  background: linear-gradient(135deg, #ff8c00 0%, #ff7700 100%);
  color: white;
  padding: 1.5rem 0;
  box-shadow: 0 4px 20px rgba(255, 140, 0, 0.3);

  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ministry-brand {
    display: flex;
    align-items: center;
    gap: 1rem;

    .coat-of-arms {
      flex-shrink: 0;
    }

    .ministry-title {
      h1 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      p {
        font-size: 0.9rem;
        opacity: 0.9;
        font-weight: 300;
      }
    }
  }

  .national-motto {
    font-style: italic;
    font-size: 0.9rem;
    opacity: 0.8;
  }
}

// Section principale
.main-section {
  padding: 3rem 0;

  .page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
}

// Bannière de présentation
.presentation-banner {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff8c00, #ff7700);
  }

  .banner-content {
    flex: 1;

    h2 {
      color: #2c3e50;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    p {
      color: #6c757d;
      font-size: 1.1rem;
      line-height: 1.6;
    }
  }

  .banner-decoration {
    display: flex;
    gap: 1rem;
    align-items: center;

    .decoration-circle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ff8c00, #ff7700);
      opacity: 0.1;

      &:nth-child(2) {
        width: 80px;
        height: 80px;
        opacity: 0.15;
      }

      &:nth-child(3) {
        width: 100px;
        height: 100px;
        opacity: 0.1;
      }
    }
  }
}

// Layout du contenu
.content-layout {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 3rem;
  align-items: start;
}

// Panneau d'informations
.contact-info-panel {
  .info-card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;

    h3 {
      color: #ff8c00;
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .contact-detail {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 12px;
      transition: all 0.3s ease;

      &:hover {
        background: #fff;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }

      .contact-icon {
        background: linear-gradient(135deg, #ff8c00, #ff7700);
        color: white;
        padding: 0.75rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .contact-text {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        strong {
          color: #2c3e50;
          font-weight: 600;
        }

        span {
          color: #6c757d;
          font-size: 0.9rem;
        }
      }
    }
  }

  .service-hours {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    h4 {
      color: #ff8c00;
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 1rem;
      text-align: center;
    }

    .hours-list {
      .hour-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 0;
        border-bottom: 1px solid #e9ecef;

        &:last-child {
          border-bottom: none;
        }

        span:first-child {
          color: #2c3e50;
          font-weight: 500;
        }

        span:last-child {
          color: #6c757d;
          font-size: 0.9rem;
        }
      }
    }
  }
}

// Section formulaire
.contact-form-section {
  .form-container {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .form-header {
    text-align: center;
    margin-bottom: 2rem;

    h3 {
      color: #2c3e50;
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    p {
      color: #6c757d;
      font-size: 1rem;
    }
  }
}

// Formulaire
.contact-form {
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .field-group {
    display: flex;
    flex-direction: column;

    &.field-full-width {
      grid-column: 1 / -1;
    }
  }

  .field-label {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;

    .required-mark {
      color: #e74c3c;
      margin-left: 0.25rem;
    }
  }

  .field-input,
  .field-textarea {
    padding: 1rem;
    border: 2px solid #e9ecef;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #fff;

    &:focus {
      outline: none;
      border-color: #ff8c00;
      box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.1);
    }

    &::placeholder {
      color: #adb5bd;
    }
  }

  .field-textarea {
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
  }
}

.form-submit {
  text-align: center;

  .submit-button {
    background: linear-gradient(135deg, #ff8c00, #ff7700);
    color: white;
    border: none;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 15px rgba(255, 140, 0, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 140, 0, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .content-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-info-panel {
    order: 2;
  }

  .contact-form-section {
    order: 1;
  }
}

@media (max-width: 768px) {
  .official-header {
    .header-container {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    .ministry-brand {
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  .presentation-banner {
    flex-direction: column;
    text-align: center;
    gap: 2rem;

    .banner-decoration {
      justify-content: center;
    }
  }

  .contact-form {
    .form-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .main-section {
    padding: 2rem 0;

    .page-container {
      padding: 0 1rem;
    }
  }

  .presentation-banner,
  .contact-info-panel .info-card,
  .contact-info-panel .service-hours,
  .contact-form-section .form-container {
    padding: 1.5rem;
  }

  .form-submit .submit-button {
    width: 100%;
    justify-content: center;
  }
}
</style>