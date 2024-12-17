<template>
  <div id="app">
    <!-- Navbar -->
    <MainNavbar />

    <!-- Vistas dinámicas -->
    <div class="content">
      <router-view />
    </div>

    <!-- Footer fijo abajo -->
    <AppFooter />
  </div>
</template>

<script>
import MainNavbar from './components/MainNavbar.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    MainNavbar,
    AppFooter
  }
}
</script>

<style>
/* Usamos flexbox para que el contenido crezca y empuje el footer hacia abajo */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* El contenido llenará todo el espacio disponible */
.content {
  flex: 1;
}

/* Ajustes del body para remover espacios extra */
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background-color: #f4f4f9;
  color: #333;
}
</style>
