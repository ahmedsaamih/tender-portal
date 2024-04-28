<script setup lang="ts">
import {
  Folder,
  CircleUser,
  Menu,
  Package2,
  Search,
  FolderIcon,
} from 'lucide-vue-next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/auth';
import { useToast } from '@/components/ui/toast/use-toast';
import { Toaster } from '@/components/ui/toast';
import { useRouter } from 'vue-router';

import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
const { user } = useAuthStore();
const { toast } = useToast();
const router = useRouter();
const testfunc = async () => {
  toast({
    description: 'File Upload Successful',
  });
  router.go(0);
};
</script>

<template>
  <Toaster />
  <div class="flex min-h-screen w-full flex-col">
    <main
      class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
    >
      <div class="mx-auto grid w-full max-w-6xl gap-2">
        <p>Welcome back</p>
        <CardTitle> {{ user.name }}</CardTitle>
      </div>
      <div class="mx-auto grid w-full max-w-screen-xl items-start gap-6">
        <div class="grid w-full gap-6 text-sm text-muted-foreground">
          <div class="flex w-full flex-wrap justify-center px-0"></div>

          <Tabs default-value="general" class="w-full]">
            <TabsList class="grid w-full grid-cols-4">
              <TabsTrigger value="general"> General </TabsTrigger>
              <TabsTrigger value="documents"> Documents </TabsTrigger>
              <TabsTrigger value="requests"> Requests </TabsTrigger>
              <TabsTrigger value="support tickets">
                Support Tickets
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent class="space-y-2">
                  <div class="space-y-1 pb-4">
                    <Label for="name">Name</Label>
                    <p>{{ user.name }}</p>
                  </div>
                  <div class="space-y-1 pb-4">
                    <Label for="address"
                      >User ID
                      <p>{{ user.id }}</p>
                    </Label>
                  </div>
                  <div class="space-y-1 pb-4">
                    <Label for="email">E-Mail</Label>
                    <Input id="email" default-value="someone@email.com" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <!-- //Document Tab -->
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>
                    Upload and manage your documents here
                  </CardDescription>
                </CardHeader>
                <CardContent class="space-y-2">
                  <Label for="name">Select Files to Upload</Label>
                  <p></p>
                  <input type="file" name="file" />
                </CardContent>
                <CardFooter>
                  <Button class="w-70 m-0 p-5" @click="testfunc()"
                    >Upload</Button
                  >
                  <div></div>
                </CardFooter>
              </Card>
            </TabsContent>

            <!-- //requests starting -->

            <TabsContent value="requests">
              <Card>
                <CardContent>
                  <CardHeader>
                    <CardTitle>Requests</CardTitle>
                    <CardDescription> Your requests </CardDescription>
                  </CardHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead class="w-auto">Type</TableHead>
                        <TableHead>Submitted by</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead class="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>New Registration</TableCell>
                        <TableCell>{{ user.name }}</TableCell>
                        <TableCell>13 May 2023</TableCell>
                        <TableCell class="text-right">Completed</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Address Change</TableCell>
                        <TableCell>{{ user.name }}</TableCell>
                        <TableCell>1 February 2024</TableCell>
                        <TableCell class="text-right">Completed</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Email Change</TableCell>
                        <TableCell>{{ user.name }}</TableCell>
                        <TableCell>24 April 2024</TableCell>
                        <TableCell class="text-right">Pending</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="support tickets">
              <Card>
                <CardContent>
                  <CardHeader>
                    <CardTitle>Support Tickets</CardTitle>
                    <CardDescription> Your support tickets </CardDescription>
                  </CardHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead class="w-auto">Type</TableHead>
                        <TableHead>Submitted by</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead class="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>File Upload Error</TableCell>
                        <TableCell>{{ user.name }}</TableCell>
                        <TableCell>1 May 2023</TableCell>
                        <TableCell class="text-right">Open</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Registration Error</TableCell>
                        <TableCell>{{ user.name }}</TableCell>
                        <TableCell>17 January 2024</TableCell>
                        <TableCell class="text-right">Closed</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Other</TableCell>
                        <TableCell>{{ user.name }}</TableCell>
                        <TableCell>27 April 2024</TableCell>
                        <TableCell class="text-right">Closed</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  </div>
</template>
