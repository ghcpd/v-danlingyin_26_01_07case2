<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="flex justify-around items-center h-14 max-w-md mx-auto">
      <router-link
        v-for="item in navItems"
        :key="item.id"
        :to="item.route"
        class="flex flex-col items-center justify-center px-4 py-2 text-xs transition-colors"
        :class="isActive(item.route) ? 'text-white' : 'text-gray-400 hover:text-gray-200'"
        :aria-label="item.label"
        :aria-current="isActive(item.route) ? 'page' : undefined"
      >
        <component
          :is="item.icon"
          class="w-6 h-6 mb-1"
          :class="{ 'fill-current': isActive(item.route) }"
        />
        <span>{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { useRoute } from 'vue-router';

interface NavItemInternal {
  id: string;
  label: string;
  icon: ReturnType<typeof h>;
  route: string;
}

const route = useRoute();

// Home icon component
const HomeIcon = {
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
      h('polyline', { points: '9 22 9 12 15 12 15 22' })
    ]);
  }
};

// Profile icon component
const ProfileIcon = {
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
      h('circle', { cx: '12', cy: '7', r: '4' })
    ]);
  }
};

const navItems: NavItemInternal[] = [
  {
    id: 'home',
    label: 'Home',
    icon: HomeIcon,
    route: '/'
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: ProfileIcon,
    route: '/profile'
  }
];

function isActive(itemRoute: string): boolean {
  if (itemRoute === '/') {
    return route.path === '/';
  }
  return route.path.startsWith(itemRoute);
}
</script>
