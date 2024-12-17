// src/services/apiService.js
import axios from 'axios';

// Crear una instancia de Axios con configuración predeterminada
const apiClient = axios.create({
  baseURL: 'http://74.179.81.225/api', //Ponemos la ip de la back
  withCredentials: true, // Necesario para enviar cookies con Laravel Sanctum
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token desde sessionStorage en cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('authToken'); // Obtener el token desde sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Añadir el token al encabezado Authorization
      console.log('Token enviado en la solicitud:', token); // Depurar para asegurarse de que se está enviando el token
    } else {
      console.log('No hay token disponible en sessionStorage');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  // Obtener datos personales del usuario autenticado
  getDatosPersonales() {
    return apiClient.get('/datos-personales');
  },

  // Actualizar datos personales del usuario autenticado
  updateDatosPersonales(data) {
    return apiClient.put('/datos-personales', data);
  },

  // Método genérico para hacer peticiones GET
  get(resource) {
    return apiClient.get(resource);
  },
  
  // Método genérico para hacer peticiones PUT
  put(resource, data) {
    return apiClient.put(resource, data); // Usamos la instancia de axios para enviar un PUT
  },

  // Método genérico para hacer peticiones POST
  post(resource, data) {
    return apiClient.post(resource, data);
  },

  // Método genérico para hacer peticiones DELETE
  delete(resource) {
    return apiClient.delete(resource);
  },

  // Método específico para filtrar turnos por nutricionista
  filtrarTurnosPorNutricionista(nutricionistaId) {
    return apiClient.get('/turnos/filtrar-por-nutricionista', {
      params: { nutricionista_id: nutricionistaId },
    });
  },

  // Obtener todos los usuarios excepto el admin
  obtenerUsuarios() {
    return apiClient.get('/user'); // Aquí se asume que la ruta en el backend es '/user'
  },

  // Actualizar un usuario
  actualizarUsuario(id, data) {
    return apiClient.put(`/user/${id}`, data); // Ruta para actualizar un usuario específico
  },

  // Eliminar un usuario
  eliminarUsuario(id) {
    return apiClient.delete(`/user/${id}`); // Ruta para eliminar un usuario específico
  },

  // Obtener atenciones para el nutricionista autenticado
  obtenerAtenciones() {
    return apiClient.get('/atenciones');
  },
  

  // Crear un turno
  crearTurno(turnoData) {
    return apiClient.post('/turnos/crear', turnoData);
  },

  actualizarEstadoTurno(id, estado_id) {
    return apiClient.put(`/turnos/${id}`, { estado_id });
  },
  obtenerTurnosReservados() {
    return apiClient.get('/turnos/reservados');
  },
  async reservarTurno(turnoId) {
    return axios.post("/turnos/reservar", { turno_id: turnoId });
  },

  // Cancelar un turno
  async cancelarTurno(turnoId) {
    return axios.delete(`/turnos/${turnoId}`);
  },

  // Obtener lista de nutricionistas
  async getNutricionistas() {
    return apiClient.get("/nutricionistas");
  },
  // Obtener una atención por ID
  async obtenerAtencionPorId(id) {
    return apiClient.get(`atenciones/${id}`);
  },

  // Crear una nueva atención
  async crearAtencion(data) {
    return axios.post("/atenciones", data);
  },

  // Actualizar una atención existente
  async actualizarAtencion(id, data) {
    return apiClient.put(`/atenciones/${id}`, data);
  },

  // Verificar si existe una atención para un turno
  async verificarAtencion(turnoId) {
    return apiClient.get(`/atenciones/verificar?turno_id=${turnoId}`);
  },

  // Eliminar una atención
  async eliminarAtencion(id) {
    return apiClient.delete(`/atenciones/${id}`);
  },
  async obtenerTurnoPorId(turnoId) {
    return apiClient.get(`/turnos/${turnoId}`); // Cambia la ruta si es diferente
  }
  
};
