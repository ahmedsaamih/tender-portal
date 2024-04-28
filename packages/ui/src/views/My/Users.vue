<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, inject } from 'vue';
import { formatDate } from '@/helpers';
import { useAuthStore } from '@/stores/auth';
import type { Users } from '@/models';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Organization, Vendor, Tender } from '@/models';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Tabs from '@/components/ui/tabs/Tabs.vue';
import TabsList from '@/components/ui/tabs/TabsList.vue';
import { TabsContent, TabsTrigger } from '@/components/ui/tabs';

const { user } = useAuthStore();

let loading = ref(false);
let query = ref<string>('');
let users = ref<Users[]>();
let organization = ref<Organization[]>();

const fetchUsers = async () => {
  loading.value = true;

  let filter = query.value ? `?query=${query.value}` : '';

  axios
    .get(`${import.meta.env.VITE_API_URL}/users${filter}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    .then((response) => {
      users.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="mb-6 space-y-1">
    <h3 class="text-2xl font-bold">Users</h3>
    <p class="text-muted-foreground">List of registered users.</p>
  </div>

  <div class="flex items-center justify-between">
    <Input
      v-model="query"
      class="w-[300px]"
      placeholder="Search by Name or ID..."
      type="text"
      @update:model-value="fetchUsers()"
    />
  </div>
  <div class="item-center pb-0 pt-4 text-center">
    <Tabs default-value="vendor">
      <TabsList>
        <TabsTrigger value="vendor"> Vendors </TabsTrigger>
        <TabsTrigger value="organization"> Organizations </TabsTrigger>
      </TabsList>
      <TabsContent value="vendor">
        <Card class="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-auto text-left">Name</TableHead>
                <TableHead class="text-left">Email</TableHead>
                <TableHead class="text-left">Registration No.</TableHead>
                <TableHead class="text-right">Last Logged In</TableHead>
                <TableHead class="text-right">Registered on</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="user in users" :key="user.id">
                <TableCell class="text-left">{{ user.name }}</TableCell>
                <TableCell class="text-left">{{ user.email }}</TableCell>
                <TableCell class="text-left">{{
                  user.vendor?.registration_no
                }}</TableCell>
                <TableCell class="text-right">{{
                  formatDate(user.lastLoginAt)
                }}</TableCell>
                <TableCell class="text-right">{{
                  formatDate(user.createdAt)
                }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </TabsContent>

      <TabsContent value="organization">
        <Card class="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="text-left">Name</TableHead>
                <TableHead class="text-left">ORG ID</TableHead>
                <TableHead class="text-left">Email</TableHead>
                <TableHead class="text-right">Last Logged In</TableHead>
                <TableHead class="text-right">Registered on</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="user in users" :key="user.id">
                <TableCell class="text-left">{{
                  user.organization?.name
                }}</TableCell>
                <TableCell class="text-left">{{
                  user.organization?.id
                }}</TableCell>
                <TableCell class="text-left">{{ user.email }}</TableCell>
                <TableCell class="text-right">{{
                  formatDate(user.lastLoginAt)
                }}</TableCell>
                <TableCell class="text-right">{{
                  formatDate(user.createdAt)
                }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
