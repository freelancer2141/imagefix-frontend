/**
 * Global Application Configuration
 */

export const APP_CONFIG = {
  APP_NAME: 'ImageFix',
  API_BASE_URL: import.meta.env.VITE_API_URL || '/api',

  STORAGE_KEYS: {
    RECENT_PRESETS: 'imagefix_recent_presets',
  },

  LIMITS: {
    MAX_FILE_SIZE_MB: 25,
    MAX_DIMENSION: 10000,
    MIN_DIMENSION: 10,
    MAX_TARGET_KB: 10000,
    MIN_TARGET_KB: 1,
  },

  DEFAULT_COMPRESSION_QUALITY: 0.85,
};