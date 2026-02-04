<template>
  <div class="app min-h-screen bg-black">
    <router-view />
    <NavigationBar />
  </div>
</template>

<script setup lang="ts">
import { NavigationBar } from '@/components';
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #000;
  color: #fff;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Focus visible for accessibility */
:focus-visible {
  outline: 2px solid #FE2C55;
  outline-offset: 2px;
}

/* Remove default button styles */
button {
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

/* Remove default anchor styles */
a {
  color: inherit;
  text-decoration: none;
}
</style>
