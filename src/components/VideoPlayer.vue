<template>
  <div class="video-player relative w-full h-full bg-black">
    <video
      ref="videoRef"
      :src="videoUrl"
      class="w-full h-full object-cover"
      loop
      playsinline
      @click="togglePlayPause"
    />
    
    <div 
      v-if="!isPlaying"
      class="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div class="w-20 h-20 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
        <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

interface Props {
  videoUrl: string
  isVisible: boolean
}

const props = defineProps<Props>()
const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)

const play = async (): Promise<void> => {
  if (!videoRef.value) return
  try {
    await videoRef.value.play()
    isPlaying.value = true
  } catch (error) {
    console.error('Video play error:', error)
  }
}

const pause = (): void => {
  if (!videoRef.value) return
  videoRef.value.pause()
  isPlaying.value = false
}

const togglePlayPause = (): void => {
  if (isPlaying.value) {
    pause()
  } else {
    play()
  }
}

watch(() => props.isVisible, (visible) => {
  if (visible) {
    play()
  } else {
    pause()
  }
})

onMounted(() => {
  if (props.isVisible) {
    play()
  }
})

onUnmounted(() => {
  pause()
})

defineExpose({
  play,
  pause
})
</script>
