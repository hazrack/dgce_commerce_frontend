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
      }
    },
    data() {
      return {
        selectedValues: { ...this.initialValues }
      }
    },
    
    methods: {
      handleSelectChange(field, event) {
        const value = event.target.value
        this.$emit('field-changed', {
          fieldName: field.model,
          value,
          fieldType: field.type
        })
      }
    }
  }
  </script>
  
  <style scoped lang="scss">

.form-zone {
  .inputBox {
    position: relative;
    margin-top: 18px;

    input,
    select,
    textarea {
      width: 100%;
      padding: 20px 10px 10px;
      background: transparent;
      border: none;
      outline: none;
      color: #fff;
      font-size: 1em;
      letter-spacing: 0.05em;
      z-index: 10;
    }

    span {
      position: absolute;
      left: 0;
      padding: 20px 0px 10px;
      font-size: 1em;
      color: #8f8f8f;
      pointer-events: none;
      letter-spacing: 0.05em;
      transition: 0.5s;
    }

    input:valid ~ span,
    input:focus ~ span,
    select:valid ~ span,
    select:focus ~ span,
    input:read-only ~ span {
      color: #c6183d;
      transform: translateX(0px) translateY(-34px);
      font-size: 1.1em;
    }

    i {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: #c6183d;
      border-radius: 4px;
      transition: 0.5s;
      pointer-events: none;
      z-index: 9;
    }

    input:valid ~ i,
    input:focus ~ i,
    select:valid ~ span,
    select:focus ~ span {
      height: 44px;
    }
  }
}

.form-zone {
  .inputBox {
    width: 100%;
    i {
      background: #d9d9d9;
    }

    input,
    select,
    textarea {
      color: #23242a;
    }

    select:valid ~ span,
    select:focus ~ span {
      color: #c6183d;
    }
  }
}

  </style>