/**
 * @xala-technologies/ui-system - Mobile Platform
 * React Native and mobile-specific UI components
 */

// Re-export core functionality
export * from '../../src/index';

// Mobile-specific exports
export const PLATFORM_TYPE = 'mobile' as const;

// Mobile-specific configuration defaults
export const MOBILE_DEFAULTS = {
  offlineSupport: true,
  biometricAuth: false,
  pushNotifications: true,
  localDataEncryption: true,
};
