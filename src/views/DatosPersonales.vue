<template>
  <div class="update-container">
    <h2>Actualizar Datos Personales</h2>
    <form @submit.prevent="updateDatos">
      <div class="form-group">
        <label for="ci"><i class="fas fa-id-card"></i> CI:</label>
        <input v-model="datosPersonales.ci" id="ci" placeholder="Ingrese su CI" />
        <div v-if="errors.ci" class="error">{{ errors.ci }}</div> <!-- Mensaje de error para CI -->
      </div>
      <!-- Teléfono del usuario -->
      <div class="form-group">
        <label for="telefono"><i class="fas fa-phone-alt"></i> Teléfono:</label>
        <input v-model="datosPersonales.telefono" id="telefono" placeholder="Ingrese su teléfono" />
        <div v-if="errors.telefono" class="error">{{ errors.telefono }}</div> <!-- Mensaje de error para Teléfono -->
      </div>
      <!-- Fecha de nacimiento del usuario -->
      <div class="form-group">
        <label for="fecha_nacimiento"><i class="fas fa-birthday-cake"></i> Fecha de Nacimiento:</label>
        <input type="date" v-model="datosPersonales.fecha_nacimiento" id="fecha_nacimiento" />
      </div>
      <!-- Ciudad del usuario -->
      <div class="form-group">
        <label for="ciudad"><i class="fas fa-map-marker-alt"></i> Ciudad:</label>
        <input v-model="datosPersonales.ciudad" id="ciudad" placeholder="Ingrese su ciudad" />
      </div>
      <!-- Sexo del usuario -->
      <div class="form-group">
        <label for="sexo"><i class="fas fa-venus-mars"></i> Sexo:</label>
        <select v-model="datosPersonales.sexo" id="sexo">
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      </div>
      <!-- Botón para enviar el formulario -->
      <button type="submit">Actualizar</button>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import apiService from '../services/apiService'; // Importar el apiService
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      datosPersonales: {
        ci: '',
        telefono: '',
        fecha_nacimiento: '',
        ciudad: '',
        sexo: '',
      },
      errors: {
        ci: '',
        telefono: '',
      },
    };
  },
  methods: {
    validateForm() {
      this.errors = {
        ci: '',
        telefono: '',
      };

      const ciRegex = /^[0-9]{10,}$/; // Validar solo números y que tenga al menos 10 dígitos
      const telefonoRegex = /^[0-9]{10,}$/; // Validar solo números y que tenga al menos 10 dígitos

      let isValid = true;

      // Validar CI
      if (!this.datosPersonales.ci.match(ciRegex)) {
        this.errors.ci = 'La Cédula de Identidad debe ser un número entero de 10 dígitos.';
        isValid = false;
      }

      // Validar Teléfono
      if (!this.datosPersonales.telefono.match(telefonoRegex)) {
        this.errors.telefono = 'El número de teléfono debe ser un número de al menos 10 dígitos.';
        isValid = false;
      }

      if (!isValid) {
        Swal.fire({
          title: 'Error de validación',
          text: Object.values(this.errors).join(' | '),
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }

      return isValid;
    },
    async updateDatos() {
      // Validar antes de enviar el formulario
      if (!this.validateForm()) {
        return; // No continuar si hay errores
      }

      try {
        await apiService.updateDatosPersonales(this.datosPersonales); // Eliminamos 'const response'

        // Mostrar mensaje de éxito con SweetAlert2
        Swal.fire({
          title: '¡Éxito!',
          text: 'Datos personales actualizados con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } catch (err) {
        // Mostrar mensaje de error con SweetAlert2
        Swal.fire({
          title: 'Error',
          text: 'Error al actualizar los datos personales.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    },
  },
  async mounted() {
    // Obtener los datos personales cuando el componente se monta
    try {
      const response = await apiService.getDatosPersonales();
      this.datosPersonales = response.data;
    } catch (err) {
      // Mostrar error al cargar los datos personales
      Swal.fire({
        title: 'Error',
        text: 'Error al cargar los datos personales.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  },
};
</script>


<style scoped>
.update-container {
  max-width: 500px;
  margin: auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  transition: box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  box-shadow: 0px 2px 10px rgba(0, 123, 255, 0.5);
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #218838;
}

.success-message,
.error {
  margin-top: 20px;
  font-size: 14px;
  padding: 10px;
  border-radius: 6px;
  text-align: center;
}

.success-message {
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
}

.error {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .update-container {
    padding: 20px;
    margin: 50px auto;
  }
  .form-group input,
  .form-group select {
    padding: 10px;
  }
  button {
    padding: 12px;
  }
}
</style>
