<template>
  <div :class="[error ? '' : '', 'mb-40 relative']">
    <slot />

    <icon-valid v-if="error === false" />
    <icon-invalid v-if="error === true" />
  </div>
</template>
<script>
import IconValid from '@/form/icons/valid.vue';
import IconInvalid from '@/form/icons/invalid.vue';

export default {
  components: {
    IconValid,
    IconInvalid,
  },
  props: {
    error: {
      type: Boolean,
      default: null
    },
  }
}
</script>