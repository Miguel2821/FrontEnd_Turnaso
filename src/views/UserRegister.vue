<template>
  <div class="registro-container">
    <h2>Crear Nueva Cuenta</h2>
    <form @submit.prevent="handleRegistro">
      <!-- Mostrar mensaje de error si existe algún problema -->
      <transition name="fade">
        <div v-if="showError" class="error-message">
          <i class="fas fa-exclamation-triangle"></i> {{ errorMessage }}
        </div>
      </transition>

      <!-- Mostrar mensaje de éxito -->
      <transition name="fade">
        <div v-if="registroExitoso" class="success-message">
          <i class="fas fa-check-circle"></i> ¡Cuenta registrada exitosamente! Redirigiendo al inicio de sesión...
        </div>
      </transition>
      <!-- Campos del formulario -->
      <div class="form-group">
        <label for="nombre"><i class="fas fa-user"></i> Nombre</label>
        <input type="text" v-model="nombre" id="nombre" required placeholder="Ingresa tu nombre" />
      </div>

      <div class="form-group">
        <label for="email"><i class="fas fa-envelope"></i> Correo Electrónico</label>
        <input type="email" v-model="email" id="email" required placeholder="Ingresa tu correo electrónico" />
      </div>

      <div class="form-group">
        <label for="password"><i class="fas fa-lock"></i> Contraseña</label>
        <input type="password" v-model="password" id="password" required placeholder="Crea una contraseña" />
      </div>

      <div class="form-group">
        <label for="password_confirmation"><i class="fas fa-lock"></i> Confirmar Contraseña</label>
        <input type="password" v-model="password_confirmation" id="password_confirmation" required placeholder="Confirma tu contraseña" />
      </div>
      <!-- Botón para enviar el formulario -->
      <button type="submit">
        <i class="fas fa-user-check"></i> Registrarse
      </button>
      <!-- Enlace para redirigir al inicio de sesión si ya tiene una cuenta -->
      <div class="registro-footer">
        <h5>
          ¿Ya tienes cuenta? <RouterLink to="/UserLogin">Inicia Sesión</RouterLink>
        </h5>
      </div>
    </form>
  </div>
</template>

<script>
import apiService from '../services/apiService'; // Asegúrate de que esta ruta es correcta
import Swal from 'sweetalert2';

export default {
  name: 'RegistroUsuario',
  data() {
    return {
      nombre: '',
      email: '',
      password: '',
      password_confirmation: '',
    };
  },
  methods: {
    async handleRegistro() {
      console.log('Iniciando el registro de usuario...');

      // Validación de nombre
      const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      if (!nombreRegex.test(this.nombre)) {
        Swal.fire({
          title: 'Error',
          text: 'El nombre solo debe contener letras y espacios.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return;
      }

      // Validación de campos vacíos
      if (
        this.nombre === '' ||
        this.email === '' ||
        this.password === '' ||
        this.password_confirmation === ''
      ) {
        Swal.fire({
          title: 'Error',
          text: 'Por favor, completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return;
      }

      // Validación de contraseñas coincidentes
      if (this.password !== this.password_confirmation) {
        Swal.fire({
          title: 'Error',
          text: 'Las contraseñas no coinciden.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return;
      }

      try {
        console.log('Enviando datos al backend para crear el usuario...', {
          nombre: this.nombre,
          email: this.email,
          password: this.password,
        });

        // Realizamos la petición al backend para crear el usuario
        const response = await apiService.post('/user', {
          nombre: this.nombre,
          email: this.email,
          password: this.password,
        });

        console.log('Respuesta del backend recibida:', response);

        // Mostrar mensaje de éxito con SweetAlert2
        Swal.fire({
          title: '¡Registro exitoso!',
          text: 'El usuario se ha registrado correctamente. Redirigiendo al inicio de sesión...',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });

        // Limpiar el formulario
        this.limpiarFormulario();

        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          console.log('Redirigiendo al login...');
          this.$router.push('/UserLogin');
        }, 2000);
      } catch (error) {
        console.log('Error recibido durante el registro:', error);

        // Mostrar mensaje de error con SweetAlert2
        if (error.response && error.response.status === 422) {
          Swal.fire({
            title: 'Error de validación',
            text: Object.values(error.response.data).join(', '),
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          console.log('Error de validación:', error.response.data);
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error en el registro. Intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          console.log('Error general:', error);
        }
      }
    },
    limpiarFormulario() {
      console.log('Limpiando el formulario...');
      this.nombre = '';
      this.email = '';
      this.password = '';
      this.password_confirmation = ''; // Limpiar el campo de confirmación de contraseña también
    },
  },
};
</script>



<style scoped>
/* Estilos del formulario de registro */
.registro-container {
  max-width: 500px;
  margin: 100px auto;
  padding: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #218838;
}

button i {
  margin-right: 5px;
}

.error-message {
  color: red;
  margin-bottom: 15px;
  font-size: 14px;
  text-align: center;
}

.success-message {
  color: green;
  margin-bottom: 15px;
  font-size: 14px;
  text-align: center;
}

.registro-footer {
  margin-top: 20px;
}

.registro-footer a {
  color: green;
  cursor: pointer;
}

.registro-footer a:hover {
  text-decoration: underline;
}

.registro-footer h5{
  font-size: 1em;
}

/* Responsividad */
@media (max-width: 480px) {
  .registro-container {
    padding: 20px;
  }

  h2 {
    font-size: 20px;
  }

  button {
    font-size: 14px;
  }
}
</style>