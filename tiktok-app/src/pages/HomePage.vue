<template>
  <div
    class="home-page h-screen w-full bg-black overflow-hidden"
    ref="containerRef"
    @wheel.prevent="handleWheel"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    role="main"
    aria-label="Video feed"
  >
    <!-- Video Feed Container -->
    <div
      class="video-feed-container transition-transform duration-300 ease-out"
      :style="{ transform: `translateY(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(video, index) in videos"
        :key="video.id"
        class="video-item h-screen w-full"
      >
        <VideoCard
          :video="video"
          :is-active="index === currentIndex"
          @open-comments="openComments"
        />
      </div>
    </div>

    <!-- Video Progress Indicator -->
    <div
      class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1"
      role="navigation"
      aria-label="Video navigation"
    >
      <div
        v-for="(video, index) in videos"
        :key="video.id"
        class="w-1.5 rounded-full transition-all duration-200"
        :class="[
          index === currentIndex 
            ? 'h-4 bg-white' 
            : 'h-2 bg-gray-500 hover:bg-gray-400 cursor-pointer'
        ]"
        @click="goToVideo(index)"
        :aria-label="`Go to video ${index + 1}`"
        :aria-current="index === currentIndex ? 'true' : 'false'"
        role="button"
        tabindex="0"
        @keydown.enter="goToVideo(index)"
      />
    </div>

    <!-- Keyboard Navigation Hint -->
    <div
      class="absolute top-4 left-1/2 -translate-x-1/2 text-gray-500 text-xs hidden md:block"
      aria-hidden="true"
    >
      Use ↑↓ keys or scroll to navigate
    </div>

    <!-- Comment Panel -->
    <CommentPanel
      v-if="isCommentPanelOpen && activeCommentVideoId"
      :video-id="activeCommentVideoId"
      @close="closeComments"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { Video } from '@/types';
import { useAppStore } from '@/store';
import { VideoCard, CommentPanel } from '@/components';
import { throttle } from '@/utils';

const store = useAppStore();
const containerRef = ref<HTMLElement | null>(null);

// Current video index
const currentIndex = computed<number>({
  get: () => store.currentVideoIndex,
  set: (value: number) => store.setVideoIndex(value)
});

// Videos list
const videos = computed<Video[]>(() => store.feedVideos);

// Comment panel state
const isCommentPanelOpen = ref<boolean>(false);
const activeCommentVideoId = ref<string | null>(null);

// Touch handling
const touchStartY = ref<number>(0);
const touchDeltaY = ref<number>(0);
const isTouching = ref<boolean>(false);

// Navigate to specific video
function goToVideo(index: number): void {
  if (index >= 0 && index < videos.value.length) {
    currentIndex.value = index;
  }
}

// Navigate to next video
function nextVideo(): void {
  if (currentIndex.value < videos.value.length - 1) {
    currentIndex.value++;
  }
}

// Navigate to previous video
function previousVideo(): void {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}

// Handle mouse wheel
const handleWheel = throttle((event: WheelEvent): void => {
  if (event.deltaY > 0) {
    nextVideo();
  } else if (event.deltaY < 0) {
    previousVideo();
  }
}, 300);

// Handle touch start
function handleTouchStart(event: TouchEvent): void {
  touchStartY.value = event.touches[0].clientY;
  isTouching.value = true;
}

// Handle touch move
function handleTouchMove(event: TouchEvent): void {
  if (!isTouching.value) return;
  touchDeltaY.value = touchStartY.value - event.touches[0].clientY;
}

// Handle touch end
function handleTouchEnd(): void {
  if (!isTouching.value) return;
  
  const threshold = 50; // Minimum swipe distance
  
  if (touchDeltaY.value > threshold) {
    nextVideo();
  } else if (touchDeltaY.value < -threshold) {
    previousVideo();
  }
  
  touchDeltaY.value = 0;
  isTouching.value = false;
}

// Handle keyboard navigation
function handleKeydown(event: KeyboardEvent): void {
  if (isCommentPanelOpen.value) return;
  
  switch (event.key) {
    case 'ArrowDown':
    case 'j':
      event.preventDefault();
      nextVideo();
      break;
    case 'ArrowUp':
    case 'k':
      event.preventDefault();
      previousVideo();
      break;
  }
}

// Open comments panel
function openComments(videoId: string): void {
  activeCommentVideoId.value = videoId;
  isCommentPanelOpen.value = true;
}

// Close comments panel
function closeComments(): void {
  isCommentPanelOpen.value = false;
  activeCommentVideoId.value = null;
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.video-feed-container {
  height: 100%;
  will-change: transform;
}

.video-item {
  scroll-snap-align: start;
}
</style>
