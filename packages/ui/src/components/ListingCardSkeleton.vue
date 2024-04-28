<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center space-x-4">
        <Skeleton class="h-9 w-9 rounded-full" />
        <div class="space-y-1.5 py-1">
          <Skeleton class="h-[16px] w-[250px]" />
          <Skeleton class="h-[12px] w-[200px]" />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="mb-2 py-1">
        <Skeleton class="h-[20px] w-8/12" />
      </div>
      <div class="space-y-2 py-1">
        <Skeleton class="h-[16px] w-full" />
        <Skeleton class="h-[16px] w-10/12" />
      </div>
    </CardContent>
    <CardFooter class="flex items-center justify-between">
      <div class="py-1">
        <Skeleton class="h-[32px] w-[75px]" />
      </div>
    </CardFooter>
  </Card>
</template>
