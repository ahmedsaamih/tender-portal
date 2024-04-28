<script setup lang="ts">
import {
  Building,
  CircleUser,
  Inbox,
  LayoutDashboard,
  LibraryBig,
  Store,
  User,
} from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';

const { user } = useAuthStore();
</script>

<template>
  <header class="sticky top-0 border-b bg-background">
    <nav
      class="mx-auto flex max-w-screen-xl flex-wrap items-center gap-x-6 gap-y-2 p-4 text-sm font-medium"
    >
      <RouterLink
        class="flex items-center text-muted-foreground transition-colors hover:text-foreground"
        exact-active-class="text-primary"
        to="/my"
      >
        <LayoutDashboard class="mr-2 h-4 w-4" /> Dashboard
      </RouterLink>

      <template
        v-for="route in [
          {
            icon: Inbox,
            label: 'Submissions',
            to: '/my/submissions',
            type: 'vendor',
          },
          {
            icon: LibraryBig,
            label: 'Tenders',
            to: '/my/tenders',
            type: 'organization',
          },
          {
            icon: Building,
            label: 'Organizations',
            to: '/my/organizations',
            type: 'organization',
          },
          {
            icon: Store,
            label: 'Vendors',
            to: '/my/vendors',
            type: 'organization',
          },
          {
            icon: CircleUser,
            label: 'Users',
            to: '/my/users',
            type: 'organization',
          },
        ]"
        :key="route.to"
      >
        <RouterLink
          v-if="route.type === user.type"
          class="flex items-center text-muted-foreground transition-colors hover:text-foreground"
          exact-active-class="text-primary"
          :to="route.to"
        >
          <Component class="mr-2 h-4 w-4" :is="route.icon" /> {{ route.label }}
        </RouterLink>
      </template>

      <RouterLink
        class="ml-auto flex items-center text-muted-foreground transition-colors hover:text-foreground"
        exact-active-class="text-primary"
        to="/my/profile"
      >
        <User class="mr-2 h-4 w-4" /> {{ user.name }}
      </RouterLink>
    </nav>
  </header>

  <div class="mx-auto max-w-screen-xl p-4">
    <RouterView />
  </div>
</template>
