<template>
    <b-modal id="confirm-delete-modal" title="Confirmation" hide-footer>
      <p>Voulez-vous vraiment supprimer la ligne : {{ itemId }} ?</p>
      <div class="d-flex justify-content-end button-space-delete">
        <b-button variant="secondary" @click="$bvModal.hide('confirm-delete-modal')">Annuler</b-button>
        <b-button variant="danger" @click="emitDelete">Supprimer</b-button>
      </div>
    </b-modal>
  </template>
  
  <script>
  export default {
    name: 'ConfirmDeleteModal',
    props: {
      itemId: {
        type: [Number, String],
        required: true
      }
    },
    methods: {
      emitDelete() {
        this.$emit('confirm-delete', this.itemId);
        this.$bvModal.hide('confirm-delete-modal');
      }
    }
  }
  </script>

<style scoped lang="scss">

.button-space-delete{
    margin-top: 20px;
    gap: 8px;
}
</style>