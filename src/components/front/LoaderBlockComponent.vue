<template>
    <transition name="fade">
      <div v-if="isLoading" class="loader-overlay">
        <div class="loader-content">
          <div class="loader-spinner"></div>
          <div class="loader-text">{{ message }}</div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: {
      isLoading: {
        type: Boolean,
        default: false
      },
      message:{
        type: String,
        default: "Chargement en cours ...."
      }
    }
  };
  </script>
  
  <style scoped>
  .loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .loader-content {
    text-align: center;
  }
  
  .loader-spinner {
    width: 50px;
    height: 50px;
    margin: 0 auto 15px;
    border: 4px solid rgba(198, 24, 61, 0.2);
    border-top-color: #ff7b25;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .loader-text {
    color: #ff7b25;
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>