<script setup lang="ts">
import * as z from 'zod';
import axios from 'axios';
import { ref } from 'vue';
import { AlertCircle, Loader2 } from 'lucide-vue-next';
import type { SignUpInput } from '@/models';
import { useRouter } from 'vue-router';
import { useToast } from '@/components/ui/toast/use-toast';
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

const router = useRouter();
const { toast } = useToast();

const schema = z.object({
  vendorName: z.string().min(1),
  vendorRegistrationNo: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});

const signUpInput = ref<SignUpInput>({
  vendorName: '',
  vendorRegistrationNo: '',
  name: '',
  email: '',
  password: '',
});
const errors = ref<z.ZodFormattedError<z.infer<typeof schema>> | null>(null);

let loading = ref(false);
let signUpError = ref<string | null>(null);

const signUp = async (signUpInput: SignUpInput) => {
  loading.value = true;

  axios
    .post(`${import.meta.env.VITE_API_URL}/auth/sign-up`, signUpInput)
    .then(() => {
      toast({
        title: 'Your account has been registered.',
        description: 'Please sign in to continue.',
      });
      router.push('/sign-in');
    })
    .catch((error) => {
      console.error(error);
      signUpError.value =
        error.response.status === 400
          ? error.response.data.message
          : 'An unknown error occured.';
    })
    .finally(() => {
      loading.value = false;
    });
};

const clearErrors = () => {
  errors.value = null;
  signUpError.value = null;
};

const getLabelClasses = (error: string[] | undefined) =>
  error ? 'text-red-500 transition-colors' : undefined;

const getFieldClasses = (error: string[] | undefined) =>
  error ? 'text-red-500 ring-1 ring-red-400 transition-colors' : undefined;

const onSubmit = async () => {
  const valid = schema.safeParse(signUpInput.value);

  if (!valid.success) {
    errors.value = valid.error.format();
  } else {
    errors.value = null;
    await signUp(signUpInput.value);
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
        <CardTitle class="text-2xl">Sign up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="onSubmit">
          <div class="mb-2 space-y-1.5">
            <Label
              for="vendorName"
              :class="getLabelClasses(errors?.vendorName?._errors)"
            >
              Company name
            </Label>
            <Input
              v-model="signUpInput.vendorName"
              type="text"
              :class="getFieldClasses(errors?.vendorName?._errors)"
              @update:model-value="clearErrors()"
            />
          </div>
          <div class="mb-3 space-y-1.5">
            <Label
              for="vendorRegistrationNo"
              :class="getLabelClasses(errors?.vendorRegistrationNo?._errors)"
            >
              Company registration number
            </Label>
            <Input
              v-model="signUpInput.vendorRegistrationNo"
              type="text"
              :class="getFieldClasses(errors?.vendorRegistrationNo?._errors)"
              @update:model-value="clearErrors()"
            />
          </div>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground">
                User details
              </span>
            </div>
          </div>
          <div class="mb-2 mt-1 space-y-1.5">
            <Label for="name" :class="getLabelClasses(errors?.name?._errors)">
              Name
            </Label>
            <Input
              v-model="signUpInput.name"
              type="name"
              :class="getFieldClasses(errors?.name?._errors)"
              @update:model-value="clearErrors()"
            />
          </div>
          <div class="mb-2 space-y-1.5">
            <Label for="email" :class="getLabelClasses(errors?.email?._errors)">
              Email
            </Label>
            <Input
              v-model="signUpInput.email"
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
              v-model="signUpInput.password"
              autocomplete="password"
              type="password"
              :class="getFieldClasses(errors?.password?._errors)"
              @update:model-value="clearErrors()"
            />
          </div>
          <Alert v-if="signUpError" class="mt-6" variant="destructive">
            <AlertCircle class="h-4 w-4" />
            <AlertTitle class="mb-0">{{ signUpError }}</AlertTitle>
          </Alert>
          <Button class="mt-6 w-full" type="submit" :disabled="loading">
            <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
            Sign up
          </Button>
        </form>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <RouterLink class="underline" to="/sign-in">Sign in</RouterLink>
          <RouterLink class="ml-2 underline" to="/">Home</RouterLink>
        </div>
      </CardContent>
    </Card>
  </section>
</template>
