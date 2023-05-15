<template>
  <div class="relative overflow-hidden block ">
    <input 
      :id="id"
      :type="type"
      :value="modelValue"
      @input="updateInput"
      class="opacity-0 absolute left-0 top-0 h-full w-full z-20 cursor-pointer" />
    <span class=" border-0 ring-0 focus:ring-0  w-full text-md !cursor-pointer absolute z-10">{{ $props.label }}</span>
  </div>
</template>
<script>
export default {
  name: "FormUpload",
  props: {
    
    id: {
      type: String,
      default: "",
    },
    
    modelValue: {
      type: [String],
      default: "",
    },

    type: {
      type: String,
      default: "text",
    },

    label: {
      type: String,
      default: "",
    },

    accept: {
      type: String,
      default: "image/png, image/jpeg",
    },
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  }
};
</script>