<template>
  <div id="app" class="app-container">
    <router-view />
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import BottomNav from './components/BottomNav.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}

.app-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

@media (min-width: 768px) {
  .app-container {
    display: flex;
    justify-content: center;
    background-color: #000;
  }
  
  .video-feed-page,
  .profile-page {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>
