<template>
  <Transition name="modal-fade">
    <div
      v-if="isOpen"
      class="modal fixed inset-0 z-50 flex items-center justify-center"
      @click.self="$emit('close')"
    >
      <div
        class="modal-content p-8 max-w-md w-full mx-4 fade-in-up"
        :class="maxWidthClass"
        @click.stop
      >
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, watch } from 'vue';

const props = defineProps({
  // Controla a visibilidade do modal (substitui a classe 'hidden')
  isOpen: {
    type: Boolean,
    required: true,
  },
  // Permite controlar a largura máxima do modal, se necessário
  maxWidth: {
    type: String,
    default: 'md', // 'sm', 'md', 'lg', 'xl', '2xl', etc.
  },
});

const emit = defineEmits(['close']);

// Mapeia o prop `maxWidth` para a classe Tailwind CSS
const maxWidthClass = computed(() => {
  if (props.maxWidth === 'auto') return '';
  return `max-w-${props.maxWidth}`;
});

// Lógica para fechar o modal ao pressionar 'Escape'
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden'; // Bloqueia o scroll do body
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    }
  },
  { immediate: true }
);

const handleEscape = (e) => {
  if (e.key === 'Escape') {
    emit('close');
  }
};
</script>

<style scoped>
/* Estilos extraídos do original: .modal e .modal-content [cite: 19, 20] */
.modal {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  transition: opacity 0.3s ease;
}

.modal-content {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  animation: fadeInUp 0.6s ease-out forwards; /* Reutilizando a animação original [cite: 2] */
}

/* Transições para o Vue (melhor que só usar display: hidden/flex) */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>