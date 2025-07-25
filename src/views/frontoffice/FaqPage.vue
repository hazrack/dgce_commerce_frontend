<template>
  <div class="faq-portal">
    <!-- En-tête officiel -->
    <header class="official-header">
      <div class="header-container">
        <div class="ministry-brand">
          <div class="coat-of-arms">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
              <circle cx="25" cy="25" r="24" fill="#FF8C00" stroke="#fff" stroke-width="2"/>
              <path d="M25 10L35 20V40H15V20L25 10Z" fill="white"/>
              <rect x="22" y="25" width="6" height="10" fill="#FF8C00"/>
            </svg>
          </div>
          <div class="ministry-title">
            <h1>MINISTÈRE DU COMMERCE</h1>
            <p>République de Côte d'Ivoire</p>
          </div>
        </div>
        <div class="national-motto">
          <span>Union - Discipline - Travail</span>
        </div>
      </div>
    </header>

    <!-- Section principale -->
    <main class="main-section">
      <div class="page-container">
        <!-- Bannière titre -->
        <section class="page-banner">
          <div class="banner-content">
            <h2>Foire Aux Questions</h2>
            <p>Commerce Extérieur de la Côte d'Ivoire</p>
            
          </div>
        </section>

        <!-- Contenu principal -->
        <div class="content-layout">
                       
          <!-- Section FAQ -->
          <section class="faq-section">
            <div class="faq-container">
              <div class="faq-header">
                <h3>Questions Fréquemment Posées</h3>
                <p>Trouvez rapidement les réponses à vos questions sur le commerce extérieur</p>
              </div>

              <div class="accordion-container">
                <div 
                  v-for="(faq, index) in faqData" 
                  :key="index"
                  class="accordion-item"
                  :class="{ 'active': activeAccordion === index }"
                >
                  <div 
                    class="accordion-header"
                    @click="toggleAccordion(index)"
                  >
                    <h4>{{ faq.question }}</h4>
                    <div class="accordion-icon">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="accordion-content">
                    <div class="accordion-body">
                      <p v-html="faq.answer"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeAccordion: null,
      faqData: [
        {
          question: "Quels sont les principaux produits d'exportation de la Côte d'Ivoire ?",
          answer: "La Côte d'Ivoire exporte principalement du <strong>cacao</strong> (1er producteur mondial), du <strong>café</strong>, de l'<strong>anacarde</strong> (1er exportateur mondial), du <strong>caoutchouc</strong>, de l'<strong>huile de palme</strong>, et des produits pétroliers raffinés. Le cacao représente à lui seul plus de 40% des recettes d'exportation du pays."
        },
        {
          question: "Comment obtenir une licence d'exportation en Côte d'Ivoire ?",
          answer: "Pour obtenir une licence d'exportation, vous devez :<br>• Vous inscrire au Registre du Commerce<br>• Obtenir un numéro d'identification fiscale<br>• Déposer une demande auprès du Centre de Promotion des Exportations<br>• Fournir les documents requis (statuts, bilan, etc.)<br>• Payer les frais de dossier<br>Le délai de traitement est généralement de 15 jours ouvrables."
        },
        {
          question: "Quels sont les principaux partenaires commerciaux de la Côte d'Ivoire ?",
          answer: "Les principaux partenaires commerciaux sont :<br>• <strong>Union Européenne</strong> : 45% des échanges (Pays-Bas, Allemagne, France)<br>• <strong>États-Unis</strong> : 18% des exportations<br>• <strong>Chine</strong> : 12% des échanges<br>• <strong>Pays de la CEDEAO</strong> : 25% du commerce régional<br>• <strong>Inde</strong> et <strong>Malaisie</strong> pour l'anacarde"
        },
        {
          question: "Quelles sont les procédures douanières pour l'exportation ?",
          answer: "Les procédures incluent :<br>• Déclaration en douane via le système SYDAM<br>• Contrôle qualité par les organismes agréés<br>• Inspection physique si nécessaire<br>• Paiement des taxes et redevances<br>• Obtention du bon à enlever<br>• Embarquement sous supervision douanière<br>Tous les documents doivent être conformes aux normes internationales."
        },
        {
          question: "Comment bénéficier des accords commerciaux préférentiels ?",
          answer: "La Côte d'Ivoire bénéficie de plusieurs accords :<br>• <strong>Accord de Partenariat Économique (APE)</strong> avec l'UE<br>• <strong>AGOA</strong> pour l'accès au marché américain<br>• <strong>Tarif Préférentiel Généralisé (TPG)</strong><br>• <strong>Accords CEDEAO</strong> pour le marché régional<br>Pour en bénéficier, les produits doivent respecter les règles d'origine et obtenir les certificats appropriés."
        },
        {
          question: "Quels sont les ports d'exportation principaux ?",
          answer: "Les principaux ports sont :<br>• <strong>Port Autonome d'Abidjan</strong> : 90% du trafic national<br>• <strong>Port de San-Pédro</strong> : spécialisé dans les produits agricoles<br>• <strong>Aéroport Félix Houphouët-Boigny</strong> : pour les produits de haute valeur<br>Le Port d'Abidjan est le plus grand port de l'Afrique de l'Ouest francophone."
        },
        {
          question: "Comment obtenir un certificat d'origine ?",
          answer: "Le certificat d'origine s'obtient auprès de :<br>• La <strong>Chambre de Commerce et d'Industrie</strong><br>• L'<strong>APEX-CI</strong> (Agence de Promotion des Exportations)<br>• Les <strong>organismes de contrôle agréés</strong><br>Documents requis : facture commerciale, liste de colisage, déclaration du producteur. Le certificat est délivré sous 48h après vérification."
        },
        {
          question: "Quelles sont les normes de qualité à respecter ?",
          answer: "Les normes incluent :<br>• <strong>Normes internationales</strong> : ISO, Codex Alimentarius<br>• <strong>Certifications biologiques</strong> : pour les produits bio<br>• <strong>Commerce équitable</strong> : Fairtrade, Rainforest Alliance<br>• <strong>Normes phytosanitaires</strong> : certificats CITES si nécessaire<br>• <strong>Traçabilité</strong> : obligatoire pour certains produits agricoles"
        }
      ]
    }
  },
  methods: {
    toggleAccordion(index) {
      this.activeAccordion = this.activeAccordion === index ? null : index;
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.faq-portal {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

// En-tête officiel
.official-header {
  background: linear-gradient(135deg, #FF8C00 0%, #FF7700 100%);
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
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

// Bannière de page
.page-banner {
  background: white;
  border-radius: 16px;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #FF8C00, #FF7700);
  }

  .banner-content {
    text-align: center;

    h2 {
      color: #2c3e50;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    p {
      color: #6c757d;
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
  }

  .banner-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;

    .stat-item {
      text-align: center;

      .stat-number {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: #FF8C00;
        margin-bottom: 0.25rem;
      }

      .stat-label {
        color: #6c757d;
        font-size: 0.9rem;
      }
    }
  }
}

// Layout du contenu


// Section FAQ
.faq-section {
  .faq-container {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  }

  .faq-header {
    text-align: center;
    margin-bottom: 2.5rem;

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

// Accordéons
.accordion-container {
  .accordion-item {
    border: 1px solid #e9ecef;
    border-radius: 12px;
    margin-bottom: 1rem;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    }

    &.active {
      border-color: #FF8C00;
      box-shadow: 0 4px 20px rgba(255, 140, 0, 0.2);

      .accordion-header {
        background: linear-gradient(135deg, #FF8C00, #FF7700);
        color: white;

        .accordion-icon svg {
          transform: rotate(180deg);
        }
      }

      .accordion-content {
        max-height: 500px;
        padding: 1.5rem;
      }
    }
  }

  .accordion-header {
    padding: 1.5rem;
    background: #f8f9fa;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;

    h4 {
      color: #2c3e50;
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
      flex: 1;
    }

    .accordion-icon {
      margin-left: 1rem;
      
      svg {
        transition: transform 0.3s ease;
      }
    }

    &:hover {
      background: #e9ecef;
    }
  }

  .accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    background: white;

    .accordion-body {
      p {
        color: #2c3e50;
        line-height: 1.7;
        margin: 0;

        strong {
          color: #FF8C00;
        }
      }
    }
  }
}

// Responsive Design
@media (max-width: 1024px) {



  .faq-section {
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

  .page-banner {
    padding: 2rem;

    .banner-content h2 {
      font-size: 2rem;
    }
  }

  .accordion-header {
    padding: 1rem;

    h4 {
      font-size: 1rem;
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

  .page-banner,
  .faq-section .faq-container {
    padding: 1.5rem;
  }
}
</style>