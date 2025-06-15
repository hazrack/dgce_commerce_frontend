<template>
  <div>
    <div class="input-search-area">
      <i class="fas fa-search search-icon"></i>
      <input
        type="search"
        v-model="searchQuery"
        @input="handleSearch"
        :placeholder="placeHolderText"
        class="search-input"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchInputComponent',
   props: {
   
    placeHolderText: {
      type: String,
      default: "Rechercher...",
    },
  },
  data() {
    return {
      searchQuery: '',
      timeout: null
    }
  },
  methods: {
    handleSearch() {
      clearTimeout(this.timeout)
      
      if (this.searchQuery.length < 2 && this.searchQuery.length !== 0) {
        return
      }
      
      this.timeout = setTimeout(() => {
        this.triggerSearch()
      }, 500)
    },
    triggerSearch() {
      this.$emit('search', this.searchQuery)
      console.log('Recherche déclenchée:', this.searchQuery)
    }
  }
}
</script>

<style scoped lang="scss">


/* Style du conteneur */
.input-search-area {
  width: 100%;
  max-width: 400px; /* Ajustez selon vos besoins */
  margin: 20px auto;
}

/* Style de l'input */
.search-input {
  width: 100%;
  padding: 8px 20px;
  padding-left: 45px; /* Espace pour l'icône */
  border: 2px solid #e0e0e0;
  border-radius: 5px; /* Bords arrondis */
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  background: #f8f8f8 url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23999"><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>') no-repeat 15px center;
  background-size: 20px;
}

/* Effet au focus */
.search-input:focus {
  border-color: #008c00; /* Bleu moderne */
  box-shadow: 0 0 8px rgba(74, 144, 226, 0.3);
  background-color: #fff;
}

/* Style du placeholder */
.search-input::placeholder {
  color: #999;
  font-style: italic;
}

/* Style pour les navigateurs WebKit (Chrome, Safari) */
.search-input::-webkit-search-cancel-button {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23999"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>') no-repeat;
  cursor: pointer;
}
</style>