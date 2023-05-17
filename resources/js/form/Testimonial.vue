<template>
  <template v-if="isSent">
    <feedback />
  </template>
  <template v-else>
    <p>Vielen Dank für Ihr Interesse, die Kampagne <strong>«JA zur Pistenverlängerung am Flughafen Zürich»</strong> mit einem Testimonial zu unterstützen. Bitte füllen Sie das untenstehende Formular aus.</p>
    <validation-errors :validationErrors="validationErrors"  v-if="validationErrors.length > 0" />
    <form class="mt-20 xl:mt-40" enctype="multipart/form-data">

      <form-group :error="errors.name">
        <form-input 
          type="text" 
          v-model="form.name" 
          placeholder="Name*"
          :error="errors.name"
          @blur="validateField('name')"
          @focus="removeError('name')">
        </form-input>
      </form-group>

      <form-group :error="errors.firstname">
        <form-input 
          type="text" 
          v-model="form.firstname" 
          placeholder="Vorname*"
          :error="errors.firstname"
          @blur="validateField('firstname')"
          @focus="removeError('firstname')">
        </form-input>
      </form-group>

      <form-group>
        <form-input 
          type="text" 
          v-model="form.party" 
          placeholder="Partei">
        </form-input>
      </form-group>

      <form-group :error="errors.location">
        <form-input 
          type="text" 
          v-model="form.location" 
          :error="errors.location"
          placeholder="Wohnort*"
          @blur="validateField('location')"
          @focus="removeError('location')">
        </form-input>
      </form-group>

      <form-group :error="errors.quote">
        <form-textarea 
          v-model="form.quote" 
          :error="errors.quote"
          placeholder="Zitat*"
          @blur="validateField('quote')"
          @focus="removeError('quote')">
        </form-textarea>
      </form-group>

      <form-group class="bg-cloud-mist text-xxs md:text-xs xl:text-sm px-10 py-20" :error="errors.image">
        <div class="text-xxs md:text-xs xl:text-sm mb-20">Profilbild*</div>
        <input type="file" @change="fileChange" maxlength="1" ref="file" accept="image/png, image/jpeg" />
        <div class="mt-20">Bitte laden Sie ein hochauflösendes Bild hoch, erlaubt sind JPG, PNG, max. 8MB</div>
      </form-group>

      <form-group>
        <form-textarea 
          v-model="form.copyright" 
          placeholder="Copyright des Bildes (Falls der/die Urheber/in des Bildes genannt werden soll)">
        </form-textarea>
      </form-group>

      <form-group>
        <form-checkbox :id="'confirm_ad_usage'" v-model="form.confirm_ad_usage" @change="toggle('confirm_ad_usage')">
          <template v-slot:label>
            Ich bestätige, dass mein Bild und mein Zitat im Rahmen der Kampagne <strong>«JA zur Pistenverlängerung am Flughafen Zürich»</strong> in Online- und Print-Inseraten verwendet werden dürfen.
          </template>
        </form-checkbox>
      </form-group>

      <form-group>
        <form-checkbox :id="'confirm_web_usage'" v-model="form.confirm_web_usage" @change="toggle('confirm_web_usage')">
          <template v-slot:label>
            Ich bestätige, dass mein Bild und mein Zitat auf der Website der Kampagne <strong>«JA zur Pistenverlängerung am Flughafen Zürich»</strong> verwendet werden dürfen.
          </template>
        </form-checkbox>
      </form-group>

      <form-group>
        <form-textarea 
          v-model="form.remarks" 
          placeholder="Bemerkungen">
        </form-textarea>
      </form-group>
      
      <form-group class="mt-40 md:mt-60 xl:mt-80 !mb-0 xl:!mb-30 flex justify-center w-full">
        <button 
          :class="[isValid && !isLoading ? 'bg-midnight text-white hover:bg-cloud-mist hover:text-midnight transition-colors' : 'bg-cloud-mist pointer-events-none select-none', 'font-bold text-white py-10 px-25 leading-none inline-flex items-center w-auto text-left']"
          type="button"
          @click.prevent="submit()">
          Absenden
        </button>
      </form-group>
    </form>
  </template>
</template>
<script>
import NProgress from 'nprogress';
import FormGroup from '@/form/components/form/Group.vue';
import FormLabel from '@/form/components/form/Label.vue';
import FormInput from '@/form/components/form/Input.vue';
import FormCheckbox from '@/form/components/form/Checkbox.vue';
import FormTextarea from '@/form/components/form/Textarea.vue';
import ValidationErrors from '@/form/components/form/ValidationErrors.vue';
import Feedback from '@/form/components/form/Feedback.vue';

export default {

components: {
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormCheckbox,
  ValidationErrors,
  Feedback,
},

data() {

  return {

    form: {
      name: null,
      firstname: null,
      party: null,
      location: null,
      quote: null,
      image: null,
      copyright: null,
      confirm_ad_usage: 0,
      confirm_web_usage: 0,
      remarks: null,
    },

    errors: {
      name: null,
      firstname: null,
      location: null,
      quote: null,
      image: null,
      confirm_ad_usage: null,
      confirm_web_usage: null,
    },

    validationErrors: [],

    routes: {
      store: '/api/form/testimonial'
    },

    isSent: false,
  }
},

methods: {

  submit() {

    const formData = new FormData();
    formData.append('image', this.form.image);
    formData.append('name', this.form.name ? this.form.name : '');
    formData.append('firstname', this.form.firstname ? this.form.firstname : '');
    formData.append('location', this.form.location ? this.form.location : '');
    formData.append('party', this.form.party);
    formData.append('quote', this.form.quote ? this.form.quote : '');
    formData.append('copyright', this.form.copyright);
    formData.append('remarks', this.form.remarks);
    formData.append('confirm_ad_usage', this.form.confirm_ad_usage);
    formData.append('confirm_web_usage', this.form.confirm_web_usage);

    this.isSent = false;
    this.validationErrors = [];
    NProgress.start();
    this.axios.post(this.routes.store, formData).then(response => {
      NProgress.done();
      this.reset();
      this.isSent = true;
    })
    .catch(error => {
      NProgress.done();
      this.handleValidationErrors(error.response.data);
    });
  },

  toggle(field) {
    this.form[field] = this.form[field] == 0 ? 1 : 0;
  }, 

  validateField(field) {
    if (this.form[field] === null || this.form[field] === '') {
      this.errors[field] = true;
    } 
    else {
      this.errors[field] = false;
    }
  },

  handleValidationErrors(data) {
    let errors = [];
    for (let key in data.errors) {
      this.validationErrors.push(
        data.errors[key][0]
      );
      this.errors[key] = true;
    }
    // scroll to top
    window.scrollTo(0, 0);
  },

  removeError(field) {
    this.errors[field] = null;
  },

  reset() {
    this.form = {
      name: null,
      firstname: null,
      party: null,
      location: null,
      quote: null,
      image: null,
      copyright: null,
      confirm_ad_usage: 0,
      confirm_web_usage: 0,
      remarks: null,
    };
    this.errors = {};
  },

  fileChange($event) {
    this.form.image = $event.target.files[0];
  }
},

computed: {

  isValid() { 
    if (
      this.form.name &&
      this.form.firstname &&
      this.form.location &&
      this.form.quote &&
      this.form.image &&
      (
        this.form.confirm_ad_usage == 1 || 
        this.form.confirm_web_usage == 1
      )
      ) {
      return true;
    }
    return false;
  },
},
}
</script>