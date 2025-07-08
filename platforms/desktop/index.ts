/**
 * @xala-technologies/ui-system - Desktop Platform
 * Electron and desktop-specific UI components
 */

// Re-export core functionality
export * from '../../src/index';

// Desktop-specific exports
export const PLATFORM_TYPE = 'desktop' as const;

// Desktop-specific configuration defaults
export const DESKTOP_DEFAULTS = {
  autoUpdater: true,
  systemIntegration: true,
  secureStorage: true,
  encryptedBackups: true,
};
