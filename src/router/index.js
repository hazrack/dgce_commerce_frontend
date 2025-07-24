import { createRouter, createWebHistory } from 'vue-router';
import {store} from '../store';

import DasboardPage from '../views/backoffice/DasboardPage.vue';
import Login from '../views/backoffice/Login.vue';
import HomePage from '../views/frontoffice/HomePage.vue';
import AccordComPage from '../views/frontoffice/AccordComPage.vue';
import FluxComPage from '../views/frontoffice/FluxComPage.vue';
import AdminAccordComPage from '../views/backoffice/AdminAccordComPage.vue';
import AdminEchangePage from '../views/backoffice/AdminEchangePage.vue';
import AdminOrganisationPage from '../views/backoffice/adminOrganisationPage.vue';
import AdminProduitListPage from '../views/backoffice/adminProduitListPage.vue';
import AdminOmcPage from '../views/backoffice/adminOmcPage.vue';
import AdminProduitRankingPage from '../views/backoffice/AdminProduitRankingPage.vue';
import AdminUserPage from '../views/backoffice/adminUserPage.vue';
import ContactPage from '@/views/frontoffice/ContactPage.vue';

const routes = [
  { path: '/', redirect: '/accueil', meta: { guest: true } },
  { path: '/accueil', component: HomePage, name: 'Inscription', meta: { title: 'Accueil', guest: true } },
  { path: '/login', component: Login, name: 'Login', meta: { title: 'Page de connexion', guest: true } },
  { path: '/administration/dashboard', component: DasboardPage, name: 'dashboard', meta: { title: 'Tableau de bord', requiresAuth: true } },
  { path: '/administration/accord', component: AdminAccordComPage, name: 'admin-accord', meta: { title: 'Accord Commerciaux', requiresAuth: true } },
  { path: '/administration/echanges', component: AdminEchangePage, name: 'admin-echanges', meta: { title: 'Flux Echanges Commerciaux', requiresAuth: true } },
  { path: '/administration/products-ranking', component: AdminProduitRankingPage, name: 'Rang Produits Echangés', meta: { title: 'Nos Produits echangé', requiresAuth: true } },
  { path: '/administration/organisation', component: AdminOrganisationPage, name: 'Organisation', meta: { title: 'Les Organisations', requiresAuth: true } },
  { path: '/administration/list-produits', component: AdminProduitListPage, name: 'Espaces Produits', meta: { title: 'Liste de nos produits', requiresAuth: true } },
  { path: '/administration/etat-membres', component: AdminOmcPage, name: 'OMC', meta: { title: 'ORGANISATION MONDIALE DU COMMERCE', requiresAuth: true } },
  { path: '/administration/utilisateurs', component: AdminUserPage, name: 'user-page', meta: { title: 'Espace Utilisateur', requiresAuth: true } },
  { path: '/accord-commercial', component: AccordComPage, name: 'Accord Commercial', meta: { title: 'Commerciaux', guest: true } },
  { path: '/flux-commercial', component: FluxComPage, name: 'Flux Commercial', meta: { title: 'Flux Commerciaul', guest: true } },
  { path: '/contact', component: ContactPage, name: 'Contact', meta: { title: 'Nous Contacter', guest: true } },
  { path: '/:pathMatch(.*)*', redirect: '/accueil', meta: { guest: true } }, // remplace path: '*'
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || process.env.BASE_URL), // support Vite ou Webpack
  routes,
});

// Navigation guards
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'DGE Commerce'}`;

  const isAuthenticated = store.state.userLogStatus;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/accueil');
  } else if (to.meta.guest && isAuthenticated) {
    next('/administration/dashboard');
  } else {
    next();
  }
});

export default router;
