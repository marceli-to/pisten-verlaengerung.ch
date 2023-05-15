<template>
  <input
    :id="id"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    @input="updateInput"
    :class="[$props.error ? 'bg-rosewater' : 'bg-cloud-mist', ' border-0 ring-0 focus:ring-0 px-10 py-20 w-full text-md placeholder:text-sm placeholder:leading-none placeholder:text-midnight']"
  />
</template>
<script>
export default {
  name: "FormInput",
  props: {
    
    id: {
      type: String,
      default: "",
    },
    
    modelValue: {
      type: [String, Number],
      default: "",
    },

    type: {
      type: String,
      default: "text",
    },

    placeholder: {
      type: String,
      default: "",
    },

    error: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  }
};
</script>