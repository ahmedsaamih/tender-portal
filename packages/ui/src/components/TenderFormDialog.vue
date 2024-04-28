<script setup lang="ts">
import * as z from 'zod';
import axios from 'axios';
import {
  getLocalTimeZone,
  type DateValue,
  DateFormatter,
} from '@internationalized/date';
import { ref } from 'vue';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import type { TenderCreateInput } from '@/models';
import { useAuthStore } from '@/stores/auth';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

const emit = defineEmits<{ (e: 'on-create'): void }>();

const { user } = useAuthStore();

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const date = ref<DateValue>();
const df = new DateFormatter('en-US', { dateStyle: 'long' });
const errors = ref<z.ZodFormattedError<z.infer<typeof schema>> | null>(null);
const open = ref(false);
const tenderCreateInput = ref<TenderCreateInput>({
  title: '',
  description: '',
});

let loading = ref(false);

const clearErrors = () => {
  errors.value = null;
};

const create = async (tenderCreateInput: TenderCreateInput) => {
  loading.value = true;

  axios
    .post(
      `${import.meta.env.VITE_API_URL}/tenders`,
      { ...tenderCreateInput, dueDate: date.value?.toDate(getLocalTimeZone()) },
      { headers: { Authorization: `Bearer ${user.token}` } },
    )
    .then(() => {
      open.value = false;
      tenderCreateInput.title = '';
      tenderCreateInput.description = '';
      date.value = undefined;
      emit('on-create');
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const getLabelClasses = (error: string[] | undefined) =>
  error ? 'text-red-500 transition-colors' : undefined;

const getFieldClasses = (error: string[] | undefined) =>
  error ? 'text-red-500 ring-1 ring-red-400 transition-colors' : undefined;

const onSubmit = async () => {
  const valid = schema.safeParse(tenderCreateInput.value);

  if (!valid.success) {
    errors.value = valid.error.format();
  } else {
    errors.value = null;
    if (!date.value) return;
    await create(tenderCreateInput.value);
  }
};
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button>New Tender</Button>
    </DialogTrigger>
    <DialogContent
      class="max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] p-0"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>Add Tender</DialogTitle>
      </DialogHeader>
      <form @submit.prevent="onSubmit()" class="p-6 pb-2">
        <div class="mb-2 space-y-1.5">
          <Label for="title" :class="getLabelClasses(errors?.title?._errors)">
            Title
          </Label>
          <Input
            v-model="tenderCreateInput.title"
            type="text"
            :class="getFieldClasses(errors?.title?._errors)"
            @update:model-value="clearErrors()"
          />
        </div>
        <div class="mb-2 space-y-1.5">
          <Label
            for="description"
            :class="getLabelClasses(errors?.description?._errors)"
          >
            Description
          </Label>
          <Textarea
            v-model="tenderCreateInput.description"
            type="text"
            :class="getFieldClasses(errors?.description?._errors)"
            @update:model-value="clearErrors()"
          />
        </div>
        <div class="mb-2 space-y-1.5">
          <Label for="dueDate">Due date</Label>
          <br />
          <Popover>
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )
                "
              >
                <CalendarIcon class="mr-2 h-4 w-4" />
                {{
                  date
                    ? df.format(date.toDate(getLocalTimeZone()))
                    : 'Pick a date'
                }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar v-model="date" initial-focus />
            </PopoverContent>
          </Popover>
        </div>
        <Button class="ml-auto mt-6" type="submit" :disabled="loading">
          <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
          Save
        </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>
