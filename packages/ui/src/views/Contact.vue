<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MailIcon, MapPin, PhoneCallIcon } from 'lucide-vue-next';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast/use-toast';
import { Toaster } from '@/components/ui/toast';
import { useRouter } from 'vue-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const { toast } = useToast();
const router = useRouter();
const testfunc = async () => {
  toast({
    description: 'Your message has been sent',
  });
  await sleep(1500);
  router.go(0);
};
</script>

<template>
  <Toaster />
  <div class="flex h-[15vh] items-center justify-center">
    <p class="p-5 text-3xl font-bold">Contact Us</p>
  </div>

  <div class="mx-auto max-w-screen-xl px-4 pb-0 lg:px-12 lg:pt-0">
    <div class="grid gap-4 py-4 md:grid-cols-1 lg:grid-cols-3">
      <Card>
        <CardHeader class="h-50 flex items-center space-y-0 pb-0">
          <PhoneCallIcon />
          <CardTitle class="text-md text-center font-medium">
            Call Center
          </CardTitle>
          <p class="text-s items-center text-muted-foreground">
            Our Call center operates 24/7
          </p>
        </CardHeader>
        <CardContent class="text-center">
          <div class="content-center text-2xl font-bold"></div>
          <p class="text-md text-muted-foreground">9124400</p>
        </CardContent>
      </Card>
      <Card class="text-center">
        <CardHeader class="h-50 flex items-center space-y-0 pb-0">
          <MailIcon />
          <CardTitle class="text-md font-medium"> Email Us </CardTitle>
          <p class="text-s text-muted-foreground">
            Send us your queries via mail
          </p>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold"></div>
          <p class="text-md text-muted-foreground">help@4400.gov.mv</p>
        </CardContent>
      </Card>
      <Card class="text-center">
        <CardHeader class="h-50 flex items-center space-y-0 pb-0">
          <MapPin />
          <CardTitle class="text-md font-medium"> Visit Us </CardTitle>
          <p class="text-s text-muted-foreground">Visit our information desk</p>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold"></div>
          <p class="text-md text-muted-foreground">
            Economic Ministry Ground floor
          </p>
        </CardContent>
      </Card>
    </div>
  </div>

  <!-- //starting second div -->

  <!-- //test div for map -->

  <!-- //starting form -->
  <div class="mx-auto max-w-screen-xl px-4 pb-2 pt-0 lg:px-12 lg:pb-0">
    <Tabs default-value="Send a Message" class="w-full text-left">
      <TabsList class="grid w-full grid-cols-1">
        <TabsTrigger value="account"> Send a Message </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Send a message.</CardTitle>
            <CardDescription>
              request a callback or write to us
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2 p-4 pb-5 text-right">
            <div class="columns-2 space-y-1">
              <div class="pt-0 text-left">
                <h1 class="text-2xl font-bold">
                  Ministry of Economic Development
                </h1>
                <p class="text-noo-600 mt-3 pb-5 font-light leading-relaxed">
                  Velaanaage, Boduthakurufaanu Magu, Henveiru, Male 20388,
                  Republic of Maldives
                </p>
                <p class="text-noo-600 pb-3 text-xl font-bold">📞4400</p>
                <p class="text-noo-400 mt-3 font-light leading-relaxed">
                  📞 (960) 9124400&nbsp; &nbsp;·&nbsp; &nbsp;✉️ help@4400.gov.mv
                </p>
                <p class="text-noo-400 mt-3 font-light leading-relaxed">
                  Sunday to Thursday
                  <br />
                  0800-1600hrs MVT (GMT +5)
                </p>
              </div>
              <div class="space-y-1 text-left">
                <CardContent>
                  <Input placeholder="Name" class="w-full border p-1" />
                </CardContent>
              </div>
              <div class="space-y-1 text-left">
                <CardContent>
                  <Input
                    placeholder="Email"
                    type="email"
                    class="w-full border p-1"
                  />
                </CardContent>
              </div>
              <div class="space-y-1 text-left">
                <CardContent>
                  <Input
                    placeholder="Your message."
                    class="h-[10dvh] w-full border p-1"
                  />
                </CardContent>
              </div>
            </div>

            <Button class="w-70 m-6 p-5" @click="testfunc()"> Send </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
  <div>
    <iframe
      class="mx-auto max-w-screen-xl px-4 py-8 lg:px-12 lg:py-5"
      style="height: 400px; width: 200%"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.2141322888815!2d73.51036937674384!3d4.178265345961379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b3f7f00106320e1%3A0xd277cf4d956b423e!2sMinistry%20of%20Economic%20Development!5e0!3m2!1sen!2smv!4v1713595438689!5m2!1sen!2smv"
      loading="lazy"
    ></iframe>
  </div>
</template>
