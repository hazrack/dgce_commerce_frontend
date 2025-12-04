<template>
  <div class="quill-form-container">
    <form @submit.prevent="submitContent" class="quill-form">
      <!-- Présentation Pays -->
      <div class="form-section">
        <label class="section-label">PRÉSENTATION DU PAYS</label>
        <QuillEditor
          v-model:content="presentCountryText"
          :options="editorOptions"
          theme="snow"
          style="height: 200px; margin-bottom: 20px;"
        />
        <div class="content-preview" v-if="showPreviews">
          <small>HTML Preview:</small>
          <div class="html-preview">{{ getHtmlContent(presentCountryText) }}</div>
        </div>
      </div>

      <!-- Relations Internationales -->
      <div class="form-section">
        <label class="section-label">RELATIONS INTERNATIONALES</label>
        <QuillEditor
          v-model:content="internationRelText"
          :options="editorOptions"
          theme="snow"
          style="height: 200px; margin-bottom: 20px;"
        />
        <div class="content-preview" v-if="showPreviews">
          <small>HTML Preview:</small>
          <div class="html-preview">{{ getHtmlContent(internationRelText) }}</div>
        </div>
      </div>

      <!-- Caractéristiques Économiques -->
      <div class="form-section">
        <label class="section-label">CARACTÉRISTIQUES ÉCONOMIQUES</label>
        <QuillEditor
          v-model:content="ecoCaractText"
          :options="editorOptions"
          theme="snow"
          style="height: 200px; margin-bottom: 20px;"
        />
        <div class="content-preview" v-if="showPreviews">
          <small>HTML Preview:</small>
          <div class="html-preview">{{ getHtmlContent(ecoCaractText) }}</div>
        </div>
      </div>

      <!-- Bilan de la Coopération Bilatérale -->
      <div class="form-section">
        <label class="section-label">BILAN DE LA COOPÉRATION BILATÉRALE</label>
        <QuillEditor
          v-model:content="bilanCooepText"
          :options="editorOptions"
          theme="snow"
          style="height: 200px; margin-bottom: 20px;"
        />
        <div class="content-preview" v-if="showPreviews">
          <small>HTML Preview:</small>
          <div class="html-preview">{{ getHtmlContent(bilanCooepText) }}</div>
        </div>
      </div>

      <!-- Flux Commerciaux -->
      <div class="form-section">
        <label class="section-label">FLUX COMMERCIAUX</label>
        <QuillEditor
          v-model:content="fluxComText"
          :options="editorOptions"
          theme="snow"
          style="height: 200px; margin-bottom: 20px;"
        />
        <div class="content-preview" v-if="showPreviews">
          <small>HTML Preview:</small>
          <div class="html-preview">{{ getHtmlContent(fluxComText) }}</div>
        </div>
      </div>

      <!-- Perspectives -->
      <div class="form-section">
        <label class="section-label">PERSPECTIVES</label>
        <QuillEditor
          v-model:content="perperstText"
          :options="editorOptions"
          theme="snow"
          style="height: 200px; margin-bottom: 20px;"
        />
        <div class="content-preview" v-if="showPreviews">
          <small>HTML Preview:</small>
          <div class="html-preview">{{ getHtmlContent(perperstText) }}</div>
        </div>
      </div>

      <div class="form-actions">
        <button 
          type="button" 
          class="btn btn-secondary" 
          @click="logAllContents"
          style="margin-right: 10px;"
        >
          Log Contenu
        </button>
        
        <button 
          type="button" 
          class="btn btn-info" 
          @click="showPreviews = !showPreviews"
          style="margin-right: 10px;"
        >
          {{ showPreviews ? 'Masquer Previews' : 'Afficher Previews' }}
        </button>
        
        <button type="submit" class="btn btn-primary">
          Soumettre
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  name: "QuillEditorForm",
  components: {
    QuillEditor
  },

  data() {
    return {
      presentCountryText: "",
      internationRelText: "",
      ecoCaractText: "",
      bilanCooepText: "",
      fluxComText: "",
      perperstText: "",
      showPreviews: false,
      editorOptions: {
        theme: 'snow',
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ align: [] }],
            ["clean"]
          ]
        },
        placeholder: "Saisissez votre contenu ici...",
        readOnly: false
      }
    };
  },

  methods: {
    /**
     * Extrait le contenu HTML de l'objet Quill
     * @param {Object} quillContent - Contenu Quill (Delta ou HTML)
     * @returns {String} - Contenu HTML
     */
    getHtmlContent(quillContent) {
      if (!quillContent) return '';
      
      // Si c'est un objet Quill Delta
      if (quillContent.ops) {
        // Convertir Delta en HTML (simplifié)
        return quillContent.ops.map(op => {
          if (op.insert) {
            let text = op.insert;
            if (op.attributes) {
              if (op.attributes.bold) text = `<strong>${text}</strong>`;
              if (op.attributes.italic) text = `<em>${text}</em>`;
              if (op.attributes.underline) text = `<u>${text}</u>`;
              if (op.attributes.header) text = `<h${op.attributes.header}>${text}</h${op.attributes.header}>`;
            }
            return text;
          }
          return '';
        }).join('').replace(/\n/g, '<br>');
      }
      
      // Si c'est déjà une string HTML
      if (typeof quillContent === 'string') {
        return quillContent;
      }
      
      // Si c'est un objet avec une propriété html
      if (quillContent.html) {
        return quillContent.html;
      }
      
      return String(quillContent);
    },

    /**
     * Log le contenu de tous les champs
     */
    logAllContents() {
      console.log('=== LOG DE TOUS LES CONTENUS ===');
      
      const fields = [
        { name: 'Présentation du Pays', value: this.presentCountryText },
        { name: 'Relations Internationales', value: this.internationRelText },
        { name: 'Caractéristiques Économiques', value: this.ecoCaractText },
        { name: 'Bilan de la Coopération', value: this.bilanCooepText },
        { name: 'Flux Commerciaux', value: this.fluxComText },
        { name: 'Perspectives', value: this.perperstText }
      ];

      fields.forEach(field => {
        console.log(`\n--- ${field.name} ---`);
        console.log('Objet Quill:', field.value);
        console.log('Contenu HTML:', this.getHtmlContent(field.value));
        console.log('Type:', typeof field.value);
        
        if (field.value && field.value.ops) {
          console.log('Structure Delta:', {
            ops: field.value.ops,
            length: field.value.ops.length
          });
        }
      });
    },

    /**
     * Soumettre le formulaire
     */
    submitContent() {
      console.log('=== SOUMISSION DU FORMULAIRE ===');
      
      // Préparer les données pour l'envoi
      const formData = {
        presentCountryText: this.getHtmlContent(this.presentCountryText),
        internationRelText: this.getHtmlContent(this.internationRelText),
        ecoCaractText: this.getHtmlContent(this.ecoCaractText),
        bilanCooepText: this.getHtmlContent(this.bilanCooepText),
        fluxComText: this.getHtmlContent(this.fluxComText),
        perperstText: this.getHtmlContent(this.perperstText),
        // Version brute pour référence
        rawData: {
          presentCountryText: this.presentCountryText,
          internationRelText: this.internationRelText,
          ecoCaractText: this.ecoCaractText,
          bilanCooepText: this.bilanCooepText,
          fluxComText: this.fluxComText,
          perperstText: this.perperstText
        }
      };

      console.log('Données formatées pour envoi:', formData);
      
      // Ici, vous pouvez ajouter votre logique d'envoi (API call, etc.)
      // Exemple: axios.post('/api/submit', formData)
      
      alert('Formulaire soumis avec succès! Vérifiez la console pour voir les données.');
      
      // Émettre un événement si nécessaire
      this.$emit('form-submitted', formData);
    },

    /**
     * Méthode utilitaire pour debug
     */
    debugField(fieldName) {
      const value = this[fieldName];
      console.log(`Debug ${fieldName}:`, {
        value,
        type: typeof value,
        html: this.getHtmlContent(value),
        isProxy: value && typeof value === 'object' && 'ops' in value
      });
    }
  },

  watch: {
    // Watchers optionnels pour le debug
    presentCountryText(newVal) {
      console.log('presentCountryText modifié:', this.getHtmlContent(newVal));
    },
    internationRelText(newVal) {
      console.log('internationRelText modifié:', this.getHtmlContent(newVal));
    }
  }
};
</script>

<style scoped>
.quill-form-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.quill-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-section {
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.form-section:last-child {
  border-bottom: none;
}

.section-label {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  font-size: 16px;
}

.content-preview {
  margin-top: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 12px;
}

.html-preview {
  max-height: 100px;
  overflow-y: auto;
  margin-top: 5px;
  padding: 5px;
  background: white;
  border: 1px solid #ddd;
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-all;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #117a8b;
}
</style>