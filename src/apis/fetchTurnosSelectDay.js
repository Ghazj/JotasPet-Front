import api from './api.js';

export const fetchTurnosSelectDay = (data) => api.get('/api/turnos', data);