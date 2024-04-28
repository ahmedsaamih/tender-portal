<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

const router = useRouter();
</script>

<template>
  <section class="flex h-screen items-center px-4">
    <div class="mx-auto max-w-screen-sm text-center">
      <h1
        class="mb-4 text-7xl font-extrabold tracking-tight text-primary lg:text-9xl"
      >
        404
      </h1>
      <h2
        class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl"
      >
        Page not found
      </h2>
      <p class="mb-4 text-lg font-light text-muted-foreground">
        Sorry, we couldn’t find the page you’re looking for.
      </p>

      <Button
        class="text-muted-foreground"
        variant="ghost"
        @click="router.go(-1)"
      >
        <ArrowLeft class="mr-2 h-4 w-4" /> Go back
      </Button>
    </div>
  </section>
</template>
