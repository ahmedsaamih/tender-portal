<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { formatDate } from '@/helpers';
import { useAuthStore } from '@/stores/auth';
import type { Tender } from '@/models';
import TenderFormDialog from '@/components/TenderFormDialog.vue';
import BidsListDialog from '@/components/BidsListDialog.vue';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const { user } = useAuthStore();

let loading = ref(false);
let query = ref<string>('');
let tenders = ref<Tender[]>();

const fetchMyTenders = async () => {
  loading.value = true;

  let filter = query.value ? `?query=${query.value}` : '';

  axios
    .get(`${import.meta.env.VITE_API_URL}/tenders/my${filter}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
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

fetchMyTenders();
</script>

<template>
  <div class="mb-6 space-y-1">
    <h3 class="text-2xl font-bold">Tenders</h3>
    <p class="text-muted-foreground">List of tenders for your organization.</p>
  </div>

  <div class="flex items-center justify-between">
    <Input
      v-model="query"
      class="w-[300px]"
      placeholder="Search by number, title..."
      type="text"
      @update:model-value="fetchMyTenders()"
    />
    <TenderFormDialog @on-create="fetchMyTenders()" />
  </div>
  <Card class="mt-6">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Number</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Due date</TableHead>
          <TableHead class="text-right">Views</TableHead>
          <TableHead class="text-right">Bids</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="tender in tenders" :key="tender.id">
          <TableCell>{{ tender.number }}</TableCell>
          <TableCell>{{ tender.title }}</TableCell>
          <TableCell>{{ formatDate(tender.dueDate) }}</TableCell>
          <TableCell class="text-right">{{ tender.views }}</TableCell>
          <TableCell class="text-right">{{ tender.bids?.length }}</TableCell>
          <TableCell class="text-right">
            <BidsListDialog :tender="tender" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
</template>
