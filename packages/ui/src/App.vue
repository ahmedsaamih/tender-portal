<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import Toaster from '@/components/ui/toast/Toaster.vue';

document.title = import.meta.env.VITE_APP_NAME;
useColorMode({ initialValue: 'light' });
</script>

<template>
  <Toaster />
  <RouterView />
</template>
