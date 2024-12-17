<template>
  <div class="login-container">
    <h2 class="text-center mb-4">Citas Reservadas</h2>

    

    <!-- Lista de Atenciones -->
    <div v-if="atenciones.length > 0" class="mt-5">
      <h2 class="text-center mb-4">Atenciones Realizadas</h2>
      <div v-for="(atencion, index) in atenciones" :key="atencion.id" class="card atencion-card">
        <div class="card-header">
          <h5>
            Atención #{{ index + 1 }} - Nutricionista: {{ atencion.nutricionista }}
            <button class="btn btn-link toggle-button" @click="toggleDetalles(index)">
              {{ atencion.mostrarDetalles ? 'Ocultar Detalles' : 'Ver Detalles' }}
            </button>
          </h5>
        </div>
        <div v-if="atencion.mostrarDetalles" class="card-body">
          <p><strong>Fecha:</strong> {{ atencion.fecha }}</p>
          <p><strong>Hora:</strong> {{ atencion.hora }}</p>
          <p><strong>Altura:</strong> {{ atencion.altura }} m</p>
          <p><strong>Peso:</strong> {{ atencion.peso }} kg</p>
          <p><strong>Cintura:</strong> {{ atencion.cintura }} cm</p>
          <p><strong>Cadera:</strong> {{ atencion.cadera }} cm</p>
          <p><strong>Circunferencia Muñeca:</strong> {{ atencion.circunferencia_muneca }}</p>
          <p><strong>Circunferencia Cuello:</strong> {{ atencion.circunferencia_cuello }}</p>
          <p><strong>Actividad Física:</strong> {{ atencion.actividad_fisica }}</p>
          <p><strong>IMC:</strong> {{ atencion.imc }}</p>
          <p><strong>TMB:</strong> {{ atencion.tmb }}</p>
          <p><strong>Cintura/Talla:</strong> {{ atencion.cintura_talla }}</p>
          <p><strong>Cintura/Cadera:</strong> {{ atencion.cintura_cadera }}</p>
          <p><strong>Porcentaje Grasa:</strong> {{ atencion.porcentaje_grasa }}</p>
          <p><strong>Complexión Hueso:</strong> {{ atencion.complexion_hueso }}</p>
          <p><strong>Observación:</strong> {{ atencion.observacion }}</p>
        </div>
      </div>
    </div>

    <!-- Mensaje si no hay atenciones -->
    <div v-else-if="atenciones.length === 0" class="text-center mt-5">
      <p>No hay registros de atenciones disponibles.</p>
    </div>
  </div>
</template>

<script>
import apiService from "@/services/apiService"; // Servicio de API

export default {
  data() {
    return {
      turnos: [], // Lista de turnos reservados
      atenciones: [], // Lista de atenciones realizadas
    };
  },
  methods: {
    async obtenerTurnosReservados() {
      try {
        const response = await apiService.obtenerTurnosReservados();
        if (response.data.message) {
          console.log(response.data.message);
        } else {
          this.turnos = response.data; // Cargar los turnos en la variable local
        }
      } catch (error) {
        console.error("Error al obtener turnos reservados:", error);
      }
    },
    async obtenerAtenciones() {
      try {
        const response = await apiService.obtenerAtenciones();
        console.log("Atenciones recibidas:", response.data);

        // Procesar atenciones y buscar nutricionista, fecha y hora para cada turno
        const atencionesProcesadas = await Promise.all(
          response.data.atencion.map(async (atencion) => {
            try {
              const turnoResponse = await apiService.get(`/turnos/${atencion.turno_id}`);
              return {
                ...atencion,
                nutricionista: turnoResponse.data.nutricionista?.nombre || "N/A",
                fecha: turnoResponse.data.fecha,
                hora: turnoResponse.data.hora,
                mostrarDetalles: false,
              };
            } catch (err) {
              console.error(`Error al obtener turno para atención ${atencion.id}`, err);
              return {
                ...atencion,
                nutricionista: "N/A",
                fecha: "N/A",
                hora: "N/A",
                mostrarDetalles: false,
              };
            }
          })
        );

        this.atenciones = atencionesProcesadas;
      } catch (error) {
        console.error("Error al obtener atenciones:", error);
      }
    },
    toggleDetalles(index) {
      if (this.atenciones[index]) {
        this.atenciones[index].mostrarDetalles = !this.atenciones[index].mostrarDetalles;
      }
    },
    generarAtencion(turnoId) {
      this.$router.push({ name: "GenerarAtencion", params: { turnoId } });
    },
  },
  mounted() {
    this.obtenerTurnosReservados(); // Cargar turnos al montar el componente
    this.obtenerAtenciones(); // Cargar atenciones realizadas al montar el componente
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table-bordered {
  border: 1px solid #ddd;
}

.table thead th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.table td,
.table th {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

.text-center {
  font-size: 18px;
  font-weight: bold;
  color: #555;
}

.card {
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 10px;
}

.card-header {
  background-color: #f8f9fa;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-body {
  padding: 10px;
  background-color: #fff;
}

.toggle-button {
  background: none;
  border: none;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}

.toggle-button:hover {
  color: #0056b3;
}
</style>
