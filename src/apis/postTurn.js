import api from './api.js';

export const postTurn = (data) => api.post('api/turnos', data)