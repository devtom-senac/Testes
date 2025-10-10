<template>
  <div class="card p-6 fade-in-up">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-slate-400 text-sm mb-1">{{ title }}</p>
        <p class="text-3xl font-light text-white">{{ value }}</p>
      </div>
      <i :class="[iconClass, `text-2xl text-${color}-400`]"></i>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  icon: {
    type: String, // Ex: 'fas fa-users'
    default: 'fas fa-info-circle',
  },
  color: {
    type: String, // Ex: 'blue', 'purple', 'green'
    default: 'gray',
  },
});

// A classe do ícone é diretamente o prop.icon (fas fa-users)
const iconClass = props.icon;
</script>

<style scoped>
/* O .card é definido no style.css global */
</style>