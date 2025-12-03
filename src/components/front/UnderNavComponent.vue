<template>
  <div>
    <header class="official-header">
      <div class="header-container">
        <div class="ministry-brand">
          <div class="coat-of-arms">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
              <circle
                cx="25"
                cy="25"
                r="24"
                fill="#FF8C00"
                stroke="#fff"
                stroke-width="2"
              />
              <path d="M25 10L35 20V40H15V20L25 10Z" fill="white" />
              <rect x="22" y="25" width="6" height="10" fill="#FF8C00" />
            </svg>
          </div>
          <div class="ministry-title">
            <h1>MINISTÈRE DU COMMERCE ET DE L'INDUSTRIE</h1>
            <!-- <p>République de Côte d'Ivoire</p> -->
          </div>
        </div>
        <div class="national-motto">
          <p>Dernière mise à jour</p>
          <span>03-12-2025</span>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">

//HEADER PAGE
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
  }}
</style>