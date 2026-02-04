<template>
  <button
    class="relative rounded-full overflow-hidden border-2 border-white focus:outline-none focus:ring-2 focus:ring-tiktok-red"
    :class="sizeClasses"
    :aria-label="`${username}'s avatar`"
    @click="handleClick"
  >
    <img
      :src="src"
      :alt="`${username}'s profile picture`"
      class="w-full h-full object-cover"
      loading="lazy"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  src: string;
  username: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  clickable: true
});

const emit = defineEmits<{
  click: [];
}>();

const sizeClasses = computed<string>(() => {
  const sizes: Record<string, string> = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };
  return sizes[props.size] || sizes.md;
});

function handleClick(): void {
  if (props.clickable) {
    emit('click');
  }
}
</script>
