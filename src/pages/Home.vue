<template>
  <div
    ref="containerRef"
    class="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    @scroll="handleScroll"
  >
    <VideoItem
      v-for="(video, index) in videos"
      :key="video.id"
      :video="video"
      :is-active="currentIndex === index"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/store'
import VideoItem from '@/components/VideoItem.vue'

const store = useAppStore()
const containerRef = ref<HTMLElement | null>(null)
const currentIndex = ref(0)

const videos = computed(() => store.videos)

let scrollTimeout: ReturnType<typeof setTimeout> | null = null

function handleScroll(): void {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }

  scrollTimeout = setTimeout(() => {
    if (!containerRef.value) return

    const scrollTop = containerRef.value.scrollTop
    const viewportHeight = window.innerHeight
    const newIndex = Math.round(scrollTop / viewportHeight)

    if (newIndex !== currentIndex.value && newIndex >= 0 && newIndex < videos.value.length) {
      currentIndex.value = newIndex
      store.setCurrentVideoIndex(newIndex)
    }
  }, 100)
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    scrollToNext()
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    scrollToPrevious()
  }
}

function scrollToNext(): void {
  if (currentIndex.value < videos.value.length - 1) {
    currentIndex.value++
    scrollToIndex(currentIndex.value)
  }
}

function scrollToPrevious(): void {
  if (currentIndex.value > 0) {
    currentIndex.value--
    scrollToIndex(currentIndex.value)
  }
}

function scrollToIndex(index: number): void {
  if (!containerRef.value) return
  const viewportHeight = window.innerHeight
  containerRef.value.scrollTo({
    top: index * viewportHeight,
    behavior: 'smooth'
  })
  store.setCurrentVideoIndex(index)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  
  // Set initial active video
  if (containerRef.value) {
    currentIndex.value = 0
    store.setCurrentVideoIndex(0)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
})
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
div::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
div {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
