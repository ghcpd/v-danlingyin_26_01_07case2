<template>
  <img
    :src="avatar"
    :alt="`${username}'s avatar`"
    class="rounded-full border-2 border-white"
    :class="sizeClass"
    loading="lazy"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  avatar: string
  username: string
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium'
})

const sizeClass = computed(() => {
  const sizeMap = {
    small: 'w-10 h-10',
    medium: 'w-12 h-12',
    large: 'w-24 h-24'
  }
  return sizeMap[props.size]
})
</script>
