<template>
  <div
    class="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
    @click.self="handleClose"
    role="dialog"
    aria-modal="true"
    aria-labelledby="comment-panel-title"
  >
    <div
      class="bg-gray-900 rounded-t-2xl w-full max-w-md max-h-[70vh] flex flex-col animate-slide-up"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 id="comment-panel-title" class="text-white font-semibold">
          {{ videoComments.length }} comments
        </h2>
        <button
          @click="handleClose"
          class="text-gray-400 hover:text-white p-2 rounded-full transition-colors"
          aria-label="Close comments"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <!-- Comments List -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div
          v-for="comment in videoComments"
          :key="comment.id"
          class="flex gap-3"
        >
          <UserAvatar
            :src="getCommentUser(comment.userId)?.avatar || ''"
            :username="getCommentUser(comment.userId)?.username || 'Unknown'"
            size="sm"
            :clickable="false"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="text-gray-400 text-sm font-medium">
                {{ getCommentUser(comment.userId)?.username || 'Unknown' }}
              </span>
              <span class="text-gray-600 text-xs">
                {{ formatRelativeTime(comment.createdAt) }}
              </span>
            </div>
            <p class="text-white text-sm mt-1">{{ comment.text }}</p>
            <div class="flex items-center gap-4 mt-2">
              <button
                class="flex items-center gap-1 text-gray-500 hover:text-white text-xs transition-colors"
                aria-label="Like comment"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span>{{ formatCount(comment.likeCount) }}</span>
              </button>
              <button
                class="text-gray-500 hover:text-white text-xs transition-colors"
                aria-label="Reply to comment"
              >
                Reply
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="videoComments.length === 0"
          class="text-center py-8 text-gray-500"
        >
          <p>No comments yet</p>
          <p class="text-sm mt-1">Be the first to comment!</p>
        </div>
      </div>

      <!-- Comment Input (Mock) -->
      <div class="p-4 border-t border-gray-800">
        <div class="flex items-center gap-3">
          <UserAvatar
            :src="currentUser.avatar"
            :username="currentUser.username"
            size="sm"
            :clickable="false"
          />
          <input
            type="text"
            placeholder="Add a comment..."
            class="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tiktok-red"
            disabled
            aria-label="Add a comment (disabled in mock)"
          />
          <button
            class="text-tiktok-red font-semibold text-sm opacity-50 cursor-not-allowed"
            disabled
            aria-label="Post comment (disabled in mock)"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import type { Comment, User } from '@/types';
import { getCommentsByVideoId, getUserById } from '@/data';
import { useAppStore } from '@/store';
import { formatCount, formatRelativeTime } from '@/utils';
import UserAvatar from './UserAvatar.vue';

interface Props {
  videoId: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

const store = useAppStore();

const currentUser = computed<User>(() => store.currentUser);

const videoComments = computed<Comment[]>(() => {
  return getCommentsByVideoId(props.videoId);
});

function getCommentUser(userId: string): User | undefined {
  return getUserById(userId);
}

function handleClose(): void {
  emit('close');
}

// Close on escape key
function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    handleClose();
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
