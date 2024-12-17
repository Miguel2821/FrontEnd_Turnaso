<!-- src/components/Footer.vue -->

<template>
  <!-- El footer de la aplicación, que contiene la información de derechos reservados y enlaces a redes sociales -->
  <footer class="footer">
    <div class="container">
      <div class="footer-logo">
        <a href="/">© 2024 NutriFit. Todos los derechos reservados.</a>
      </div>
      <div class="footer-social">
        <a href="#">Facebook</a>
        <span>|</span>
        <a href="#">Instagram</a>
      </div>
    </div>
  </footer>
</template>

<script>
// Exportación del componente Footer
// Este componente es sencillo y no requiere funcionalidades dinámicas por ahora
export default {
  name: 'AppFooter',
}
</script>

<style scoped>
.footer {
  background-color: #006400; /* Fondo verde oscuro */
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer-logo a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  margin-bottom: 1rem;
}

.footer-social a {
  color: white;
  margin: 0 0.5rem;
  text-decoration: none;
}

.footer-social span {
  color: white;
}
</style>



