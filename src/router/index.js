import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import Register from '../views/UserRegister.vue';
import Login from '../views/UserLogin.vue';
import AppointmentSchedule from '../views/AppointmentSchedule.vue';
import ServicesPage from '../views/ServicesPage.vue';
import AboutUsPage from '../views/AboutUsPage.vue';
import ContactPage from '../views/ContactPage.vue';
import UserDashboard from '../views/UserDashboard.vue';
import DatosPersonales from '../views/DatosPersonales.vue';
import UserProfile from '../views/UserProfile.vue';
import AdminDashboard from '../views/AdminDashboard.vue'; // Vista de admin
import NutricionistaDashboard from '../views/NutricionistaDashboard.vue';
import GenerarAtencion from '@/views/GenerarAtencion.vue'; // Vista de nutricionista
import VerAtencion from '@/views/VerAtencion.vue';
import ActualizarAtencion from "@/views/ActualizarAtencion.vue";

const routes = [
  { path: '/', name: 'HomePage', component: Home },
  { path: '/UserRegister', name: 'Register', component: Register },
  { path: '/UserLogin', name: 'Login', component: Login },
  { path: '/AppointmentSchedule', name: 'Schedule', component: AppointmentSchedule },
  { path: '/DatosPersonales', name: 'DatosPersonales', component: DatosPersonales },
  { path: '/services', name: 'Services', component: ServicesPage },
  { path: '/about', name: 'About', component: AboutUsPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
  
  // Ruta protegida para el panel de usuario (Paciente)
  {
    path: '/UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true },
    children: [
      { path: 'datos-personales', name: 'DatosPersonales', component: DatosPersonales },
      { path: 'appointment-schedule', name: 'AppointmentSchedule', component: AppointmentSchedule },
      { path: 'profile', name: 'UserProfile', component: UserProfile },
    ],
  },

  // Rutas para los paneles de Admin y Nutricionista
  {
    path: '/AdminDashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 1 }, // Solo accesible para Admin (rol_id = 1)
  },
  {
    path: '/NutricionistaDashboard',
    name: 'NutricionistaDashboard',
    component: NutricionistaDashboard,
    meta: { requiresAuth: true, role: 2 }, // Solo accesible para Nutricionistas (rol_id = 2)
  },
  {
    path: '/GenerarAtencion/:turnoId',
    name: 'GenerarAtencion',
    component: GenerarAtencion,
    meta: { requiresAuth: true, role: 2 }, // Solo accesible para Nutricionistas (rol_id = 2)
  },
  {
    path: "/ver-atencion/:atencionId",
    name: "VerAtencion",
    component: VerAtencion,
    props: true
  },

  {
    path: "/atenciones/:id/editar",
    name: "ActualizarAtencion",
    component: ActualizarAtencion,
  },


  // Redirección por defecto
  { path: '/:pathMatch(.*)*', redirect: '/' },

  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Guardia global para proteger rutas y verificar el rol
router.beforeEach((to, from, next) => {
  const loggedIn = sessionStorage.getItem('authToken'); // Verifica si el usuario está autenticado
  const user = JSON.parse(sessionStorage.getItem('user')); // Obtiene el usuario y su rol desde sessionStorage

  if (to.meta.requiresAuth && !loggedIn) {
    next('/UserLogin'); // Redirige al login si no está autenticado
  } else if (to.meta.role && user && user.rol_id !== to.meta.role) {
    // Si el rol no coincide con el requerido para acceder a la ruta
    next('/'); // Redirige al home o a cualquier página predeterminada
  } else {
    next(); // Continúa la navegación si todo está bien
  }
});

export default router;
