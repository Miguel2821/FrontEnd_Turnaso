<template>
  <!-- Sección principal "Sobre Nosotros" -->
    <section class="about-us">
      <h1>Sobre Nosotros</h1>
      <p>En NutriFit, nuestra misión es mejorar la calidad de vida de nuestros clientes mediante una alimentación saludable.</p>

      <!-- Sección que describe la misión y visión de la empresa -->
      <div class="about-content">
        <div class="mission">
          <img src="../assets/4.jpg" alt="Misión NutriFit" />
          <h3>Nuestra Misión</h3>
          <p>Ayudar a nuestros clientes a alcanzar un estado óptimo de salud a través de una nutrición equilibrada.</p>
        </div>
        
        <div class="vision">
          <img src="../assets/5.jpg" alt="Visión NutriFit" />
          <h3>Nuestra Visión</h3>
          <p>Ser un referente en el campo de la nutrición a nivel nacional, promoviendo hábitos saludables en todas las comunidades.</p>
        </div>
      </div>
      <!-- Sección que presenta a los miembros del equipo -->
      <div class="team">
        <h2>Conoce a Nuestro Equipo</h2>
        <div class="team-members">
          <div class="member">
            <img src="../assets/doctor.jpg" alt="Miembro del equipo" />
            <h3>Dr. Juan Pérez</h3>
            <p>Nutricionista especializado en dietas personalizadas.</p>
          </div>
          <div class="member">
            <img src="../assets/doctora.jpg" alt="Miembro del equipo" />
            <h3>Dra. Ana Gómez</h3>
            <p>Especialista en nutrición deportiva.</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  // Exportación del componente "AboutUsPage" que renderiza la página "Sobre Nosotros"
  export default {
    name: 'AboutUsPage',
  }
  </script>
  
  <style scoped>
  .about-us {
    background-color: #f4f9f4;
    text-align: center;
    padding: 4rem 2rem;
  }
  
  .about-us h1 {
    font-size: 2.5rem;
    color: #006400;
    margin-bottom: 2rem;
  }
  
  .about-content {
    display: flex;
    justify-content: center;
    gap: 3rem;
    
  }
  
  .about-content div {
    max-width: 300px;
    text-align: center;
  }
  
  .about-content img {
    width: 100%;
    height: 200px; /* Altura fija para que todas sean iguales */
    object-fit: cover; 
    border-radius: 20px;

  }
  
  .team {
    margin-top: 4rem;
  }
  
  .team h2 {
    font-size: 2rem;
    color: #006400;
    margin-bottom: 2rem;
  }
  
  .team-members {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
  
  .member {
    text-align: center;
  }
  
  .member img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  
  .member h3 {
    font-size: 1.5rem;
    color: #006400;
    margin: 1rem 0 0.5rem;
  }
  </style>
  