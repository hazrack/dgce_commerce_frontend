<template>
    <div class="no-results-message">
      {{message}}
    </div>
  </template>
  
  <script>
  export default {
    name: "NoResultsMessage",
    props:{
      message:{
      type: String,
      require:false,
      default: "Aucun résultat trouvé pour cette recherche."
    }
    }
  };
  </script>
  
  <style scoped>
  .no-results-message {
    padding: 1rem;
    margin-top: 1rem;
    border: 1px dashed #ccc;
    background-color: #f9f9f9;
    color: #555;
    text-align: center;
    border-radius: 8px;
    font-weight: 500;
  }
  </style>
  