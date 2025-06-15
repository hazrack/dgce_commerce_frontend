<template>
  <div class="switch-container">
    <div class="switch-multi-block">
      <div
        v-for="option in options"
        :key="option.id"
        class="switch-option"
        :class="{ active: selectedValue === option.value }"
        @click="handleClick(option.value)"
      >
        <p>{{ option.label }}</p>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
      validator: (value) => value.length >= 2,
    },
  },

  data() {
    return {
      selectedValue: this.options[0] ? this.options[0].value : null,
    };
  },

  methods: {
    handleClick(value) {
      this.selectedValue = value;
      this.$emit("switchValue", value);
    },
  },
};
</script>
  
  <style scoped>
.switch-container {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.switch-multi-block {
  display: flex;
  gap: 12px; /* Espacement entre les options */
  background: #f5f5f5;
  padding: 6px;
  border-radius: 50px;
  box-shadow: 2px 1px 8px #000;
}

.switch-option {
  flex: 1;
  padding: 12px 24px;
  border-radius: 50px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;

  /* Style inactif */
  background: transparent;
  color: #666;
}

.switch-option.active {
  /* Style actif */
  background: #008c00;
  color: white;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 140, 0, 0.2);
}

.switch-option p {
  margin: 0;
  font-size: 14px;
  white-space: nowrap;
}

.switch-option:hover:not(.active) {
  background: #e0e0e0;
}
</style>