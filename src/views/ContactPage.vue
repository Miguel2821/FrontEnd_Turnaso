<template>
    <section class="contact">
      <h1>Contáctanos</h1>
      <p>Nos encantaría saber de ti. Llena el siguiente formulario o contáctanos por nuestras redes sociales.</p>
      <!-- Formulario de contacto con nombre, correo electrónico y mensaje -->
      <form class="contact-form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="message">Mensaje</label>
          <textarea id="message" v-model="message" required></textarea>
        </div>
        <button type="submit" class="btn-submit">Enviar</button>
      </form>
      <!-- Información de contacto adicional como dirección, teléfono y correo -->
      <div class="contact-info">
        <p><strong>Dirección:</strong> Calle Falsa 123, Ciudad, País</p>
        <p><strong>Teléfono:</strong> +1 234 567 890</p>
        <p><strong>Email:</strong> contacto@nutrifit.com</p>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ContactPage',
    data() {
      return {
        name: '',  // Variable para almacenar el nombre ingresado
        email: '',  // Variable para almacenar el correo electrónico ingresado
        message: ''  // Variable para almacenar el mensaje ingresado
      }
    },
    methods: {
      // Método que se ejecuta cuando el formulario es enviado
      submitForm() {
        alert(`Mensaje enviado por ${this.name}`);
      }
    }
  }
  </script>
  
  <style scoped>
  .contact {
    background-color: #f4f9f4;
    text-align: center;
    padding: 4rem 2rem;
  }
  
  .contact h1 {
    font-size: 2.5rem;
    color: #006400;
  }
  
  .contact p {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 3rem;
  }
  
  .contact-form {
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    padding: 4rem;
    border-radius: 30px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  textarea {
    resize: vertical;
    height: 150px;
  }
  
  .btn-submit {
    background-color: #006400;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .btn-submit:hover {
    background-color: #004d00;
  }
  
  .contact-info {
    margin-top: 3rem;
  }
  </style>
  