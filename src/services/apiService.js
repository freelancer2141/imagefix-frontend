import axiosInstance from './axiosInstance.js';

/**
 * REST API Service Layer using Axios
 */

export async function fetchPresets() {
  try {
    const response = await axiosInstance.get('/presets');
    return response.data.presets || [];
  } catch (error) {
    console.warn('Could not load presets from REST API, using local presets fallback:', error.message);
    return null;
  }
}

export async function submitFeedback(payload) {
  try {
    const response = await axiosInstance.post('/feedback', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchStats() {
  try {
    const response = await axiosInstance.get('/stats');
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function recordProcessedAction(action, bytesSaved = 0) {
  try {
    await axiosInstance.post('/stats/increment', { action, bytesSaved });
  } catch (e) {
    // Non-blocking fire-and-forget
  }
}

export async function checkServerHealth() {
  try {
    const response = await axiosInstance.get('/health');
    return response.data;
  } catch (error) {
    return { status: 'offline', error: error.message };
  }
}

export const apiService = {
  fetchPresets,
  submitFeedback,
  fetchStats,
  recordProcessedAction,
  checkServerHealth,
};

export default apiService;
