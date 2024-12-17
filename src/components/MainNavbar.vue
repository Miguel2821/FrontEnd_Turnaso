<template>
  <nav class="navbar">
    <div class="container">
      <!-- Logo a la izquierda -->
      <a href="/" class="logo">
        <i class="fas fa-leaf"></i> NutriFit
      </a>

      <!-- Menú hamburguesa (para móviles) -->
      <div class="hamburger" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </div>

      <!-- Enlaces Centrados -->
      <ul class="nav-links" :class="{ 'active': menuOpen }">
        <li><router-link to="/"><i class="fas fa-home"></i> Inicio</router-link></li>
        <li><router-link to="/services"><i class="fas fa-concierge-bell"></i> Servicios</router-link></li>
        <li><router-link to="/about"><i class="fas fa-users"></i> Sobre Nosotros</router-link></li>
        <li><router-link to="/contact"><i class="fas fa-envelope"></i> Contacto</router-link></li>
      </ul>

      <!-- Botón "Iniciar Sesión" o "Cerrar Sesión" a la derecha -->
      <router-link v-if="isLoggedIn" to="/" @click="logout" class="btn-login">
        <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
      </router-link>
      <router-link v-else to="/UserLogin" class="btn-login">
        <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MainNavbar',
  data() {
    return {
      isLoggedIn: false, // Estado para indicar si el usuario está logueado
      menuOpen: false, // Estado para manejar el menú hamburguesa
    };
  },
  created() {
    this.checkAuth(); // Comprueba el estado de autenticación al cargar el componente
  },
  watch: {
    // Observa cambios en la ruta y verifica autenticación
    $route() {
      this.checkAuth();
    },
  },
  methods: {
    checkAuth() {
      // Comprueba si el token existe en sessionStorage
      this.isLoggedIn = !!sessionStorage.getItem('authToken');
    },
    logout() {
      // Elimina el token de sessionStorage
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('user'); // Opcional: elimina los datos del usuario

      // Actualiza el estado
      this.checkAuth();

      // Redirige al usuario a la página de inicio
      this.$router.push('/');
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>

<style scoped>
/* Estilos de la barra de navegación */
.navbar {
  background-color: #006400; /* Color verde */
  padding: 1rem;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo i {
  margin-right: 0.5rem;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: auto;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-links li a:hover {
  text-decoration: underline;
}

.btn-login {
  background-color: white;
  color: #006400;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-login:hover {
  background-color: #004d00;
  color: white;
}

.btn-login i {
  font-size: 1.2rem;
}

/* Menú hamburguesa (para pantallas pequeñas) */
.hamburger {
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
}

.nav-links.active {
  display: block;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 80px;
    right: 0;
    background-color: #006400;
    width: 100%;
    text-align: center;
    padding: 1rem 0;
  }

  .nav-links.active {
    display: block;
  }

  .hamburger {
    display: block;
  }

  .nav-links li {
    padding: 1rem 0;
  }

  .logo {
    font-size: 1.6rem;
  }
}
</style>
