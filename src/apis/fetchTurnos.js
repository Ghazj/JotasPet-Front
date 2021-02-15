import api from './api.js';

export const fetchTurnos = () => api.get('/api/turnos')