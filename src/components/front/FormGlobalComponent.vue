<template>
  <form @submit.prevent="handleSubmit">
    <div class="simple-form-area">
      <div class="subscribe-display">
        <div class="simple-input" v-for="(field, index) in fields" :key="index">
          <template v-if="field.type === 'select'">
            <select v-model="formData[field.model]" :required="field.required">
              <option
                v-for="option in field.options"
                :key="option.value"
                :value="option.value || option.label"
              >
                {{ option.label }}
              </option>
            </select>
          </template>

          <template v-else>
            <input
              :type="field.type"
              v-model="formData[field.model]"
              :required="field.required"
            />
          </template>

          <span>{{ field.label }}</span>
          <i></i>
        </div>

        <div class="simple-input" v-if="showFile">
          <template>
            <input
              type="file"
              id="image"
              @change="onFileChange"
              accept=".pdf,application/pdf,image/*,.accdb"
              ref="serviceFileInput"
            />
          </template>
          <span for="image">Document </span>
          <i></i>
        </div>
      </div>

      <div class="text-center">
        <button class="btn-custom" type="submit">{{ buttonText }}</button>
      </div>
    </div>
  </form>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: {
    fields: {
      type: Array,
      required: true,
      default: () => [],
    },
    initialData: {
      type: Object,
      default: () => ({}),
    },
    showFile: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      default: "Soumettre",
    },
  },

  data() {
    return {
      formData: { ...this.initialData },
      errors: {},
    };
  },

  methods: {
    onFileChange(event) {
      const file = event.target.files[0];

      if (!file) {
        this.formData.imageData = null;
        return;
      }

      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/vnd.ms-access", // typique pour .mdb
        "application/x-msaccess", // typique pour .accdb
      ];

      const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".png", ".accdb"];

      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

      if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
        alert(
          "Seuls les fichiers PDF, images (JPG, PNG) ou Access (.accdb) sont acceptés."
        );
        this.formData.imageData = null;
        this.$refs.serviceFileInput.value = ""; // Réinitialise le champ fichier
        return;
      }

      this.formData.imageData = file;
    },

    handleDataPeriod(data) {
      console.log("LA PERIODE");
    },

    validateForm() {
      // Réinitialiser toutes les erreurs
      this.errors = {};
      let isValid = true;

      // Valider le téléphone
      if (this.formData.phone) {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(this.formData.phone)) {
          this.errors.phone =
            "Le téléphone doit contenir exactement 10 chiffres";
          isValid = false;
        }
      }

      // Valider la correspondance des mots de passe
      if (this.formData.password && this.formData.passwordConfirm) {
        if (this.formData.password !== this.formData.passwordConfirm) {
          this.errors.passwordConfirm =
            "Les mots de passe ne correspondent pas";
          isValid = false;
        }
      }

      return isValid;
    },

    handleSubmit() {
      if (this.validateForm()) {
        this.$emit("submit", this.formData);
      } else {
        Swal.fire({
          title: "Données invalides",
          text: this.errors.phone + " / " + this.errors.passwordConfirm,
          timer: 3000,
          showConfirmButton: false,
        });
        return;
      }
    },
  },

  watch: {
    initialData: {
      deep: true,
      handler(newVal) {
        this.formData = { ...newVal };
      },
    },
  },
};
</script>
  
  <style scoped lang="scss">
</style>