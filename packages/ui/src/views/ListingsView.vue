<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { Search, Loader2 } from 'lucide-vue-next';
import type { Tender } from '@/models';
import ListingCard from '@/components/ListingCard.vue';
import ListingCardSkeleton from '@/components/ListingCardSkeleton.vue';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

let loading = ref(false);
let query = ref<string>('');
let showExpired = ref(false);
let tenders = ref<Tender[]>();

const fetchTenders = async () => {
  loading.value = true;

  let filter = query.value || showExpired.value ? `?` : '';

  filter = query.value ? `${filter}query=${query.value}` : filter;
  filter = showExpired.value
    ? query.value
      ? `${filter}&showExpired=true`
      : `${filter}showExpired=true`
    : filter;

  axios
    .get(`${import.meta.env.VITE_API_URL}/tenders${filter}`)
    .then((response) => {
      tenders.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

fetchTenders();
</script>

<template>
  <section class="mx-auto max-w-screen-xl px-4 py-8 lg:py-16">
    <div class="mb-8 flex items-center justify-center gap-4 py-4 lg:mb-16">
      <Input
        v-model="query"
        class="h-14 max-w-screen-sm px-6 text-xl"
        placeholder="Search for tenders..."
        @keyup.enter="fetchTenders()"
      />
      <Button
        class="px-5 text-xl"
        style="height: 3.35rem"
        :disabled="loading"
        @click="fetchTenders()"
      >
        <Loader2 v-if="loading" class="mr-3 h-6 w-6 animate-spin" />
        <Search v-else class="mr-3 h-6 w-6" />
        Search
      </Button>
    </div>
    <div class="flex items-start gap-6">
      <Card class="sticky top-6 hidden min-w-[325px] lg:block">
        <CardHeader>
          <CardTitle class="text-lg">Advanced Search</CardTitle>
          <CardDescription>Refine your search with filters</CardDescription>
          <Separator class="mt-4" />
        </CardHeader>
        <CardContent>
          <div class="flex items-center justify-between">
            <Label>Show expired posts</Label>
            <Switch
              @update:checked="
                showExpired = !showExpired;
                fetchTenders();
              "
            />
          </div>
        </CardContent>
      </Card>
      <div class="w-full space-y-6">
        <template v-if="loading">
          <ListingCardSkeleton v-for="n in 3" :key="n" />
        </template>
        <ListingCard
          v-else-if="tenders && tenders?.length"
          v-for="tender in tenders"
          :key="tender.id"
          :tender="tender"
        />
        <p v-else class="text-xl text-muted-foreground">No matching records!</p>
      </div>
    </div>
  </section>
</template>
