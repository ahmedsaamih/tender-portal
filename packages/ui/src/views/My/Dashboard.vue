<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BarChart4, BellDot } from 'lucide-vue-next';
import { onMounted, ref, inject } from 'vue';
import type { Organization, Vendor, Tender } from '@/models';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const $appName = inject('$appName');

const loading = ref(false);
let tenders = ref<Tender[]>();

const fetchTenders = async () => {
  loading.value = true;
  axios
    .get(`${import.meta.env.VITE_API_URL}/tenders/popular`)
    .then((response) => {
      tenders.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

fetchTenders();

const { user } = useAuthStore();

const fetchCounts = async () => {
  loading.value = true;
  axios
    .get(`${import.meta.env.VITE_API_URL}/organizations/tenders/count`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    .then((response) => {
      const options: any = {
        chart: {
          id: 'organization-tenders',
        },
        xaxis: {
          categories: [],
        },
      };
      const data: number[] = [];
      response.data.forEach((org: Organization) => {
        options.xaxis.categories.push(
          org.name
            .split(' ')
            .map((o) => o.charAt(0).toUpperCase())
            .join(''),
        );
        data.push(org._count?.tenders || 0);
      });
      tenderCountChartOptions.value = options;
      tenderCountSeries.value = [
        {
          name: 'Tenders',
          data,
        },
      ];
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const fetchTendersChart = async () => {
  loading.value = true;
  axios
    .get(`${import.meta.env.VITE_API_URL}/tenders`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    .then((response) => {
      const options: any = {
        chart: {
          id: 'tenders',
        },
        xaxis: {
          categories: [],
        },
      };
      const data: any[] = [];
      response.data.forEach((tenderView: Tender) => {
        options.xaxis.categories.push(
          tenderView.number.split('TD/2024/').join(''),
        );
        data.push(tenderView.views);
      });
      chartOptions.value = options;
      series.value = [
        {
          name: 'Views',
          data,
        },
      ];
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};
const tenderCountChartOptions = ref<any>({
  colors: ['#FC7414'],
});
const tenderCountSeries = ref<any[]>([]);
const chartOptions = ref<any>({
  colors: ['#FC7414'],
});
const series = ref<any>({});

onMounted(() => {
  fetchCounts();
  fetchTendersChart();
});

const OchartOptions = ref<any>({
  labels: ['Bids Submitted', 'Bids Won', 'Bids Open', 'Active Bids'],
  plotOptions: {
    radialBar: {
      dataLabels: {
        label: 'TOTAL',
      },
    },
  },
  colors: ['#FC7414'],
});
const Oseries = ref<any[]>([50, 70, 45, 12]);

const aOptions = ref<any>({
  labels: ['Bids Submitted', 'Bids Won'],

  colors: ['#FC7414', '#FCA81C'],
});
const aSeries = ref<any>([24, 63]);

const bOptions = ref<any>({
  chart: {
    id: 'dummyChart',
  },
  xaxis: {
    categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
  },
  colors: ['#FC7414', '#FCA81C'],
});
const bSeries = ref<any>([
  {
    name: 'Submissions',
    data: [19, 17, 22, 25, 8, 21, 18],
  },
]);

const cOptions = ref<any>({
  chart: {
    id: 'dummyChart2',
  },
  xaxis: {
    categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY'],
  },
  colors: ['#FC7414', '#FCA81C'],
});
const cSeries = ref<any>([
  {
    name: 'Lost',
    data: [4, 5, 3, 7, 6],
  },
]);
</script>
<template>
  <div class="flex items-center justify-between">
    <div class="space-y-1">
      <h3 class="text-2xl font-bold">Dashboard</h3>
      <p class="text-muted-foreground">
        Quick overview of your business performance
      </p>
    </div>
  </div>

  <div class="flex-1 space-y-4 pt-6">
    <div class="grid gap-4 py-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium"> Bids Won </CardTitle>
          <BarChart4 class="h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">30</div>
          <p class="text-xs text-muted-foreground">+180.1% from last year</p>
          <apexchart
            class="min-w-100 max-w-md:"
            type="bar"
            :options="bOptions"
            :series="bSeries"
          ></apexchart>
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium"> Bids Lost </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">12</div>
          <p class="text-xs text-muted-foreground">-19% from last month</p>
          <apexchart
            class="min-w-100 max-w-md:"
            type="area"
            :options="cOptions"
            :series="cSeries"
          ></apexchart>
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium"> Bids Submitted </CardTitle>
          <BellDot class="h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">120</div>
          <p class="text-xs text-muted-foreground">+20.1% from last year</p>
          <apexchart
            class="min-w-100 max-w-md:"
            type="radialBar"
            :options="aOptions"
            :series="aSeries"
          ></apexchart>
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          class="space-y- flex flex-row items-center justify-between pb-2"
        >
          <CardTitle class="text-sm font-medium"> Active Now </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">2</div>
          <p class="text-xs text-muted-foreground">+201 since last month</p>
          <apexchart
            class="min-w-100 max-w-md:"
            type="radialBar"
            :options="OchartOptions"
            :series="Oseries"
          ></apexchart>
        </CardContent>
      </Card>
    </div>
    <Tabs default-value="overview" class="space-y-4">
      <TabsContent value="overview" class="space-y-4">
        <div class="gap top-4 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Card class="col-span-3">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                Tender announcements by Organizations
              </CardDescription>
            </CardHeader>
            <CardContent class="">
              <Overview />
              <apexchart
                class="min-w-100 max-w-md:"
                type="line"
                :options="tenderCountChartOptions"
                :series="tenderCountSeries"
              ></apexchart>
            </CardContent>
          </Card>
          <Card class="col-span-3">
            <CardHeader>
              <CardTitle>Most Viewed</CardTitle>
              <CardDescription> Bids with most views </CardDescription>
            </CardHeader>
            <CardContent class="">
              <Overview />
              <apexchart
                class="min-w-50 max-w-sm:"
                type="bar"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>
