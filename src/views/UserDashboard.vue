<template>
    <div class="dashboard">
      <!-- Barra lateral -->
      <aside class="sidebar">
        <button
          v-for="(menuItem, index) in menu"
          :key="index"
          @click="navigate(menuItem.path)"
          :class="{ active: $route.path.includes(menuItem.path) }"
        >
        <i :class="menuItem.icon"></i> {{ menuItem.label }}
        </button>
      </aside>
  
      <!-- Contenido dinámico -->
      <main class="content">
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menu: [
        { label: 'Actualizar Datos', path: 'datos-personales', icon: 'fas fa-user-edit' },
        { label: 'Agendar Cita', path: 'appointment-schedule', icon: 'fas fa-calendar-check' },
        { label: 'Mis Atenciones', path: 'profile', icon: 'fas fa-stethoscope' },
        ],
      };
    },
    methods: {
      navigate(path) {
        this.$router.push(`/UserDashboard/${path}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    display: flex;
    height: 100vh;
  }
  .sidebar {
    width: 250px;
    background-color: #f4f4f4;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-right: 1px solid #ddd;
  }
  .sidebar button {
    padding: 10px;
    border: none;
    background: #fff;
    border: 1px solid #ddd;
    cursor: pointer;
    text-align: left;
  }
  .sidebar button.active {
    background: #1565c0;
    color: white;
  }
  .content {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
  }
  </style>
  