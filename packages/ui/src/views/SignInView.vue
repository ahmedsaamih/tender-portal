<script setup lang="ts">
import * as z from 'zod';
import axios from 'axios';
import { ref } from 'vue';
import { AlertCircle, Loader2 } from 'lucide-vue-next';
import type { Credentials } from '@/models';
import { useAuthStore } from '@/stores/auth';
import { Alert, AlertTitle } from '@/components/ui/alert';
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

const { handleSignIn } = useAuthStore();

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const credentials = ref<Credentials>({ email: '', password: '' });
const errors = ref<z.ZodFormattedError<z.infer<typeof schema>> | null>(null);

let loading = ref(false);
let signInError = ref<string | null>(null);

const authenticate = async (credentials: Credentials) => {
  loading.value = true;

  axios
    .post(`${import.meta.env.VITE_API_URL}/auth/sign-in`, credentials)
    .then((response) => {
      handleSignIn(response.data);
    })
    .catch((error) => {
      console.error(error);
      signInError.value =
        error.response.status === 401
          ? error.response.data.message
          : 'An unknown error occured.';
    })
    .finally(() => {
      loading.value = false;
    });
};

const clearErrors = () => {
  errors.value = null;
  signInError.value = null;
};

const getLabelClasses = (error: string[] | undefined) =>
  error ? 'text-red-500 transition-colors' : undefined;

const getFieldClasses = (error: string[] | undefined) =>
  error ? 'text-red-500 ring-1 ring-red-400 transition-colors' : undefined;

const onSubmit = async () => {
  const valid = schema.safeParse(credentials.value);

  if (!valid.success) {
    errors.value = valid.error.format();
  } else {
    errors.value = null;
    await authenticate(credentials.value);
  }
};
</script>

<template>
  <section class="flex items-center md:h-screen">
    <Card class="mx-auto my-12 w-96">
      <CardHeader class="items-center">
        <RouterLink class="flex items-center" to="/">
          <img
            alt="logo"
            src="/logo.svg"
            style="height: 2.5rem; width: 2.45rem"
          />
        </RouterLink>
        <CardTitle class="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Enter your credentials below to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="onSubmit">
          <div class="mb-2 space-y-1.5">
            <Label for="email" :class="getLabelClasses(errors?.email?._errors)">
              Email
            </Label>
            <Input
              v-model="credentials.email"
              type="email"
              :class="getFieldClasses(errors?.email?._errors)"
              @update:model-value="clearErrors()"
            />
          </div>
          <div class="mb-2 space-y-1.5">
            <Label
              for="password"
              :class="getLabelClasses(errors?.password?._errors)"
            >
              Password
            </Label>
            <Input
              v-model="credentials.password"
              autocomplete="password"
              type="password"
              :class="getFieldClasses(errors?.password?._errors)"
              @update:model-value="clearErrors()"
            />
          </div>
          <Alert v-if="signInError" class="mt-6" variant="destructive">
            <AlertCircle class="h-4 w-4" />
            <AlertTitle class="mb-0">{{ signInError }}</AlertTitle>
          </Alert>
          <Button class="mt-6 w-full" type="submit" :disabled="loading">
            <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
            Sign in
          </Button>
        </form>
        <div class="mt-4 text-sm">
          Don't have an account?
          <RouterLink class="underline" to="/sign-up"> Sign up </RouterLink>
          <RouterLink class="ml-2 underline" to="/">Home</RouterLink>
        </div>
      </CardContent>
    </Card>
  </section>
</template>
