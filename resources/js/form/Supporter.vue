<template>
    <template v-if="isSent">
      <feedback />
    </template>
    <template v-else>
      <p>Vielen Dank für Ihr Interesse, die Kampagne <strong>«JA zur Pistenverlängerung am Flughafen Zürich»</strong> zu unterstützen. Bitte füllen Sie das untenstehende Formular aus.</p>
      <validation-errors :validationErrors="validationErrors"  v-if="validationErrors.length > 0" />
      <form class="mt-20 xl:mt-40" enctype="multipart/form-data">

        <form-group :error="errors.organisation">
          <form-input 
            type="text" 
            v-model="form.organisation" 
            placeholder="Name der Organisation*"
            :error="errors.organisation"
            @blur="validateField('organisation')"
            @focus="removeError('organisation')">
          </form-input>
        </form-group>

        <form-group :error="errors.website">
          <form-input 
            type="text" 
            v-model="form.website" 
            placeholder="Link zur Webseite der Organisation*"
            :error="errors.website"
            @blur="validateField('website')"
            @focus="removeError('website')">
          </form-input>
        </form-group>

        <form-group :error="errors.email">
          <form-input 
            type="text" 
            v-model="form.email" 
            placeholder="E-Mail der Organisation*"
            :error="errors.email"
            @blur="validateEmail()"
            @focus="removeError('email')">
          </form-input>
        </form-group>

        <form-group :class="[errors.image ? 'bg-rosewater' : 'bg-cloud-mist', 'text-xxs md:text-xs xl:text-sm px-10 py-20']" :error="errors.image">
          <div class="text-xxs md:text-xs xl:text-sm mb-20">Logo*</div>
          <input type="file" @change="fileChange" maxlength="1" ref="file" accept="image/*" />
          <div class="mt-20">Sofern möglich als EPS, erlaubt sind JPG, PNG, EPS, TIFF, max. 8MB</div>
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
        organisation: null,
        website: null,
        email: null,
        image: null,
      },

      errors: {
        organisation: null,
        website: null,
        email: null,
        image: null,
      },

      validationErrors: [],

      routes: {
        store: '/api/form/supporter'
      },

      isSent: false,
      isLoading: false,
    }
  },

  methods: {

    submit() {

      const formData = new FormData();
      formData.append('image', this.form.image);
      formData.append('organisation', this.form.organisation ? this.form.organisation : '');
      formData.append('website', this.form.website ? this.form.website : '');
      formData.append('email', this.form.email ? this.form.email : '');

      this.isSent = false;
      this.isLoading = true;
      this.validationErrors = [];
      NProgress.start();
      this.axios.post(this.routes.store, formData).then(response => {
        NProgress.done();
        this.reset();
        this.isSent = true;
        this.isLoading = false;
      })
      .catch(error => {
        NProgress.done();
        this.isLoading = false;
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

    validateEmail() {
      if (this.validEmail()) {
        this.errors.email = false;
        return;
      }
      this.errors.email = true;
    },

    validEmail() {
      if (this.form.email === null || this.form.email === '') {
        return false;
      }
      const rgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!rgx.test(this.form.email)) {
        return false;
      }
      return true;
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
        organisation: null,
        website: null,
        email: null,
        image: null,
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
        this.form.organisation &&
        this.form.website &&
        this.validEmail() &&
        this.form.image
        ) {
        return true;
      }
      return false;
    },
  },
}
</script>