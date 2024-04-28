<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { formatDate } from '@/helpers';
import { useAuthStore } from '@/stores/auth';
import type { Vendor } from '@/models';
import { Button } from '@/components/ui/button';
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
let vendors = ref<Vendor[]>();

const fetchVendors = async () => {
  loading.value = true;

  let filter = query.value ? `?query=${query.value}` : '';

  axios
    .get(`${import.meta.env.VITE_API_URL}/vendors${filter}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    .then((response) => {
      vendors.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

fetchVendors();
</script>

<template>
  <div class="mb-6 space-y-1">
    <h3 class="text-2xl font-bold">Vendors</h3>
    <p class="text-muted-foreground">List of registered vendors.</p>
  </div>

  <div class="flex items-center justify-between">
    <Input
      v-model="query"
      class="w-[300px]"
      placeholder="Search by Name or ID..."
      type="text"
      @update:model-value="fetchVendors()"
    />
  </div>
  <Card class="mt-6">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-auto">Name</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead class="text-right">Registered on</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="vendor in vendors" :key="vendor.registration_no">
          <TableCell>{{ vendor.name }}</TableCell>
          <TableCell>{{ vendor.registration_no }}</TableCell>
          <TableCell>{{ vendor.status }}</TableCell>
          <TableCell class="text-right">{{
            formatDate(vendor.createdAt)
          }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
</template>
