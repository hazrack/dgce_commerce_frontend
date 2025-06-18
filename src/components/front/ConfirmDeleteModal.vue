<template>
  <b-modal
    v-model="isVisible"
    hide-footer
  >
  <template #header>
                  <div class="d-flex justify-content-between w-100">
                    <div>
                       <p class="suffix-clicked">
                    <span>Confirmation</span>
                  </p>
                    </div>
                    <div>
                      <span class="close-modal-icon" @click="isVisible=false" >
                        <i class="bi bi-x-lg"></i>
                      </span>
                    </div>
                  </div>
                </template>
    <div>
    <p>Voulez-vous vraiment supprimer la ligne : {{ itemId }} ?</p>
    <div class="d-flex justify-content-end button-space-delete">
      <button class="btn-custom cancel" @click="isVisible = false">Annuler</button>
      <button class="btn-custom confirm" @click="emitDelete">Supprimer</button>
    </div>
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

.btn-custom.cancel{
  background: #545353;
}
</style>
