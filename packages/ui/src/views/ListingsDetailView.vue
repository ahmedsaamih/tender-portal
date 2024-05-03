<script setup lang="ts">
import axios from 'axios';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Calendar, Hash, Loader2 } from 'lucide-vue-next';
import type { Tender } from '@/models';
import { formatDate } from '@/helpers';
import { useAuthStore } from '@/stores/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const router = useRouter();
const { user, isAuthenticated } = useAuthStore();

const canApply = computed(() => {
  return (
    isAuthenticated() &&
    tender.value &&
    tender.value?.bids?.findIndex(
      (x) => Number(x.vendorId) === user.entityId,
    ) === -1
  );
});

let applying = ref(false);
let loading = ref(false);
let tender = ref<Tender>();

const apply = async () => {
  applying.value = true;

  axios
    .post(
      `${import.meta.env.VITE_API_URL}/tenders/${router.currentRoute.value.params.id}/apply`,
      {},
      { headers: { Authorization: `Bearer ${user.token}` } },
    )
    .then(() => {
      fetchTender();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      applying.value = false;
    });
};

const fetchTender = async () => {
  loading.value = true;

  axios
    .get(
      `${import.meta.env.VITE_API_URL}/tenders/${router.currentRoute.value.params.id}`,
    )
    .then((response) => {
      tender.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

fetchTender();
</script>

<template>
  <section class="mx-auto max-w-screen-xl px-4 py-8 lg:py-16">
    <div class="flex items-start gap-6">
      <div v-if="!tender && loading" class="w-full">
        <div class="mb-6 flex items-center space-x-4">
          <Skeleton class="h-12 w-12 rounded-full" />
          <div class="space-y-2.5">
            <Skeleton class="h-[22px] w-[250px]" />
            <Skeleton class="h-[18px] w-[200px]" />
          </div>
        </div>
        <Skeleton class="h-[26px] w-full" />
      </div>

      <div v-if="tender" class="w-full">
        <div class="mb-6 flex items-center space-x-4">
          <Avatar class="h-12 w-12">
            <AvatarImage
              alt="avatar"
              :src="`https://api.dicebear.com/8.x/shapes/svg?seed=${tender.organization?.id}`"
            />
            <AvatarFallback>
              {{ tender.organization?.name.charAt(0).toUpperCase() }}
            </AvatarFallback>
          </Avatar>
          <div class="space-y-1.5">
            <p class="text-lg font-medium leading-5">
              {{ tender.organization?.name }}
            </p>
            <p class="text-muted-foreground">
              {{ tender.organization?.address }}
            </p>
          </div>
        </div>
        <h2
          class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ tender.title }}
        </h2>
        <p class="mb-6 text-lg text-muted-foreground">
          {{ tender.description }}
        </p>
        <embed
          src="../src/assets/sample.pdf"
          class="mb-6 h-[90vh] w-full rounded-lg object-cover"
        />
        <!-- <img
          alt="tender"
          class="mb-6 w-full rounded-lg object-cover"
          :src="`https://placehold.co/800x400/?text=${tender.title}`"
        /> -->
      </div>

      <Card class="sticky top-6 hidden min-w-[325px] lg:block">
        <CardHeader>
          <CardTitle class="text-lg">Details</CardTitle>
          <Separator class="mt-4" />
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="flex items-start space-x-4">
            <Hash class="mt-px h-5 w-5" />
            <div class="space-y-1">
              <p class="text-sm text-muted-foreground">Post number</p>
              <p class="text-sm font-medium leading-none">
                {{ tender?.number }}
              </p>
            </div>
          </div>
          <div class="flex items-start space-x-4">
            <Calendar class="mt-px h-5 w-5" />
            <div class="space-y-1">
              <p class="text-sm text-muted-foreground">Deadline</p>
              <p class="text-sm font-medium leading-none">
                {{ formatDate(tender?.dueDate) }}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter
          v-if="
            tender && new Date(tender.dueDate) > new Date() && isAuthenticated()
          "
        >
          <Button v-if="canApply" class="w-full" @click="apply">
            <Loader2 v-if="applying" class="mr-2 h-4 w-4 animate-spin" />
            Apply
          </Button>
          <Button v-else class="w-full" :disabled="true"> Submitted </Button>
        </CardFooter>
      </Card>
    </div>
  </section>
</template>
