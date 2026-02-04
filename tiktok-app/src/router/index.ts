import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {
      title: 'Home - TikTok'
    }
  },
  {
    path: '/profile/:username?',
    name: 'Profile',
    component: () => import('@/pages/ProfilePage.vue'),
    meta: {
      title: 'Profile - TikTok'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Update document title on navigation
router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string | undefined;
  if (title) {
    document.title = title;
  }
  next();
});

export default router;
