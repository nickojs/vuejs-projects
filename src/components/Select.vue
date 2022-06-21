<script lang="ts">
/* eslint-disable vuejs-accessibility/form-control-has-label */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'customSelect',
  props: ['options', 'modelValue'],
  emits: ['update:modelValue'],
});

</script>

<template>
  <select
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
  <option disabled>
    ...
  </option>
    <option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
    >
    {{ option.value }}
    </option>
  </select>
</template>
