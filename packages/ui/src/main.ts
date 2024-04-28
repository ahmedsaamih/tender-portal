import { createApp } from 'vue';
import { createPinia } from 'pinia';
// eslint-disable-next-line
// @ts-ignore
import VueApexCharts from "vue3-apexcharts";

import '@/assets/main.css';
import router from '@/router';
import App from '@/App.vue';


const app = createApp(App);

app.provide('$appName', import.meta.env.VITE_APP_NAME);
app.use(VueApexCharts);
app.use(createPinia());
app.use(router);

app.mount('#app');
