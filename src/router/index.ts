import { createRouter, createWebHistory } from 'vue-router'
import VideoFeed from '@/pages/VideoFeed.vue'
import Profile from '@/pages/Profile.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: VideoFeed
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile
    }
  ]
})

export default router
