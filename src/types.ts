/**
 * Type definitions for {{PACKAGE_DISPLAY_NAME}} package
 * Norwegian government compliance and enterprise configuration types
 */

// Base configuration interface
export interface PackageConfig {
  /** Package version */
  version?: string;
  /** Environment (development, test, production) */
  environment?: string;
  /** Norwegian compliance settings */
  compliance?: ComplianceConfig;
  /** Feature flags */
  features?: FeatureConfig;
  /** Creation timestamp */
  created?: Date;
}

// Norwegian compliance configuration
export interface ComplianceConfig {
  /** Enable Norwegian compliance features */
  norwegian?: boolean;
  /** Enable audit logging */
  auditLogging?: boolean;
  /** NSM security classification */
  nsmClassification?: NSMClassification;
  /** Enable NSM security features */
  nsm?: boolean;
  /** Enable GDPR compliance */
  gdpr?: boolean;
  /** Enable DigDir standards */
  digdir?: boolean;
}

// Feature configuration
export interface FeatureConfig {
  /** Enable metrics collection */
  metrics?: boolean;
  /** Enable health checks */
  healthChecks?: boolean;
  /** Enable event system */
  events?: boolean;
  /** Enable logging */
  logging?: boolean;
  /** Enable internationalization */
  i18n?: boolean;
}

// NSM Security Classifications
export type NSMClassification = 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';

// GDPR Legal Basis
export type GDPRLegalBasis =
  | 'consent'
  | 'contract'
  | 'legal_obligation'
  | 'vital_interests'
  | 'public_task'
  | 'legitimate_interests';

// Norwegian municipality information
export interface NorwegianMunicipality {
  /** Municipality code (e.g., '0301' for Oslo) */
  code: string;
  /** Municipality name */
  name: string;
  /** County name */
  county: string;
}

// Compliance status
export interface ComplianceStatus {
  /** NSM compliance status */
  nsm: {
    classification: NSMClassification;
    encryptionRequired: boolean;
    accessControlRequired: boolean;
  };
  /** GDPR compliance status */
  gdpr: {
    enabled: boolean;
    auditLogging: boolean;
    dataMinimization: boolean;
  };
  /** DigDir standards status */
  digdir: {
    interoperabilityCompliant: boolean;
    accessibilityLevel: string;
  };
  /** Status timestamp */
  timestamp: Date;
}

// Validation result
export interface ValidationResult {
  /** Whether validation passed */
  valid: boolean;
  /** Validation errors */
  errors: string[];
  /** Validation warnings */
  warnings: string[];
}

// Health status
export interface HealthStatus {
  /** Health status */
  status: 'healthy' | 'unhealthy';
  /** Package version */
  version: string;
  /** Whether package is initialized */
  initialized?: boolean;
  /** Compliance status */
  compliance?: ComplianceStatus;
  /** Error message if unhealthy */
  error?: string;
  /** Status timestamp */
  timestamp: Date;
}

// Platform-specific configuration interfaces
export interface WebPlatformConfig extends PackageConfig {
  /** Enable localStorage usage */
  localStorage?: boolean;
  /** Enable sessionStorage usage */
  sessionStorage?: boolean;
  /** Enable analytics */
  analytics?: boolean;
  /** Debug mode */
  debug?: boolean;
  /** Retention period for web data */
  retentionPeriod?: string;
}

export interface MobilePlatformConfig extends PackageConfig {
  /** Enable offline support */
  offlineSupport?: boolean;
  /** Enable biometric authentication */
  biometricAuth?: boolean;
  /** Enable push notifications */
  pushNotifications?: boolean;
  /** Local data encryption */
  localDataEncryption?: boolean;
}

export interface DesktopPlatformConfig extends PackageConfig {
  /** Enable auto-updater */
  autoUpdater?: boolean;
  /** Enable system integration */
  systemIntegration?: boolean;
  /** Secure storage */
  secureStorage?: boolean;
  /** Encrypted backups */
  encryptedBackups?: boolean;
}

export interface ApiPlatformConfig extends PackageConfig {
  /** Enable CORS */
  cors?: boolean;
  /** Enable rate limiting */
  rateLimiting?: boolean;
  /** Enable authentication */
  authentication?: boolean;
  /** Audit logging */
  auditLogging?: boolean;
  /** Encryption in transit */
  encryptionInTransit?: boolean;
  /** Encryption at rest */
  encryptionAtRest?: boolean;
}

// Norwegian government integration types
export interface AltinnIntegration {
  /** Altinn service owner */
  serviceOwner: string;
  /** Altinn service code */
  serviceCode?: string;
  /** Altinn service edition */
  serviceEdition?: string;
}

export interface IDPortenIntegration {
  /** ID-porten client ID */
  clientId: string;
  /** ID-porten client secret */
  clientSecret?: string;
  /** ID-porten redirect URI */
  redirectUri?: string;
  /** Security level required */
  securityLevel?: number;
}

export interface KartverketIntegration {
  /** Kartverket API key */
  apiKey: string;
  /** Service endpoints */
  endpoints?: {
    addresses?: string;
    cadastral?: string;
    elevation?: string;
  };
}

// Event types for Norwegian compliance
export interface ComplianceEvent {
  /** Event ID */
  eventId: string;
  /** Event type */
  eventType: string;
  /** Event timestamp */
  timestamp: Date;
  /** Event data */
  data: any;
  /** NSM classification of event data */
  nsmClassification?: NSMClassification;
  /** Municipality code if applicable */
  municipality?: string;
  /** User ID if applicable */
  userId?: string;
  /** GDPR legal basis */
  gdprLegalBasis?: GDPRLegalBasis;
}

// Audit trail entry
export interface AuditTrailEntry {
  /** Audit entry ID */
  id: string;
  /** Action performed */
  action: string;
  /** User who performed the action */
  userId: string;
  /** Resource affected */
  resource: string;
  /** Timestamp */
  timestamp: Date;
  /** Additional metadata */
  metadata: Record<string, any>;
  /** NSM classification */
  nsmClassification: NSMClassification;
  /** Municipality context */
  municipality?: string;
}

// Error handling types
export interface ComplianceError extends Error {
  /** Error code */
  code: string;
  /** NSM classification */
  nsmClassification: NSMClassification;
  /** Whether error contains personal data */
  containsPersonalData: boolean;
  /** Municipality context */
  municipality?: string;
}

// Metrics types
export interface ComplianceMetrics {
  /** Metric name */
  name: string;
  /** Metric value */
  value: number;
  /** Metric unit */
  unit: string;
  /** Metric tags */
  tags: Record<string, string>;
  /** Timestamp */
  timestamp: Date;
  /** NSM classification of metric data */
  nsmClassification?: NSMClassification;
}

// Storage metadata for compliance
export interface StorageMetadata {
  /** Data classification */
  classification: NSMClassification;
  /** Retention period */
  retentionPeriod: string;
  /** GDPR legal basis */
  gdprLegalBasis: GDPRLegalBasis;
  /** Encryption required */
  encryptionRequired: boolean;
  /** Data owner */
  dataOwner: string;
  /** Created timestamp */
  created: Date;
  /** Last accessed timestamp */
  lastAccessed?: Date;
  /** Municipality context */
  municipality?: string;
}
