/**
 * @xala-technologies/ui-system - API Platform
 * Server-side API and backend integration components
 */

// Re-export core functionality
export * from '../../src/index';

// API-specific exports
export const PLATFORM_TYPE = 'api' as const;

// API-specific configuration defaults
export const API_DEFAULTS = {
  cors: true,
  rateLimiting: true,
  authentication: true,
  auditLogging: true,
  encryptionInTransit: true,
  encryptionAtRest: true,
};
