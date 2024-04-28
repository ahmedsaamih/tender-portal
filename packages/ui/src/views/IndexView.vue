<script setup lang="ts">
import axios from 'axios';
import { inject, ref } from 'vue';
import {
  BellDot,
  ChevronRight,
  Clock8,
  Facebook,
  Figma,
  Github,
  GlobeLock,
  Headset,
  Instagram,
  LayoutList,
  Search,
  TabletSmartphone,
  Twitch,
  Twitter,
} from 'lucide-vue-next';
import type { Stats, Tender } from '@/models';
import ListingCard from '@/components/ListingCard.vue';
import ListingCardSkeleton from '@/components/ListingCardSkeleton.vue';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const $appName = inject('$appName');

let stats = ref<Stats[]>();
let sLoading = ref(false);
let tenders = ref<Tender[]>();
let tLoading = ref(false);

const fetchStats = async () => {
  sLoading.value = true;
  axios
    .get(`${import.meta.env.VITE_API_URL}/stats`)
    .then((response) => {
      stats.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      sLoading.value = false;
    });
};

const fetchTenders = async () => {
  tLoading.value = true;
  axios
    .get(`${import.meta.env.VITE_API_URL}/tenders/popular`)
    .then((response) => {
      tenders.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      tLoading.value = false;
    });
};

fetchStats();
fetchTenders();
</script>

<template>
  <section
    class="mx-auto max-w-screen-xl px-4 pb-8 pt-10 text-center lg:px-12 lg:pb-16 lg:pt-20"
  >
    <Button
      as-child
      class="mb-8 rounded-full bg-gray-100 px-4 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      size="sm"
    >
      <RouterLink to="/listings">
        Uncover tailored results for you! <ChevronRight class="ml-2 h-4 w-4" />
      </RouterLink>
    </Button>

    <h1
      class="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
    >
      Opportunities at your fingertips
    </h1>
    <p class="mb-8 text-lg font-light text-muted-foreground md:px-6 lg:text-xl">
      Explore government tenders in one hub, ensuring transparency, efficiency,
      and equal opportunity. Streamline your search, submit bids with ease, and
      propel your business to new heights.
    </p>

    <div class="mb-12 flex items-center justify-center space-x-4 lg:mb-16">
      <Button as-child class="text-md" size="lg">
        <RouterLink to="/listings">
          <LayoutList class="mr-2 h-4 w-4" /> View all listings
        </RouterLink>
      </Button>
      <Button as-child class="text-md" size="lg" variant="outline">
        <a href="/#features">Learn more</a>
      </Button>
    </div>

    <p class="mb-8 font-bold uppercase text-muted-foreground">
      Listings from oevr 50 government entities including
    </p>

    <div class="flex flex-wrap justify-center px-20">
      <img
        alt="bcc"
        class="mx-4 max-h-20 w-[100px] p-3"
        src="../assets/images/bcc.svg"
      />
      <img
        alt="epa"
        class="mx-4 max-h-20 w-[100px] p-3"
        src="../assets/images/epa.svg"
      />
      <img
        alt="fcc"
        class="mx-4 max-h-20 w-[100px] p-3"
        src="../assets/images/fcc.svg"
      />
      <img
        alt="hpa"
        class="mx-4 max-h-20 w-[100px] p-3"
        src="../assets/images/hpa.svg"
      />
      <img
        alt="ura"
        class="mx-4 max-h-20 w-[100px] p-3"
        src="../assets/images/ura.svg"
      />
    </div>
  </section>

  <section class="mx-auto max-w-screen-xl px-4 py-8 lg:px-12 lg:py-16">
    <h2
      class="mb-4 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      Popular listings
    </h2>
    <p
      class="mb-8 text-center text-lg font-light text-muted-foreground md:px-6 lg:mb-10"
    >
      Explore what's popular to make informed decisions and stay ahead in your
      endeavors.
    </p>

    <div class="grid gap-8 lg:grid-cols-2">
      <template v-if="tLoading">
        <ListingCardSkeleton v-for="n in 2" :key="n" />
      </template>
      <ListingCard
        v-else-if="tenders && tenders?.length"
        v-for="tender in tenders"
        :key="tender.id"
        :tender="tender"
      />
    </div>
    <p
      v-if="!tLoading && tenders?.length === 0"
      class="text-center text-xl text-muted-foreground"
    >
      No matching records!
    </p>
  </section>

  <section
    id="features"
    class="mx-auto max-w-screen-xl px-4 py-8 lg:px-12 lg:py-16"
  >
    <h2
      class="mb-4 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      Customized features to suit every business
    </h2>
    <p
      class="mb-10 text-center text-lg font-light text-muted-foreground md:px-6 lg:mb-16"
    >
      Explore advanced tools and features designed to enhance your journey. From
      intuitive search to proactive support services, our platform empowers you
      to seize opportunities for growth with ease.
    </p>

    <dl class="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:gap-y-12">
      <div
        v-for="feature in [
          {
            icon: Search,
            name: 'Advanced Search',
            description:
              'Effortlessly find relevant tenders with advanced search filters tailored to your specific needs and interests.',
          },
          {
            icon: Clock8,
            name: 'Real-time Updates',
            description:
              'Stay in the loop with instant notifications for timely tender updates, ensuring you take actions without delay.',
          },
          {
            icon: GlobeLock,
            name: 'Secure Platform',
            description:
              'Your data is protected by advanced security measures, ensuring peace of mind for your business operations.',
          },
          {
            icon: BellDot,
            name: 'Customized Alerts',
            description:
              'Receive personalized alerts for new tenders matching your criteria, keeping you ahead of the competition.',
          },
          {
            icon: TabletSmartphone,
            name: 'Mobile Accessibility',
            description:
              'Access our platform anytime, anywhere, with mobile-friendly features that enable you to stay connected on the go.',
          },
          {
            icon: Headset,
            name: 'Dedicated Customer Support',
            description:
              'Get expert assistance whenever you need it, with our dedicated support team ready to address any queries or concerns.',
          },
        ]"
        :key="feature.name"
        class="relative pl-16"
      >
        <dt class="mb-2 font-bold text-gray-900 dark:text-white">
          <div
            class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-500"
          >
            <Component :is="feature.icon" class="h-5 w-5 text-white" />
          </div>
          {{ feature.name }}
        </dt>
        <dd class="leading-7 text-muted-foreground">
          {{ feature.description }}
        </dd>
      </div>
    </dl>
  </section>

  <section class="mx-auto max-w-screen-xl px-4 py-8 lg:px-12 lg:py-16">
    <h2
      class="mb-4 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      Proven Reliability, Trusted by Many
    </h2>
    <p
      class="mb-10 text-center text-lg font-light text-muted-foreground md:px-6 lg:mb-16"
    >
      Experience the trust and reliability that countless businesses have found
      with us.
    </p>

    <dl class="flex flex-wrap justify-center px-10">
      <template v-if="sLoading">
        <div v-for="n in 3" :key="n" class="mb-4 w-full sm:w-1/2 md:w-1/3">
          <Skeleton class="mx-auto mb-2 h-[40px] w-1/3" />
          <Skeleton class="mx-auto h-[28px] w-2/3" />
        </div>
      </template>
      <div
        v-else-if="stats && stats?.length"
        v-for="stat in stats"
        :key="stat.title"
        class="mb-4 w-full text-center sm:w-1/2 md:w-1/3"
      >
        <dt class="mb-2 text-3xl font-extrabold md:text-4xl">
          {{ stat.count }}+
        </dt>
        <dd class="text-lg text-muted-foreground">{{ stat.title }}</dd>
      </div>
    </dl>
  </section>

  <footer class="mx-auto max-w-screen-xl">
    <div class="p-4 md:flex md:justify-between">
      <div class="mb-6 md:mb-0">
        <h4 class="font-bold tracking-tight text-gray-900 dark:text-white">
          Subscribe to get updates!
        </h4>
        <p class="mb-2 text-sm text-muted-foreground">
          Stay up to date with the newly available tenders announcements.
        </p>
        <Button size="sm" class="h-7 text-xs">Subscribe</Button>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="(section, index) in [
            {
              title: 'Company',
              routes: [
                { label: 'About', to: '/about' },
                { label: 'Help Center', to: '/help-center' },
              ],
            },
            {
              title: 'Legal',
              routes: [
                { label: 'Privacy Policy', to: '/privacy-policy' },
                { label: 'Terms & Conditions', to: '/terms-and-conditions' },
              ],
            },
          ]"
          :key="index"
        >
          <h5
            class="mb-2 text-sm font-bold uppercase leading-6 tracking-tight text-gray-900 dark:text-white"
          >
            {{ section.title }}
          </h5>
          <ul class="text-sm text-muted-foreground">
            <li
              v-for="route in section.routes"
              :key="route.to"
              class="mt-1 hover:underline"
            >
              <RouterLink :to="route.to">{{ route.label }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr />
    <div class="p-4 sm:flex sm:items-center sm:justify-between">
      <div class="text-sm text-muted-foreground">
        © {{ new Date().getFullYear() }}
        <RouterLink class="hover:underline" to="/">
          {{ $appName }}™.
        </RouterLink>
        All Rights Reserved.
      </div>

      <div class="mt-2 flex space-x-4 text-muted-foreground sm:mt-0">
        <Instagram class="h-3.5 w-3.5 hover:text-foreground" />
        <Facebook class="h-3.5 w-3.5 hover:text-foreground" />
        <Twitter class="h-3.5 w-3.5 hover:text-foreground" />
        <Twitch class="h-3.5 w-3.5 hover:text-foreground" />
        <Figma class="h-3.5 w-3.5 hover:text-foreground" />
        <Github class="h-3.5 w-3.5 hover:text-foreground" />
      </div>
    </div>
  </footer>
</template>
