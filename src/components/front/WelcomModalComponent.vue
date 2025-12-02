<template>
  <!-- Modal de bienvenue -->
  <div v-if="showWelcomeModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <button class="modal-close" @click="closeModal" aria-label="Fermer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <div class="modal-content">
        <!-- Header avec logos -->
        <div class="modal-header">
          <div class="logos-container">
            <div class="logo-item ministere-logo">
              <img src="../../assets/images/mci.png" alt="Ministère du Commerce et de l'Industrie" class="logo-img">
            </div>
            <div class="logo-item dgce-logo">
              <img src="../../assets/images/dgce.png" alt="DGCE" class="logo-img">
            </div>
          </div>
        </div>

        <!-- Titre dans une div séparée -->
        <div class="title-section">
          <h2 class="modal-title">Bienvenue sur COMEXMAP</h2>
        </div>

        <!-- Sous-titre dans une div séparée -->
        <div class="subtitle-section">
          <p class="modal-subtitle">La plateforme numérique d'information commerciale, intégrée et innovante, au service des acteurs du commerce extérieur</p>
        </div>
        
        <div class="modal-body">
          <p class="modal-description">
            Inscrite à l'Agenda du Programme de Travail Gouvernemental, <strong>COMEXMAP</strong> est une plateforme numérique conçue comme un véritable outil stratégique de prospection économique et d'orientation des stratégies commerciales au service des acteurs du commerce extérieur.
          </p>
          
          <p class="modal-description">
            Elle met à la disposition des entreprises, investisseurs et institutions un accès structuré, centralisé et fiable à des informations commerciales essentielles pour prendre des décisions éclairées et renforcer leur positionnement sur les marchés.
          </p>
          
          <div class="modal-features">
            <h3 class="features-title">Nos modules</h3>
            <div class="features-grid">
              <div class="feature-item">
                <span class="feature-icon">📋</span>
                <span>Accords commerciaux</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📊</span>
                <span>Statistiques du commerce extérieur</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📦</span>
                <span>Analyse des produits échangés</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🌍</span>
                <span>Classement des partenaires commerciaux</span>
              </div>
            </div>
          </div>
          
          <p class="modal-description">
            En favorisant l'accès à une information pertinente et actualisée, COMEXMAP contribue directement au renforcement de la productivité et de la compétitivité du secteur privé ivoirien, tout en accompagnant son expansion sur les marchés régionaux et internationaux.
          </p>
        </div>
        
        <div class="modal-footer">
          <button class="btn-primary" @click="closeModal">
            Découvrir la plateforme
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeModal',
  
  data() {
    return {
      showWelcomeModal: false,
    };
  },
  
  mounted() {
    this.checkFirstVisit();
  },
  
  methods: {
    checkFirstVisit() {
      const hasVisited = localStorage.getItem('comexmap_visited');
      if (!hasVisited) {
        this.showWelcomeModal = true;
      }
    },
    
    closeModal() {
      this.showWelcomeModal = false;
      localStorage.setItem('comexmap_visited', 'true');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  backdrop-filter: blur(8px);
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-container {
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border-radius: 24px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(60px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 102, 0, 0.1);
  border: 2px solid #ff6600;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(255, 102, 0, 0.2);

  &:hover {
    background: #ff6600;
    transform: rotate(90deg) scale(1.1);
    
    svg {
      color: white;
    }
  }

  svg {
    color: #ff6600;
    transition: color 0.3s ease;
  }
}

.modal-content {
  padding: 40px;
}

// Header avec logos
.modal-header {
  margin-bottom: 25px;
}

.logos-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(255, 102, 0, 0.05) 0%, rgba(0, 140, 0, 0.05) 100%);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.logo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background: white;
  width: 200px;
  height: 100px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
}

.ministere-logo {
  border: 3px solid #ff6600;
  
  &:hover {
    border-color: #e55a00;
    box-shadow: 0 10px 30px rgba(255, 102, 0, 0.3);
  }
}

.dgce-logo {
  border: 3px solid #008c00;
  
  &:hover {
    border-color: #006600;
    box-shadow: 0 10px 30px rgba(0, 140, 0, 0.3);
  }
}

.logo-img {
  max-width: 120px;
  max-height: 80px;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}

// Section titre
.title-section {
  text-align: center;
  padding: 25px 20px;
  background: linear-gradient(135deg, #ff6600 0%, #e55a00 100%);
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 8px 25px rgba(255, 102, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: rotate(45deg);
    animation: shine 3s infinite;
  }
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.modal-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: white;
  margin: 0;
  line-height: 1.3;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
}

// Section sous-titre
.subtitle-section {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, rgba(0, 140, 0, 0.1) 0%, rgba(0, 140, 0, 0.05) 100%);
  border-radius: 12px;
  border-left: 5px solid #008c00;
  border-right: 5px solid #ff6600;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.modal-subtitle {
  font-size: 1.15rem;
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
  line-height: 1.6;
  font-style: italic;
}

.modal-body {
  .modal-description {
    font-size: 1.05rem;
    line-height: 1.9;
    color: #444;
    margin-bottom: 20px;
    text-align: justify;
    padding: 0 10px;

    strong {
      color: #ff6600;
      font-weight: 700;
      font-size: 1.1rem;
    }
  }
}

.modal-features {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 30px;
  border-radius: 16px;
  margin: 35px 0;
  border: 3px solid rgba(255, 102, 0, 0.2);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(180deg, #ff6600 0%, #008c00 100%);
    border-radius: 16px 0 0 16px;
  }
}

.features-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 25px 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #ff6600 0%, #008c00 100%);
    border-radius: 2px;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  margin-top: 30px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px;
  background: white;
  border-radius: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, #ff6600 0%, #008c00 100%);
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateX(8px);
    box-shadow: 0 10px 25px rgba(255, 102, 0, 0.2);
    border-color: #ff6600;
    
    &::before {
      transform: scaleY(1);
    }
  }

  .feature-icon {
    font-size: 1.8rem;
    flex-shrink: 0;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  span:last-child {
    font-size: 1rem;
    color: #333;
    font-weight: 600;
    line-height: 1.4;
  }
}

.modal-footer {
  text-align: center;
  margin-top: 35px;
  padding-top: 25px;
  border-top: 3px solid #f0f0f0;
}

.btn-primary {
  background: linear-gradient(135deg, #ff6600 0%, #e55a00 100%);
  color: white;
  border: none;
  padding: 18px 55px;
  font-size: 1.15rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(255, 102, 0, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #008c00 0%, #006600 100%);
    transition: left 0.4s ease;
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(255, 102, 0, 0.5);
    
    &::before {
      left: 0;
    }
  }

  &:active {
    transform: translateY(-1px);
  }
  
  // Le texte doit être au-dessus de l'overlay
  span {
    position: relative;
    z-index: 1;
  }
}

// Responsive
@media (max-width: 768px) {
  .modal-container {
    margin: 10px;
    max-height: 95vh;
  }

  .modal-content {
    padding: 30px 20px;
  }

  .logos-container {
    flex-direction: column;
    gap: 20px;
  }

  .logo-img {
    max-width: 100px;
    max-height: 70px;
  }

  .title-section {
    padding: 20px 15px;
  }

  .modal-title {
    font-size: 1.6rem;
  }

  .subtitle-section {
    padding: 15px;
  }

  .modal-subtitle {
    font-size: 1rem;
  }

  .modal-description {
    font-size: 0.95rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .btn-primary {
    padding: 15px 40px;
    font-size: 1rem;
  }
}

// Scrollbar personnalisé pour le modal
.modal-container::-webkit-scrollbar {
  width: 10px;
}

.modal-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.modal-container::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #ff6600 0%, #008c00 100%);
  border-radius: 10px;
  border: 2px solid #f1f1f1;
}

.modal-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #e55a00 0%, #006600 100%);
}
</style>