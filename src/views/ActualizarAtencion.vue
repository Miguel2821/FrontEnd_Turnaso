<template>
    <div class="login-container">
      <h2 class="text-center mb-4 titulo">Actualizar Atención</h2>
      <form @submit.prevent="actualizarAtencion" class="formulario">
        <!-- Campo de Altura -->
        <div class="form-group">
          <label for="altura">Altura (cm):</label>
          <input
            v-model="atencion.altura"
            type="number"
            id="altura"
            step="0.1"
            class="form-control"
            required
          />
        </div>
  
        <!-- Campo de Peso -->
        <div class="form-group">
          <label for="peso">Peso (kg):</label>
          <input
            v-model="atencion.peso"
            type="number"
            id="peso"
            step="0.1"
            class="form-control"
            required
          />
        </div>
  
        <!-- Campo de Cintura -->
        <div class="form-group">
          <label for="cintura">Cintura (cm):</label>
          <input
            v-model="atencion.cintura"
            type="number"
            id="cintura"
            step="0.1"
            class="form-control"
            required
          />
        </div>
  
        <!-- Campo de Cadera -->
        <div class="form-group">
          <label for="cadera">Cadera (cm):</label>
          <input
            v-model="atencion.cadera"
            type="number"
            id="cadera"
            step="0.1"
            class="form-control"
            required
          />
        </div>
  
        <!-- Campo de Observación -->
        <div class="form-group">
          <label for="observacion">Observación:</label>
          <textarea
            v-model="atencion.observacion"
            id="observacion"
            class="form-control"
            rows="4"
          ></textarea>
        </div>
  
        <!-- Botones -->
        <div class="form-group">
          <button type="submit" class="btn btn-success">Guardar Cambios</button>
          <button type="button" class="btn btn-secondary ml-2" @click="cancelar">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
import apiService from "@/services/apiService";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      atencion: {
        altura: "",
        peso: "",
        cintura: "",
        cadera: "",
        observacion: "",
      },
    };
  },
  async created() {
    try {
      const atencionId = this.$route.params.id; // Obtener el ID desde la ruta
      console.log("ID de atención recibido:", atencionId);

      // Llamar al backend para obtener los datos de la atención
      const response = await apiService.obtenerAtencionPorId(atencionId);
      console.log("Datos de la atención obtenidos:", response.data);

      // Asignar los datos al formulario
      this.atencion = response.data;
      Swal.fire({
        title: "¡Datos cargados!",
        text: "Los datos de la atención se han cargado correctamente.",
        icon: "info",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error al cargar los datos de la atención:", error.response);
      const mensajeError = error.response?.data?.message || "Error desconocido";
      Swal.fire({
        title: "Error",
        text: `Error al cargar los datos de la atención: ${mensajeError}`,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  },
  methods: {
    async actualizarAtencion() {
      try {
        const atencionId = this.$route.params.id; // Obtener el ID desde la ruta

        // Llamar al backend para actualizar la atención
        const response = await apiService.actualizarAtencion(atencionId, this.atencion);
        console.log("Atención actualizada:", response.data);

        Swal.fire({
          title: "¡Éxito!",
          text: "Atención actualizada con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          this.$router.push({ name: "NutricionistaDashboard" }); // Redirigir después de actualizar
        });
      } catch (error) {
        console.error("Error al actualizar la atención:", error.response);
        const mensajeError = error.response?.data?.message || "Error desconocido";
        Swal.fire({
          title: "Error",
          text: `Error al actualizar la atención: ${mensajeError}`,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    },
    cancelar() {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas cancelar y volver al dashboard? Los cambios no guardados se perderán.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, cancelar",
        cancelButtonText: "Continuar editando",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ name: "NutricionistaDashboard" }); // Redirigir al cancelar
        }
      });
    },
  },
};
</script>

  
  <style scoped>
  .login-container {
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 0 auto;
    font-family: 'Arial', sans-serif;
  }
  
  .titulo {
    color: #333333;
    font-weight: 600;
    font-size: 1.5rem;
  }
  
  .formulario {
    margin-top: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .form-control {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .btn {
    padding: 0.6rem 1.2rem;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .btn-success {
    background-color: #28a745;
    color: #fff;
    border: none;
  }
  
  .btn-success:hover {
    background-color: #218838;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: #fff;
    border: none;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
  }
  
  .ml-2 {
    margin-left: 0.5rem;
  }
  </style>
  