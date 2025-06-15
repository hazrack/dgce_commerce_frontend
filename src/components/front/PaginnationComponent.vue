<template>
    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 0">
        Précédent
      </button>
      <button
        v-for="page in displayedPages"
        :key="page"
        @click="goToPage(page - 1)"
        :class="{ active: currentPage === page - 1 }"
      >
        {{ page }}
      </button>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages - 1">
        Suivant
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      maxVisiblePages: {
        type: Number,
        default: 5
      },
      currentPage: {
        type: Number,
        required: true,
      },
      totalPages: {
        type: Number,
        required: true,
      },
    },
    computed: {
    displayedPages() {
      // Si totalPages est inférieur à maxVisiblePages, on affiche toutes les pages
      if (this.totalPages <= this.maxVisiblePages) {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
      }
      
      // Sinon, on utilise la logique de pagination avec maxVisiblePages
      const half = Math.floor(this.maxVisiblePages / 2);
      let start = Math.max(1, this.currentPage + 1 - half);
      const end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);
      
      // Ajustement si on est proche de la fin
      if (end === this.totalPages) {
        start = this.totalPages - this.maxVisiblePages + 1;
      }
      
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
  },
    methods: {
      goToPage(page) {
        if (page >= 0 && page < this.totalPages && page !== this.currentPage) {
          console.log('Navigation vers la page:', page + 1);
          this.$emit("page-change", page);
        }
      },
    }
  }
  </script>
  
  <style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 2rem 0;
  flex-wrap: wrap;

  button {
    min-width: 40px;
    height: 40px;
    padding: 0 12px;
    border: none;
    border-radius: 8px;
    background-color: #f5f5f7;
    color: #3a3a3c;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover:not(:disabled) {
      background-color: #e0e0e5;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    &.active {
      background-color: #c6183d;
      color: white;
      font-weight: 600;
      box-shadow: 0 4px 8px rgba(198, 24, 61, 0.2);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }

    &:first-child, &:last-child {
      padding: 0 16px;
      font-weight: 600;
      background-color: #ffffff;
      border: 1px solid #e0e0e5;
    }
  }

  @media (max-width: 600px) {
    gap: 4px;
    
    button {
      min-width: 32px;
      height: 32px;
      padding: 0 8px;
      font-size: 0.9rem;
      
      &:first-child, &:last-child {
        padding: 0 12px;
      }
    }
  }
}
  </style>