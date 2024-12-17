<template>
  <div class="update-container">
    <h2 class="text-center mb-4">Generar Atención</h2>

    <!-- Mensaje dinámico -->
    <div v-if="mensaje" :class="mensajeClase" class="mensaje">
      {{ mensaje }}
    </div>

    <!-- Contenedor principal dividido en dos columnas -->
    <div class="flex-container">
      <!-- Lado izquierdo: Información del turno -->
      <div class="left-column">
        <div class="info-group" v-if="turno">
          <p><strong>Paciente:</strong> {{ turno.Paciente.nombre }}</p>
          <p><strong>Fecha:</strong> {{ turno.fecha }}</p>
          <p><strong>Hora:</strong> {{ turno.hora }}</p>
        </div>
        <div v-else class="info-group">
          <p>Cargando información del turno...</p>
        </div>
      </div>

      <!-- Lado derecho: Formulario con estilo personalizado -->
      <div class="right-column styled-form">
        <form @submit.prevent="crearAtencion">
          <!-- Altura -->
          <div class="form-group">
            <label for="altura">Altura (cm):</label>
            <input
              type="number"
              id="altura"
              v-model="atencion.altura"
              class="form-control"
              required
            />
          </div>

          <!-- Peso -->
          <div class="form-group">
            <label for="peso">Peso (kg):</label>
            <input
              type="number"
              id="peso"
              v-model="atencion.peso"
              class="form-control"
              required
            />
          </div>

          <!-- Cintura -->
          <div class="form-group">
            <label for="cintura">Cintura (cm):</label>
            <input
              type="number"
              id="cintura"
              v-model="atencion.cintura"
              class="form-control"
              required
            />
          </div>

          <!-- Cadera -->
          <div class="form-group">
            <label for="cadera">Cadera (cm):</label>
            <input
              type="number"
              id="cadera"
              v-model="atencion.cadera"
              class="form-control"
              required
            />
          </div>

          <!-- Circunferencia de Muñeca -->
          <div class="form-group">
            <label for="circunferencia_muneca">Circunferencia Muñeca (cm):</label>
            <input
              type="number"
              id="circunferencia_muneca"
              v-model="atencion.circunferencia_muneca"
              class="form-control"
              required
            />
          </div>

          <!-- Circunferencia de Cuello -->
          <div class="form-group">
            <label for="circunferencia_cuello">Circunferencia Cuello (cm):</label>
            <input
              type="number"
              id="circunferencia_cuello"
              v-model="atencion.circunferencia_cuello"
              class="form-control"
              required
            />
          </div>

          <!-- Nivel de Actividad Física -->
          <div class="form-group">
            <label for="actividad_fisica">Nivel de Actividad Física (0-5):</label>
            <input
              type="number"
              id="actividad_fisica"
              v-model="atencion.actividad_fisica"
              class="form-control"
              min="0"
              max="5"
              required
            />
          </div>

          <!-- Observaciones -->
          <div class="form-group">
            <label for="observacion">Observaciones:</label>
            <textarea
              id="observacion"
              v-model="atencion.observacion"
              class="form-control"
            ></textarea>
          </div>

          <button type="submit">Generar Atención</button>
        </form>

        <!-- Botón para ver cálculos -->
        <div v-if="calculos">
          <button class="mt-3" @click="verCalculos">Ver Cálculos</button>
          <div class="calculos styled-calculos" v-if="mostrarCalculos">
            <p><strong>IMC:</strong> {{ calculos.imc }}</p>
            <p><strong>TMB:</strong> {{ calculos.tmb }}</p>
            <p><strong>Cintura/Talla:</strong> {{ calculos.cintura_talla }}</p>
            <p><strong>Cintura/Cadera:</strong> {{ calculos.cintura_cadera }}</p>
            <p><strong>Porcentaje de Grasa:</strong> {{ calculos.porcentaje_grasa }}</p>
            <p><strong>Complexión Ósea:</strong> {{ calculos.complexion_hueso }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "@/services/apiService";

export default {
  data() {
    return {
      turno_Id: null, // ID del turno pasado como parámetro
      turno: null, // Información del turno cargada desde el backend
      atencion: {
        altura: "",
        peso: "",
        cintura: "",
        cadera: "",
        circunferencia_muneca: "",
        circunferencia_cuello: "",
        actividad_fisica: "",
        observacion: "",
      },
      mensaje: null, // Mensaje dinámico a mostrar
      mensajeClase: "", // Clase CSS para el mensaje dinámico
      calculos: null, // Almacena los cálculos devueltos por el backend
      mostrarCalculos: false, // Controla si se muestran los cálculos
    };
  },
  methods: {
    async obtenerTurno() {
      try {
        const response = await apiService.get(`/turnos/${this.turnoId}`);
        this.turno = response.data;
      } catch (error) {
        this.mensaje = "No se pudo cargar la información del turno.";
        this.mensajeClase = "error";
      }
    },
    async crearAtencion() {
      try {
        const response = await apiService.post("/atenciones", {
          turno_id: this.turnoId,
          ...this.atencion,
        });

        this.calculos = response.data.atencion; // Guardar cálculos devueltos por el backend
        this.mensaje = "Atención creada con éxito.";
        this.mensajeClase = "success-message";
      } catch (error) {
        this.mensaje = "No se pudo crear la atención. Por favor, intenta de nuevo.";
        this.mensajeClase = "error";
      }
    },
    verCalculos() {
      this.mostrarCalculos = !this.mostrarCalculos;
    },
  },
  mounted() {
    this.turnoId = this.$route.params.turnoId;
    this.obtenerTurno();
  },
};
</script>

<style scoped>
.update-container {
  max-width: 800px;
  margin: 100px auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.left-column {
  flex: 1;
  margin-right: 20px;
}

.styled-form {
  flex: 2;
  margin-left: 20px;
}

.styled-form .form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.styled-form .form-group input,
.styled-form .form-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.styled-form .form-group input:focus,
.styled-form .form-group textarea:focus {
  box-shadow: 0px 2px 10px rgba(0, 123, 255, 0.5);
}

.styled-calculos {
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-top: 15px;
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
</style>

