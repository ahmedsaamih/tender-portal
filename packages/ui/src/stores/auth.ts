import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';
import type { AuthenticatedUser } from '@/models';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const user = useStorage<AuthenticatedUser>('user', {});

  const handleSignIn = (authenticatedUser: AuthenticatedUser) => {
    user.value.id = authenticatedUser.id;
    user.value.entityId = authenticatedUser.entityId;
    user.value.name = authenticatedUser.name;
    user.value.token = authenticatedUser.token;
    user.value.type = authenticatedUser.type;
    router.push('/my');
  };

  const signOut = () => {
    user.value.id = undefined;
    user.value.entityId = undefined;
    user.value.name = undefined;
    user.value.token = undefined;
    user.value.type = undefined;
    router.push('/sign-in');
  };

  return {
    user: computed(() => user.value),
    handleSignIn,
    isAuthenticated: () => !!user.value.id,
    signOut,
  };
});
