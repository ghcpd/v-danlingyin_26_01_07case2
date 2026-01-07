<template>
  <div class="profile-page min-h-screen bg-black text-white pb-20">
    <div class="max-w-feed mx-auto">
      <div class="p-6">
        <div class="flex items-center mb-6">
          <img 
            :src="user.avatar"
            :alt="user.username"
            class="w-24 h-24 rounded-full mr-4"
          />
          <div class="flex-1">
            <h1 class="text-2xl font-bold mb-1">{{ user.username }}</h1>
            <div class="flex gap-4 text-sm">
              <div>
                <span class="font-semibold">{{ formatCount(user.followerCount) }}</span>
                <span class="text-gray-400 ml-1">Followers</span>
              </div>
              <div>
                <span class="font-semibold">{{ formatCount(user.followingCount) }}</span>
                <span class="text-gray-400 ml-1">Following</span>
              </div>
            </div>
          </div>
        </div>

        <p class="text-sm text-gray-300 mb-6">{{ user.bio }}</p>
      </div>

      <div class="border-t border-gray-800">
        <div class="flex items-center justify-center p-4 border-b-2 border-white">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
          <span class="font-semibold">Videos</span>
        </div>

        <div 
          v-if="userVideos.length === 0"
          class="text-center text-gray-500 py-12"
        >
          No videos yet
        </div>

        <div 
          v-else
          class="grid grid-cols-3 gap-1 p-1"
        >
          <div
            v-for="video in userVideos"
            :key="video.id"
            class="aspect-[9/16] bg-gray-900 relative cursor-pointer hover:opacity-80 transition-opacity"
            @click="openVideo(video.id)"
          >
            <img 
              :src="video.thumbnailUrl"
              :alt="video.description"
              class="w-full h-full object-cover"
            />
            <div class="absolute bottom-2 left-2 flex items-center text-white text-xs">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
              <span>{{ formatCount(video.likeCount) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mockUsers } from '@/data/users'
import { getVideosByUserId } from '@/data/videos'

const route = useRoute()
const router = useRouter()

const userId = computed(() => route.params.id as string)

const user = computed(() => {
  return mockUsers.find(u => u.id === userId.value) || mockUsers[0]
})

const userVideos = computed(() => {
  return getVideosByUserId(userId.value)
})

const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

const openVideo = (videoId: string): void => {
  router.push({ path: '/', query: { video: videoId } })
}
</script>
