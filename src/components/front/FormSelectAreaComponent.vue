<template>
    <div class="form-zone">
      <div class="blockBox">
        <div
          class="inputBox"
          v-for="(field, index) in fields"
          :key="index"
        >
          <!-- Champ Select -->
          <template v-if="field.type === 'select'">
            <select
              v-model="selectedValues[field.model]"
              :required="field.required"
              @change="handleSelectChange(field, $event)"
            >
              <option value="" disabled>Sélectionnez...</option>
              <option
                v-for="option in field.options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </template>
  
          <span>{{ field.label }}</span>
          <i></i>
        </div>

        <div v-if="showMoreProductBtn">
          <button class="btn-custom" @click="checkMoreProductBtn">
            <i v-if="!isBtnClicked" class="bi bi-plus-circle"></i>
            <i v-else class="bi bi-dash-circle"></i>
          </button>
        </div>

      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      fields: {
        type: Array,
        required: true,
        default: () => []
      },
      initialValues: {
        type: Object,
        default: () => ({})
      },
      showMoreProductBtn: {
      type: Boolean,
      default: false,
    },
    },
    data() {
      return {
        selectedValues: { ...this.initialValues },
        isBtnClicked: false,
      }
    },

    watch: {
      initialValues: {
        handler(newValues) {
          this.selectedValues = { ...newValues };
        },
        deep: true
      }
    },
    
    methods: {
      handleSelectChange(field, event) {
        const value = event.target.value
        this.$emit('field-changed', {
          fieldName: field.model,
          value,
          fieldType: field.type
        });

        this.$emit('select-values-updated', this.selectedValues);

      },

      checkMoreProductBtn() {
        this.isBtnClicked = !this.isBtnClicked;
        this.$emit('is-more-product', this.isBtnClicked);
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .form-zone {
    font-family: 'Segoe UI', system-ui, sans-serif;
  }

  .btn-custom{
    background-color: #295983;
  }
  
  .blockBox {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  
  .inputBox {
    position: relative;
    width: 100%;
    max-width: 205px;
    min-width: 200px;

  
    span {
      position: absolute;
      left: 12px;
      top: 12px;
      color: #000;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      pointer-events: none;
      background: white;
      padding: 0 4px;
    }
  
    select {
      width: 100%;
      padding: 8px 16px;
      border: 2px solid #000;
      border-radius: 5px;
      background-color: white;
      font-size: 0.95rem;
      color: #111827;
      font-weight: bold;
      appearance: none;
      transition: all 0.3s ease;
      cursor: pointer;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  
      &:focus {
        outline: none;
        border-color: #c6183d;
        box-shadow: 0 0 0 3px rgba(198, 24, 61, 0.1);
  
        + span {
          color: #c6183d;
          transform: translateY(-24px);
          font-size: 0.8rem;
        }
  
        ~ i::before {
          border-color: #c6183d;
        }
      }
  
      &:valid:not(:focus) {
        + span {
          transform: translateY(-24px);
          font-size: 0.8rem;
          color: #6b7280;
        }
      }
    }
  
    i {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      pointer-events: none;
  
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border-right: 2px solid #9ca3af;
        border-bottom: 2px solid #9ca3af;
        transform: rotate(45deg);
        transition: all 0.3s ease;
      }
    }
  
    &:hover {
      select {
        border-color: #9ca3af;
      }
  
      i::before {
        border-color: #6b7280;
      }
    }
  }
  
  /* Style des options */
  select option {
    padding: 10px;
    background: white;
    color: #111827;
  
    &:disabled {
      color: #9ca3af;
    }
  
    &:checked {
      background-color: #fce7eb;
      color: #c6183d;
    }
  }
  
  /* Version mobile */
  @media (max-width: 768px) {
    .blockBox {
      gap: 15px;
    }
  
    .inputBox {
      min-width: 100%;
      
      select {
        padding: 12px 14px;
      }
    }
  }
  
  </style>