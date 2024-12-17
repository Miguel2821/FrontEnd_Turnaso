<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <!-- Mensaje de error -->
      <transition name="fade">
        <div v-if="showError" class="error-message">
          <i class="fas fa-exclamation-triangle"></i> {{ errorMessage }}
        </div>
      </transition>

      <!-- Mostrar mensaje de éxito -->
      <transition name="fade">
        <div v-if="showSuccess" class="success-message">
          <i class="fas fa-check-circle"></i> Inicio de sesión exitoso. Redirigiendo...
        </div>
      </transition>

      <!-- Campo de correo electrónico -->
      <div class="form-group">
        <label for="email"><i class="fas fa-envelope"></i> Correo Electrónico</label>
        <input type="email" v-model="email" id="email" required placeholder="Ingresa tu correo electrónico" />
      </div>

      <!-- Campo de contraseña -->
      <div class="form-group">
        <label for="password"><i class="fas fa-lock"></i> Contraseña</label>
        <input type="password" v-model="password" id="password" required placeholder="Ingresa tu contraseña" />
      </div>

      <!-- Botón para enviar el formulario -->
      <button type="submit">
        <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
      </button>

      <!-- Enlace para registrarse si no se tiene una cuenta -->
      <div class="login-footer">
        <h5>¿No tienes cuenta? <RouterLink to="/UserRegister">Crear Cuenta</RouterLink></h5>
      </div>
    </form>
  </div>
</template>


<script>
import apiService from '../services/apiService'; // Importar el servicio de la API
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      email: '', // Email del usuario
      password: '', // Contraseña del usuario
    };
  },
  methods: {
    async handleLogin() {
      try {
        // Realizamos la solicitud de inicio de sesión al backend
        const response = await apiService.post('/login', {
          email: this.email,
          password: this.password,
        });

        // Obtenemos el token y el rol del usuario desde la respuesta
        const token = response.data.token;
        const user = response.data.user;
        const rolId = user.rol_id;

        // Guardamos el token y el rol del usuario en sessionStorage
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('user', JSON.stringify(user));

        // Mostrar mensaje de éxito con SweetAlert2
        Swal.fire({
          title: '¡Inicio de sesión exitoso!',
          text: 'Redirigiendo al dashboard...',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        // Redirigir según el rol del usuario después de 1.5 segundos
        setTimeout(() => {
          if (rolId === 1) {
            // Administrador
            this.$router.push('/AdminDashboard');
          } else if (rolId === 2) {
            // Nutricionista
            this.$router.push('/NutricionistaDashboard');
          } else {
            // Paciente (por defecto)
            this.$router.push('/UserDashboard');
          }
        }, 1500);

      } catch (error) {
        // Manejar errores de inicio de sesión con SweetAlert2
        Swal.fire({
          title: 'Error',
          text: 'Error al iniciar sesión. Verifica tus credenciales.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        console.error('Error al iniciar sesión:', error);
      }
    },
  },
};
</script>


<style scoped>
.login-container {
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
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group label i {
  margin-right: 8px;
  color: #555; /* Color gris */
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

.login-footer {
  margin-top: 20px;
}

.login-footer a {
  color: green;
  cursor: pointer;
}

.login-footer a:hover {
  text-decoration: underline;
}

.login-footer h5 {
  font-size: 1em;
}

/* Responsividad */
@media (max-width: 480px) {
  .login-container {
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
