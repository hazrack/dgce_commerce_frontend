<template>
  <b-modal
    v-model="isVisible"
    title="Confirmation"
    hide-footer
    @hide="$emit('close')"
  >
    <p>Voulez-vous vraiment supprimer la ligne : {{ itemId }} ?</p>
    <div class="d-flex justify-content-end button-space-delete">
      <b-button variant="secondary" @click="isVisible = false">Annuler</b-button>
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
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: ['confirm-delete', 'update:show', 'close'],
  computed: {
    isVisible: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit('update:show', value);
      }
    }
  },
  methods: {
    emitDelete() {
      this.$emit('confirm-delete', this.itemId);
      this.isVisible = false;
    }
  }
}
</script>

<style scoped lang="scss">
.button-space-delete {
  margin-top: 20px;
  gap: 8px;
}
</style>
