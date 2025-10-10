<template>
  <button class="btn-primary" @click="emit('click')">
    <slot></slot>
  </button>
</template>

<script setup>
// Define um evento que o componente pai pode ouvir (@click)
const emit = defineEmits(['click']);
</script>