import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('@/views/IndexView.vue'),
        },
        {
          path: '/listings',
          name: 'listings',
          component: () => import('@/views/ListingsView.vue'),
        },
        {
          path: '/listings/:id',
          name: 'listings-detail',
          component: () => import('@/views/ListingsDetailView.vue'),
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('@/views/Contact.vue'),
        },
        {
          path: '/privacy-policy',
          name: 'privacy-policy',
          component: () => import('@/views/privacy-policy.vue'),
        },
        {
          path: '/my',
          component: () => import('@/layouts/MyLayout.vue'),
          children: [
            {
              path: '',
              name: 'dashbord',
              component: () => import('@/views/My/Dashboard.vue'),
            },
            {
              path: '/my/tenders',
              name: 'my-tenders',
              component: () => import('@/views/My/Tenders.vue'),
            },
            {
              path: '/my/organizations',
              name: 'Organizations',
              component: () => import('@/views/My/Organizations.vue'),
            },
            {
              path: '/my/vendors',
              name: 'Vendors',
              component: () => import('@/views/My/Vendors.vue'),
            },
            {
              path: '/my/Profile',
              name: 'Profile',
              component: () => import('@/views/My/Profile.vue'),
            },
            {
              path: '/my/Users',
              name: 'Users',
              component: () => import('@/views/My/Users.vue'),
            },
            {
              path: '/my/Submissions',
              name: 'Submissions',
              component: () => import('@/views/My/Submissions.vue'),
            },
          ],
        },
      ],
    },

    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('@/views/SignInView.vue'),
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/views/SignUpView.vue'),
    },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
});

export default router;
