<template>
    <section class="services">
      <h1>Nuestros Servicios</h1>
      <p>Ofrecemos una amplia variedad de servicios nutricionales para mejorar tu salud.</p>
      <!-- Tarjeta para Consultas Nutricionales -->
      <div class="service-cards">
        <div class="card">
          <img src="../assets/1.jpg" alt="Consulta Nutricional" />
          <h3>Consultas Nutricionales</h3>
          <p>Consulta personalizada para mejorar tu salud y nutrición.</p>
        </div>
        <!-- Tarjeta para Planes de Dieta -->
        <div class="card">
          <img src="../assets/2.jpg" alt="Planes de Dieta" />
          <h3>Planes de Dieta</h3>
          <p>Planificación de dietas a medida según tus necesidades.</p>
        </div>
        <!-- Tarjeta para Seguimiento Nutricional -->
        <div class="card">
          <img src="../assets/3.jpg" alt="Seguimiento Nutricional" />
          <h3>Seguimiento Nutricional</h3>
          <p>Revisión y seguimiento regular para asegurar tus progresos.</p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ServicesPage',
  }
  </script>
  
  <style scoped>
  .services {
    background-color: #f4f9f4;
    text-align: center;
    padding: 4rem 2rem;
  }
  
  .services h1 {
    font-size: 2.5rem;
    color: #006400;
  }
  
  .services p {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 3rem;
  }
  
  .service-cards {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
  
  .card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    text-align: center;
    padding: 1.5rem;
  }
  
  .card img {
    width: 100%;
    height: 200px; /* Altura fija para que todas sean iguales */
    object-fit: cover; 
    border-radius: 10px;
  }
  
  .card h3 {
    font-size: 1.5rem;
    color: #006400;
    margin: 1rem 0;
  }
  
  .card p {
    color: #333;
  }
  </style>
  