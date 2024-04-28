<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { formatDate } from '@/helpers';
import { useAuthStore } from '@/stores/auth';
import type { Organization } from '@/models';
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
let organization = ref<Organization[]>();

const fetchOrganizations = async () => {
  loading.value = true;

  let filter = query.value ? `?query=${query.value}` : '';

  axios
    .get(`${import.meta.env.VITE_API_URL}/organizations${filter}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    .then((response) => {
      organization.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

fetchOrganizations();
</script>

<template>
  <div class="mb-6 space-y-1">
    <h3 class="text-2xl font-bold">Organizations</h3>
    <p class="text-muted-foreground">List of registered organization.</p>
  </div>

  <div class="flex items-center justify-between">
    <Input
      v-model="query"
      class="w-[300px]"
      placeholder="Search by Name or ID..."
      type="text"
      @update:model-value="fetchOrganizations()"
    />
  </div>
  <Card class="mt-6">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-auto">Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>ID</TableHead>
          <TableHead class="text-right">Registered on</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="organization in organization" :key="organization.id">
          <TableCell>{{ organization.name }}</TableCell>
          <TableCell>{{ organization.address }}</TableCell>
          <TableCell>{{ organization.id }}</TableCell>
          <TableCell class="text-right">{{
            formatDate(organization.createdAt)
          }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
</template>
