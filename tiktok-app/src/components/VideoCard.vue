<template>
  <div
    class="video-card relative w-full h-full bg-black flex items-center justify-center"
    @click="togglePlayPause"
    role="button"
    tabindex="0"
    :aria-label="isPlaying ? 'Pause video' : 'Play video'"
    @keydown.enter="togglePlayPause"
    @keydown.space.prevent="togglePlayPause"
  >
    <!-- Video Element -->
    <video
      ref="videoRef"
      :src="video.videoUrl"
      class="w-full h-full object-contain"
      loop
      muted
      playsinline
      preload="auto"
      :poster="video.thumbnailUrl"
      @loadeddata="handleVideoLoaded"
      @play="handlePlay"
      @pause="handlePause"
    />

    <!-- Play/Pause Overlay -->
    <Transition name="fade">
      <div
        v-if="showPlayIcon"
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div class="bg-black/40 rounded-full p-6">
          <svg
            v-if="!isPlaying"
            xmlns="http://www.w3.org/2000/svg"
            class="w-16 h-16 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-16 h-16 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        </div>
      </div>
    </Transition>

    <!-- Video Info Overlay -->
    <div class="absolute bottom-0 left-0 right-16 p-4 pb-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
      <!-- Creator Info -->
      <div class="flex items-center gap-3 mb-3 pointer-events-auto">
        <UserAvatar
          :src="creator?.avatar || ''"
          :username="creator?.username || 'Unknown'"
          size="md"
          @click.stop="navigateToProfile"
        />
        <button
          class="text-white font-bold text-base hover:underline focus:outline-none focus:underline"
          @click.stop="navigateToProfile"
          :aria-label="`View ${creator?.username}'s profile`"
        >
          @{{ creator?.username || 'Unknown' }}
        </button>
      </div>

      <!-- Description -->
      <p class="text-white text-sm leading-relaxed line-clamp-2">
        {{ video.description }}
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="absolute bottom-20 right-2 flex flex-col items-center gap-5">
      <!-- Like Button -->
      <button
        class="flex flex-col items-center gap-1 transition-transform active:scale-95"
        @click.stop="handleLike"
        :aria-label="isLiked ? 'Unlike video' : 'Like video'"
        :aria-pressed="isLiked"
      >
        <div
          class="w-12 h-12 rounded-full bg-gray-800/80 flex items-center justify-center transition-colors"
          :class="{ 'bg-tiktok-red/20': isLiked }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 h-7 transition-colors"
            :class="isLiked ? 'text-tiktok-red fill-current' : 'text-white'"
            viewBox="0 0 24 24"
            :fill="isLiked ? 'currentColor' : 'none'"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <span class="text-white text-xs font-medium">{{ formattedLikeCount }}</span>
      </button>

      <!-- Comment Button -->
      <button
        class="flex flex-col items-center gap-1 transition-transform active:scale-95"
        @click.stop="handleComment"
        aria-label="View comments"
      >
        <div class="w-12 h-12 rounded-full bg-gray-800/80 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 h-7 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </div>
        <span class="text-white text-xs font-medium">{{ formattedCommentCount }}</span>
      </button>

      <!-- Share Button -->
      <button
        class="flex flex-col items-center gap-1 transition-transform active:scale-95"
        @click.stop="handleShare"
        aria-label="Share video"
      >
        <div class="w-12 h-12 rounded-full bg-gray-800/80 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 h-7 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </div>
        <span class="text-white text-xs font-medium">Share</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Video, User } from '@/types';
import { getUserById } from '@/data';
import { useAppStore } from '@/store';
import { formatCount } from '@/utils';
import UserAvatar from './UserAvatar.vue';

interface Props {
  video: Video;
  isActive: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  openComments: [videoId: string];
}>();

const router = useRouter();
const store = useAppStore();

const videoRef = ref<HTMLVideoElement | null>(null);
const isPlaying = ref<boolean>(false);
const showPlayIcon = ref<boolean>(false);
const isLoaded = ref<boolean>(false);

let playIconTimeout: ReturnType<typeof setTimeout> | null = null;

const creator = computed<User | undefined>(() => {
  return getUserById(props.video.userId);
});

const isLiked = computed<boolean>(() => {
  return store.isVideoLiked(props.video.id);
});

const formattedLikeCount = computed<string>(() => {
  return formatCount(store.getAdjustedLikeCount(props.video));
});

const formattedCommentCount = computed<string>(() => {
  return formatCount(props.video.commentCount);
});

// Handle video loaded
function handleVideoLoaded(): void {
  isLoaded.value = true;
}

// Handle play event
function handlePlay(): void {
  isPlaying.value = true;
}

// Handle pause event
function handlePause(): void {
  isPlaying.value = false;
}

// Toggle play/pause
function togglePlayPause(): void {
  if (!videoRef.value) return;

  if (isPlaying.value) {
    videoRef.value.pause();
  } else {
    videoRef.value.play();
  }

  // Show play icon briefly
  showPlayIcon.value = true;
  if (playIconTimeout) {
    clearTimeout(playIconTimeout);
  }
  playIconTimeout = setTimeout(() => {
    showPlayIcon.value = false;
  }, 500);
}

// Handle like
function handleLike(): void {
  store.toggleLike(props.video.id);
}

// Handle comment
function handleComment(): void {
  emit('openComments', props.video.id);
}

// Handle share (mock)
function handleShare(): void {
  // Mock share action - just show an alert in real app you'd use Web Share API
  alert('Share feature coming soon!');
}

// Navigate to creator profile
function navigateToProfile(): void {
  if (creator.value) {
    router.push(`/profile/${creator.value.username}`);
  }
}

// Watch for active state changes
watch(
  () => props.isActive,
  (active) => {
    if (!videoRef.value) return;

    if (active) {
      videoRef.value.play().catch(() => {
        // Autoplay was prevented
        isPlaying.value = false;
      });
    } else {
      videoRef.value.pause();
      videoRef.value.currentTime = 0;
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (props.isActive && videoRef.value && isLoaded.value) {
    videoRef.value.play().catch(() => {
      isPlaying.value = false;
    });
  }
});

onUnmounted(() => {
  if (playIconTimeout) {
    clearTimeout(playIconTimeout);
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
