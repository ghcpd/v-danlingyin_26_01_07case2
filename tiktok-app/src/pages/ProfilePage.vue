<template>
  <div class="profile-page min-h-screen bg-black pb-20" role="main">
    <!-- Profile Header -->
    <header class="pt-12 pb-6 px-4">
      <div class="max-w-md mx-auto flex flex-col items-center">
        <!-- Avatar -->
        <UserAvatar
          :src="user?.avatar || ''"
          :username="user?.username || 'Unknown'"
          size="xl"
          :clickable="false"
        />

        <!-- Username -->
        <h1 class="text-white text-xl font-bold mt-4">
          @{{ user?.username || 'Unknown' }}
        </h1>

        <!-- Display Name -->
        <p class="text-gray-400 text-sm mt-1">
          {{ user?.displayName || '' }}
        </p>

        <!-- Stats -->
        <div class="flex items-center gap-6 mt-4">
          <div class="text-center">
            <span class="text-white font-bold text-lg block">
              {{ formatCount(user?.followingCount || 0) }}
            </span>
            <span class="text-gray-500 text-xs">Following</span>
          </div>
          <div class="text-center">
            <span class="text-white font-bold text-lg block">
              {{ formatCount(user?.followerCount || 0) }}
            </span>
            <span class="text-gray-500 text-xs">Followers</span>
          </div>
          <div class="text-center">
            <span class="text-white font-bold text-lg block">
              {{ formatCount(totalLikes) }}
            </span>
            <span class="text-gray-500 text-xs">Likes</span>
          </div>
        </div>

        <!-- Bio -->
        <p class="text-white text-sm text-center mt-4 px-8 max-w-sm">
          {{ user?.bio || 'No bio yet' }}
        </p>

        <!-- Edit Profile Button (for current user) -->
        <button
          v-if="isCurrentUser"
          class="mt-4 px-6 py-2 border border-gray-600 rounded-md text-white text-sm font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-tiktok-red"
          aria-label="Edit profile"
        >
          Edit profile
        </button>

        <!-- Follow Button (for other users) -->
        <button
          v-else
          class="mt-4 px-8 py-2 bg-tiktok-red rounded-md text-white text-sm font-bold hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Follow user"
        >
          Follow
        </button>
      </div>
    </header>

    <!-- Videos Tab -->
    <div class="border-t border-gray-800">
      <div class="max-w-md mx-auto">
        <!-- Tab Header -->
        <div class="flex justify-center">
          <button
            class="flex-1 py-3 text-center border-b-2 border-white text-white font-medium"
            aria-selected="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mx-auto"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
        </div>

        <!-- Video Grid -->
        <div
          class="grid grid-cols-3 gap-0.5 p-0.5"
          role="list"
          aria-label="User videos"
        >
          <button
            v-for="video in userVideos"
            :key="video.id"
            class="aspect-[9/16] bg-gray-900 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-tiktok-red"
            @click="openVideoInFeed(video.id)"
            :aria-label="`View video: ${video.description.substring(0, 50)}...`"
            role="listitem"
          >
            <img
              :src="video.thumbnailUrl"
              :alt="video.description"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
            <!-- Play Count Overlay -->
            <div class="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>{{ formatCount(video.likeCount) }}</span>
            </div>
          </button>
        </div>

        <!-- Empty State -->
        <div
          v-if="userVideos.length === 0"
          class="py-16 text-center text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-16 h-16 mx-auto mb-4 opacity-50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" />
            <line x1="17" y1="17" x2="22" y2="17" />
            <line x1="17" y1="7" x2="22" y2="7" />
          </svg>
          <p class="text-lg font-medium">No videos yet</p>
          <p class="text-sm mt-1">Videos will appear here</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { User, Video } from '@/types';
import { getUserByUsername } from '@/data';
import { useAppStore } from '@/store';
import { formatCount } from '@/utils';
import { UserAvatar } from '@/components';

const route = useRoute();
const router = useRouter();
const store = useAppStore();

// Get user from route param or use current user
const user = computed<User | undefined>(() => {
  const username = route.params.username as string | undefined;
  if (username) {
    return getUserByUsername(username);
  }
  return store.currentUser;
});

// Check if viewing current user's profile
const isCurrentUser = computed<boolean>(() => {
  return user.value?.id === store.currentUser.id;
});

// Get user's videos
const userVideos = computed<Video[]>(() => {
  if (!user.value) return [];
  return store.getUserVideos(user.value.id);
});

// Calculate total likes across all videos
const totalLikes = computed<number>(() => {
  return userVideos.value.reduce((sum, video) => sum + video.likeCount, 0);
});

// Open video in feed view
function openVideoInFeed(videoId: string): void {
  store.setActiveVideoId(videoId);
  router.push('/');
}
</script>
