<template>
  <div class="atencion-detalle">
    <h2 class="text-center mb-4">Detalle de Atención</h2>
    <div v-if="atencion" class="card">
      <div class="card-body">
        <h5 class="card-title">
          Paciente: {{ atencion.turno?.paciente?.nombre || 'Sin datos' }}
        </h5>
        <p class="card-text">
          <strong>Fecha:</strong> {{ atencion.turno?.fecha || 'Sin fecha' }}
        </p>
        <p class="card-text">
          <strong>Hora:</strong> {{ atencion.turno?.hora || 'Sin hora' }}
        </p>
        <p class="card-text">
          <strong>Notas:</strong> {{ atencion.notas || 'Sin notas' }}
        </p>
      </div>
    </div>
    <div v-else class="text-center">
      <p>Cargando información de la atención...</p>
    </div>
  </div>
</template>

  
<script>
import apiService from "@/services/apiService";

export default {
  data() {
    return {
      atencion: null, // Detalles de la atención
    };
  },
  async created() {
    const atencionId = this.$route.params.atencionId; // Obtén el ID desde la ruta
    console.log("ID de Atención recibido:", atencionId); // Verifica si el ID es correcto

    try {
      const response = await apiService.obtenerAtencionPorId(atencionId); // Llama a la API
      console.log("Respuesta de la API:", response.data); // Depuración: verifica los datos devueltos
      this.atencion = response.data; // Asigna los datos a la variable local
    } catch (error) {
      console.error("Error al cargar la atención:", error); // Muestra el error en la consola
    }
  },
};
</script>
