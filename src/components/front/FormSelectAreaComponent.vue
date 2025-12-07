<template>
  <div class="form-zone">
    <div class="blockBox">
      <div class="inputBox" v-for="(field, index) in fields" :key="index">
        <!-- Champ Select avec vue-select pour la recherche & select -->
        <template v-if="field.type === 'select' && field.enableSearch">
          <div class="vselect-wrapper">
            <v-select
              v-model="selectedValues[field.model]"
              :options="field.options"
              label="label"
              :reduce="(option) => option.value"
              :searchable="true"
              :clearable="field.clearable !== false"
              :placeholder="field.placeholder || '...'"
              @input="handleVSelectInput(field, $event)"
              @option:selected="handleVSelectOptionSelected(field, $event)"
              @search="handleVSelectSearch(field, $event)"
              :filterable="true"
              :filter-by="filterOptions"
              class="v-select-custom"
            >
              <template #no-options="{ search, searching }">
                <template v-if="searching">
                  Aucun résultat pour "{{ search }}"
                </template>
                <em v-else>Commencez à taper pour rechercher</em>
              </template>
            </v-select>
            <span class="vselect-label">{{ field.label }}</span>
          </div>
        </template>

        <!-- Champ Select normal pour les autres champs -->
        <template v-else-if="field.type === 'select'">
          <select
            v-model="selectedValues[field.model]"
            :required="field.required"
            @change="handleSelectChange(field, $event)"
            class="standard-select"
          >
            <option value="" disabled>
              {{ field.placeholder || "Sélectionnez..." }}
            </option>
            <option
              v-for="option in field.options"
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </option>
          </select>
          <span>{{ field.label }}</span>
          <i class="select-arrow"></i>
        </template>
      </div>

      
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "FormSelectAreaComponent",
  components: {
    vSelect,
  },
  props: {
    fields: {
      type: Array,
      required: true,
      default: () => [],
    },
    initialValues: {
      type: Object,
      default: () => ({}),
    }
  },

  setup(props, { emit }) {
    const selectedValues = reactive({ ...props.initialValues });

    console.log("====================================");
    console.log("selected c", selectedValues);
    console.log("====================================");

    const timeout = ref(null);

    // Watchers
    watch(
      () => props.initialValues,
      (newValues) => {
        Object.assign(selectedValues, newValues);
      },
      { deep: true }
    );

    const filterOptions = (option, label, search) => {
      return (label || "").toLowerCase().includes((search || "").toLowerCase());
    };

    const handleVSelectInput = (field, option) => {
      //EMIT DE MISE A JOUR DES VALEURS DU SELECT ACTUELLE
      emit("select-values-updated", selectedValues);
    };

    // Pour v-select: émis quand une option est cliquée dans la liste
    const handleVSelectOptionSelected = (field, option) => {
      console.log("v-select option selected:", option);
      // Émettre immédiatement quand une option est cliquée
      if (option) {
        emit("field-changed", {
          fieldName: field.model,
          value: option.value,
          fieldType: field.type,
          immediate: true,
        });
      }
    };

    const handleVSelectSearch = (field, search) => {
      console.log("====================================");
      console.log("LE FIELDS A LA RECHERCHE : ", field.model);
      console.log(
        "====================================v-select input event:  ",
        search
      );

      if (!search || search.trim() === "") {
        return;
      }

      if (field.model === "productSelected") {
        handleSearch(search);
      }

      emit("search-changed", {
        fieldName: field.model,
        query: search,
      });
    };

    // Pour les selects standards
    const handleSelectChange = (field, event) => {
      const value = event.target.value;
      emit("field-changed", {
        fieldName: field.model,
        value,
        fieldType: field.type,
      });
      emit("select-values-updated", selectedValues);
    };

    const handleSearch = (searchQuery) => {
      clearTimeout(timeout.value);

      if (!searchQuery || searchQuery.trim() === "") return;

      if (searchQuery.length < 2) return;

      timeout.value = setTimeout(() => {
        triggerSearch(searchQuery);
      }, 500);
    };

    const triggerSearch = (searchQuery) => {
      emit("search", searchQuery);
      console.log("Recherche déclenchée:", searchQuery);
    };

    

    return {
      selectedValues,
      filterOptions,
      handleVSelectInput,
      handleVSelectOptionSelected,
      handleVSelectSearch,
      handleSelectChange,
    };
  },
};
</script>
  
<style lang="scss" scoped>
.form-zone {
  font-family: "Segoe UI", system-ui, sans-serif;
}

.btn-custom {
  background-color: #295983;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1e4668;
  }

  i {
    font-size: 1.2rem;
  }
}

.blockBox {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-start;
}

.inputBox {
  position: relative;
  width: 100%;
  max-width: 205px;
  min-width: 200px;

  span:not(.vselect-label) {
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

  .standard-select {
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

  .select-arrow {
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
    .standard-select {
      border-color: #9ca3af;
    }

    .select-arrow::before {
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