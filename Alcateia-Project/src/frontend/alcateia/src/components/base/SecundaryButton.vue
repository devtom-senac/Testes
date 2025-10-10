<template>
  <button class="btn-secondary" @click="emit('click')">
    <slot></slot>
  </button>
</template>

<script setup>
const emit = defineEmits(['click']);
</script>