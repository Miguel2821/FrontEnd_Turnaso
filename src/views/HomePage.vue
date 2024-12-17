<template>
  <!-- Sección hero para resaltar la acción de agendar una cita -->
  <section class="hero">
    <div class="hero-content">
      <h1>Agenda tu Cita con un Nutricionista Profesional</h1>
      <p>Empieza tu camino hacia una vida más saludable</p>
      <!-- Botón para redirigir a la página de inicio de sesión -->
      <router-link to="/UserLogin" class="btn-primary">
        <i class="fas fa-calendar-check"></i> Reservar Cita
      </router-link>
    </div>
  </section>

  <!-- Sección de servicios ofrecidos por la clínica o empresa -->
  <section class="services">
    <h2>Nuestros Servicios</h2>
    <div class="service-cards">
      <div class="card">
        <i class="fas fa-user-md"></i>
        <h3>Consultas Nutricionales</h3>
        <p>Consulta personalizada para mejorar tu salud y nutrición.</p>
      </div>
      <div class="card">
        <i class="fas fa-apple-alt"></i>
        <h3>Planes de Dieta</h3>
        <p>Planificación de dietas a medida según tus necesidades.</p>
      </div>
      <div class="card">
        <i class="fas fa-sync-alt"></i>
        <h3>Seguimiento</h3>
        <p>Revisión y seguimiento regular para asegurar tus progresos.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
/* Sección hero */
.hero {
  background-color: #f4f9f4; /* Fondo claro */
  text-align: center;
  padding: 4rem 0;
}

.hero-content h1 {
  font-size: 2.5rem;
  color: #006400; /* Verde oscuro */
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 2rem;
}

.btn-primary {
  background-color: #006400;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary:hover {
  background-color: #004d00;
}

.btn-primary i {
  font-size: 1.4rem;
}

/* Sección servicios */
.services {
  background-color: #f4f9f4; /* Fondo claro igual al de la hero */
  padding: 3rem 0;
  text-align: center;
}

.services h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #006400;
}

.service-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card i {
  font-size: 2.5rem;
  color: #006400;
  margin-bottom: 1rem;
}

.card h3 {
  font-size: 1.5rem;
  color: #006400;
  margin-bottom: 1rem;
}

.card p {
  color: #333;
  font-size: 1rem;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .service-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-content p {
    font-size: 1rem;
  }

  .btn-primary {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }

  .card {
    max-width: 100%;
  }
}
</style>
