<script setup lang="ts">
import { formatDate } from '@/helpers';
import type { Tender } from '@/models';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

defineProps<{ tender: Tender }>();
</script>

<template>
  <Dialog>
    <DialogTrigger
      class="text-muted-foreground transition-colors hover:text-foreground"
    >
      View bids
    </DialogTrigger>
    <DialogContent
      class="max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] p-0"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>{{ tender.number }}</DialogTitle>
        <DialogDescription>{{ tender.title }}</DialogDescription>
      </DialogHeader>
      <div class="px-2">
        <Table>
          <TableCaption>Total bids: {{ tender.bids?.length }}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Vender</TableHead>
              <TableHead class="text-right">Submitted on</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="bid in tender.bids" :key="bid.id">
              <TableCell>{{ bid.vendor?.name }}</TableCell>
              <TableCell class="text-right">
                {{ formatDate(bid.createdAt) }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  </Dialog>
</template>
