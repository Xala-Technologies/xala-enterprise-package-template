/**
 * @xala-technologies/ui-system - Web Platform
 * Web-specific UI components and functionality
 */

// Re-export core functionality
export * from '../../src/index';

// Web-specific exports
export const PLATFORM_TYPE = 'web' as const;

// Web-specific configuration defaults
export const WEB_DEFAULTS = {
  localStorage: true,
  sessionStorage: true,
  analytics: true,
  debug: process.env.NODE_ENV === 'development',
};
