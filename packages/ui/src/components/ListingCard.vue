<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ArrowRight, Calendar, EyeIcon } from 'lucide-vue-next';
import type { Tender } from '@/models';
import { fromNow } from '@/helpers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

defineProps<{ tender: Tender }>();

const router = useRouter();
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-start">
        <div class="flex items-center space-x-4">
          <Avatar class="h-9 w-9">
            <AvatarImage
              alt="avatar"
              :src="`https://api.dicebear.com/8.x/shapes/svg?seed=${tender.organization?.id}`"
            />
            <AvatarFallback>
              {{ tender.organization?.name.charAt(0).toUpperCase() }}
            </AvatarFallback>
          </Avatar>
          <div class="space-y-1.5">
            <p class="line-clamp-1 font-medium leading-4">
              {{ tender.organization?.name }}
            </p>
            <p class="line-clamp-1 text-sm text-muted-foreground">
              {{ tender.organization?.address }}
            </p>
          </div>
        </div>
        <p class="ml-auto line-clamp-1 text-sm text-muted-foreground">
          <span v-if="new Date(tender.dueDate) > new Date()">
            {{ fromNow(tender.createdAt) }}
          </span>
          <Badge v-else variant="destructive">expired</Badge>
        </p>
      </div>
    </CardHeader>
    <CardContent>
      <h3
        class="mb-2 line-clamp-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ tender.title }}
      </h3>
      <div class="flex">
        <p class="mr-4 line-clamp-2 text-muted-foreground">
          {{ tender.description }}
        </p>
        <Avatar class="ml-auto h-12 w-12" shape="square">
          <AvatarImage
            alt="avatar"
            :src="`https://api.dicebear.com/8.x/icons/svg?seed=${tender.title}`"
          />
          <AvatarFallback>{{ tender.title.charAt(0) }}</AvatarFallback>
        </Avatar>
      </div>
    </CardContent>
    <CardFooter class="flex items-center justify-between">
      <div class="flex">
        <Card class="mr-2 flex cursor-default items-center px-4 py-2 text-sm">
          <EyeIcon class="mr-2 h-4 w-4" /> {{ tender.views }}
        </Card>
        <Card
          v-if="new Date(tender.dueDate) > new Date()"
          class="mr-2 flex cursor-default items-center px-4 py-2 text-sm"
        >
          <Calendar class="mr-2 h-4 w-4" /> Due {{ fromNow(tender.dueDate) }}
        </Card>
      </div>

      <Button variant="ghost" @click="router.push(`/listings/${tender.id}`)">
        Read more <ArrowRight class="ml-2 h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
</template>
