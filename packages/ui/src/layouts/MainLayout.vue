<script setup lang="ts">
import { inject } from 'vue';
import { useColorMode } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { LayoutGrid, LogOut, Palette, User } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

const $appName = inject('$appName');
const mode = useColorMode({ initialValue: 'light' });
const router = useRouter();

const { user, isAuthenticated, signOut } = useAuthStore();

const switchTheme = () => {
  mode.value === 'dark' ? (mode.value = 'light') : (mode.value = 'dark');
};
</script>

<template>
  <header class="fixed start-0 top-0 z-20 w-full border-b bg-background">
    <div
      class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4"
    >
      <RouterLink class="flex items-center" to="/">
        <img
          alt="logo"
          class="mr-3"
          src="/logo.svg"
          style="height: 2.5rem; width: 2.45rem"
        />
        <span class="self-center whitespace-nowrap text-2xl font-bold">
          {{ $appName }}
        </span>
      </RouterLink>

      <div class="hidden items-center justify-between space-x-1 md:flex">
        <Button
          v-for="route in [
            { label: 'Home', to: '/' },
            { label: 'Listings', to: '/listings' },
            { label: 'Contact', to: '/contact' },
          ]"
          :key="route.to"
          as-child
          class="text-md text-muted-foreground transition-colors hover:text-foreground"
          size="sm"
          variant="ghost"
        >
          <RouterLink exact-active-class="text-primary" :to="route.to">
            {{ route.label }}
          </RouterLink>
        </Button>
      </div>

      <div class="flex items-center justify-between space-x-2">
        <Button
          v-if="isAuthenticated()"
          as-child
          class="text-muted-foreground transition-colors hover:text-foreground"
          size="icon"
          variant="ghost"
        >
          <RouterLink active-class="text-primary" to="/my">
            <LayoutGrid class="h-6 w-6" />
          </RouterLink>
        </Button>

        <DropdownMenu v-if="isAuthenticated()">
          <DropdownMenuTrigger as-child>
            <Button as-child class="h-9 w-9" size="icon" variant="ghost">
              <Avatar class="hover:border">
                <AvatarImage
                  alt="avatar"
                  :src="`https://api.dicebear.com/8.x/thumbs/svg?seed=${user.id}`"
                />
                <AvatarFallback>{{ user.name?.charAt(0) }}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-44">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="router.push('/my/profile')">
              <User class="mr-2 h-4 w-4" /><span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem @click="switchTheme()">
              <Palette class="mr-2 h-4 w-4" /><span>Switch theme</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="signOut()">
              <LogOut class="mr-2 h-4 w-4" /><span>Sign out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button as-child class="text-md" v-if="!isAuthenticated()">
          <RouterLink to="/sign-in">Sign in</RouterLink>
        </Button>
      </div>
    </div>
  </header>

  <main style="margin-top: 72px">
    <ScrollArea style="height: calc(100vh - 72px)">
      <RouterView />
    </ScrollArea>
  </main>
</template>
