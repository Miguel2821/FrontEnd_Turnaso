<template>
  <div class="appointment-container">
    <h2>Gestión de Turnos</h2>

    <div class="turnos-reservados">
      <h3><i class="fas fa-list-alt"></i> Mis Turnos Reservados</h3>
      <ul v-if="turnosReservados.length">
        <li v-for="turno in turnosReservados" :key="turno.id">
          <span>{{ turno.fecha }} - {{ turno.hora }}</span>
          <button @click="cancelarTurno(turno.id)" aria-label="Cancelar turno">
            <i class="fas fa-times-circle"></i> Cancelar
          </button>
        </li>
      </ul>
      <p v-else>No tienes turnos reservados.</p>
    </div>

    <!-- Mensaje -->
    <div v-if="message" :class="['message', { success: isSuccessMessage, error: !isSuccessMessage }]">
      {{ message }}
    </div>

    <!-- Selección de Nutricionistas -->
    <div class="nutricionistas-section">
      <h3><i class="fas fa-user-md"></i> Seleccionar Nutricionista</h3>
      <select v-model="nutricionistaSeleccionado" @change="cargarTurnos" aria-label="Seleccionar nutricionista">
        <option disabled value="">Seleccione un nutricionista...</option>
        <option v-for="nutricionista in nutricionistas" :key="nutricionista.id" :value="nutricionista.id">
          {{ nutricionista.nombre }}
        </option>
      </select>
    </div>

    <!-- Turnos Disponibles -->
    <div class="turnos-container">
      <!-- Matutinos -->
      <div class="turnos-column">
        <h3><i class="fas fa-sun"></i> Turnos Matutinos</h3>
        <ul>
          <li v-for="turno in turnosMatutinos" :key="turno.id">
            <span>{{ turno.fecha }} - {{ turno.hora }}</span>
            <button @click="reservarTurno(turno.id)" aria-label="Reservar turno">
              <i class="fas fa-check-circle"></i> Reservar
            </button>
          </li>
        </ul>
        <p v-if="turnosMatutinos.length === 0">No hay turnos matutinos disponibles.</p>
      </div>

      <!-- Vespertinos -->
      <div class="turnos-column">
        <h3><i class="fas fa-moon"></i> Turnos Vespertinos</h3>
        <ul>
          <li v-for="turno in turnosVespertinos" :key="turno.id">
            <span>{{ turno.fecha }} - {{ turno.hora }}</span>
            <button @click="reservarTurno(turno.id)" aria-label="Reservar turno">
              <i class="fas fa-check-circle"></i> Reservar
            </button>
          </li>
        </ul>
        <p v-if="turnosVespertinos.length === 0">No hay turnos vespertinos disponibles.</p>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "../services/apiService";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      nutricionistas: [], // Lista de nutricionistas
      nutricionistaSeleccionado: "", // Nutricionista seleccionado
      turnosDisponibles: [], // Todos los turnos disponibles
      turnosMatutinos: [], // Turnos matutinos
      turnosVespertinos: [], // Turnos vespertinos
      turnosReservados: [], // Turnos reservados por el usuario
      turnosCargadosMostrado: false, // Control para mostrar el mensaje una sola vez
    };
  },
  async mounted() {
    await this.cargarNutricionistas(); // Cargar nutricionistas al montar
  },
  methods: {
    ordenarTurnos(turnos) {
      // Ordenar los turnos por fecha y hora en orden ascendente
      return turnos.sort((a, b) => {
        const fechaA = new Date(`${a.fecha}T${a.hora}`);
        const fechaB = new Date(`${b.fecha}T${b.hora}`);
        return fechaA - fechaB;
      });
    },
    async cargarNutricionistas() {
      try {
        const response = await apiService.get("/nutricionistas");
        this.nutricionistas = response.data;
        Swal.fire({
          title: "¡Cargado correctamente!",
          text: "Lista de nutricionistas cargada exitosamente.",
          icon: "info",
          confirmButtonText: "Aceptar",
        });
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Error al cargar la lista de nutricionistas.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    },
    async cargarTurnos() {
      if (!this.nutricionistaSeleccionado) {
        this.turnosDisponibles = [];
        this.turnosReservados = [];
        this.turnosMatutinos = [];
        this.turnosVespertinos = [];
        return;
      }
      try {
        const response = await apiService.get(`/turnos/nutricionista/${this.nutricionistaSeleccionado}`);

        // Separar turnos disponibles y reservados
        const { disponibles, reservados } = response.data;

        // Ordenar turnos
        this.turnosDisponibles = this.ordenarTurnos(disponibles);
        this.turnosReservados = this.ordenarTurnos(reservados);

        // Clasificar turnos disponibles en matutinos y vespertinos
        this.turnosMatutinos = this.turnosDisponibles.filter((turno) => {
          const hora = parseInt(turno.hora.split(":")[0]);
          return hora >= 8 && hora < 12;
        });

        this.turnosVespertinos = this.turnosDisponibles.filter((turno) => {
          const hora = parseInt(turno.hora.split(":")[0]);
          return hora >= 14 && hora < 18;
        });

        // Mostrar mensaje solo la primera vez que se cargan los turnos
        if (!this.turnosCargadosMostrado) {
          Swal.fire({
            title: "¡Turnos cargados!",
            text: "Los turnos del nutricionista seleccionado se han cargado exitosamente.",
            icon: "info",
            confirmButtonText: "Aceptar",
          });
          this.turnosCargadosMostrado = true; // Marcar como mostrado
        }
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Error al cargar los turnos.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    },
    async reservarTurno(turnoId) {
      try {
        const response = await apiService.post("/turnos/reservar", { turno_id: turnoId });

        Swal.fire({
          title: "¡Éxito!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        // Refrescar turnos después de reservar
        await this.cargarTurnos();
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: err.response?.data?.message || "Error al reservar el turno.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    },
    async cancelarTurno(turnoId) {
      try {
        const response = await apiService.delete(`/turnos/${turnoId}`);

        Swal.fire({
          title: "¡Cancelado!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        // Refrescar turnos después de cancelar
        await this.cargarTurnos();
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: err.response?.data?.message || "Error al cancelar el turno.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    },
  },
};
</script>



<style scoped>
.appointment-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
}

.appointment-container h2 {
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.nutricionistas-section {
  margin-bottom: 30px;
}

.nutricionistas-section select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
}

.nutricionistas-section select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.turnos-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.turnos-column {
  flex: 1 1 calc(50% - 10px);
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.turnos-column:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.turnos-column h3 {
  margin-bottom: 15px;
  font-size: 20px;
  color: #555;
}

.turnos-column ul {
  list-style: none;
  padding: 0;
}

.turnos-column li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}

/* Estilo general de botones */
.turnos-column button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Botón de Cancelar Turno */
.turnos-column button[aria-label="Cancelar turno"] {
  background-color: #dc3545; /* Rojo llamativo */
  color: white; /* Texto blanco */
  box-shadow: 0px 2px 5px rgba(220, 53, 69, 0.5);
}

.turnos-column button[aria-label="Cancelar turno"]:hover {
  background-color: #c82333; /* Rojo más oscuro */
  transform: translateY(-2px);
  box-shadow: 0px 4px 10px rgba(220, 53, 69, 0.7);
}

.turnos-column button[aria-label="Cancelar turno"]:active {
  background-color: #bd2130; /* Rojo aún más oscuro */
  transform: translateY(0px);
  box-shadow: 0px 1px 3px rgba(220, 53, 69, 0.7);
}

.turnos-column button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.message {
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
}

.message.success {
  background-color: #28a745;
  color: white;
}

.message.error {
  background-color: #d9534f;
  color: white;
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .turnos-column {
    flex: 1 1 100%;
  }
}

@media (max-width: 576px) {
  .nutricionistas-section select {
    font-size: 14px;
    padding: 8px;
  }

  .turnos-column button {
    font-size: 12px;
    padding: 6px 10px;
  }
}
</style>
