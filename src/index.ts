/**
 * @xala-technologies/{{PACKAGE_NAME}}
 * {{PACKAGE_DESCRIPTION}}
 *
 * Version: 2.0.0
 *
 * This package provides Norwegian government-compliant {{PACKAGE_DISPLAY_NAME}} functionality
 * with NSM security classifications, GDPR data protection, and DigDir standards compliance.
 */

// Type definitions and imports
import { ComplianceStatus, HealthStatus, PackageConfig, ValidationResult } from './types';

export type {
  ApiPlatformConfig,
  AuditTrailEntry,
  ComplianceConfig,
  ComplianceError,
  ComplianceEvent,
  ComplianceMetrics,
  ComplianceStatus,
  DesktopPlatformConfig,
  FeatureConfig,
  GDPRLegalBasis,
  HealthStatus,
  MobilePlatformConfig,
  NorwegianMunicipality,
  NSMClassification,
  PackageConfig,
  StorageMetadata,
  ValidationResult,
  WebPlatformConfig,
} from './types';

// Package metadata
export const PACKAGE_VERSION = '2.0.0';
export const PACKAGE_NAME = '@xala-technologies/{{PACKAGE_NAME}}';

// Norwegian compliance constants
export const NORWEGIAN_COMPLIANCE = {
  NSM_CLASSIFICATIONS: ['ÅPEN', 'BEGRENSET', 'KONFIDENSIELT', 'HEMMELIG'] as const,
  GDPR_LEGAL_BASIS: [
    'consent',
    'contract',
    'legal_obligation',
    'vital_interests',
    'public_task',
    'legitimate_interests',
  ] as const,
  DIGDIR_STANDARDS: {
    ACCESSIBILITY_LEVEL: 'AA',
    DATA_FORMATS: ['JSON', 'XML'],
    INTEROPERABILITY_REQUIRED: true,
  },
  // Norwegian municipalities for compliance examples
  NORWEGIAN_MUNICIPALITIES: new Set([
    'OSLO',
    'BERGEN',
    'TRONDHEIM',
    'STAVANGER',
    'KRISTIANSAND',
    'FREDRIKSTAD',
    'SANDNES',
    'TROMSØ',
    'SARPSBORG',
    'SKIEN',
    'ÅLESUND',
    'SANDEFJORD',
    'HAUGESUND',
  ]),
} as const;

// Default configuration factory
export const createPackageConfig = (
  options: {
    enableNorwegianCompliance?: boolean;
    enableAuditLogging?: boolean;
    enableMetrics?: boolean;
    enableHealthChecks?: boolean;
    environment?: string;
    nsmClassification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  } = {}
): PackageConfig => {
  const {
    enableNorwegianCompliance = true,
    enableAuditLogging = true,
    enableMetrics = true,
    enableHealthChecks = true,
    environment = process.env.NODE_ENV || 'development',
    nsmClassification = 'BEGRENSET',
  } = options;

  return {
    version: PACKAGE_VERSION,
    environment,
    compliance: {
      norwegian: enableNorwegianCompliance,
      auditLogging: enableAuditLogging,
      nsm: enableNorwegianCompliance,
      gdpr: enableNorwegianCompliance,
      digdir: enableNorwegianCompliance,
      nsmClassification,
    },
    features: {
      metrics: enableMetrics,
      healthChecks: enableHealthChecks,
      events: true,
      logging: true,
      i18n: true,
    },
    created: new Date(),
  };
};

// Main package class
export class PackageMain {
  private config: PackageConfig;
  private initialized = false;

  constructor(config?: Partial<PackageConfig>) {
    this.config = {
      ...createPackageConfig(),
      ...config,
    };
  }

  /**
   * Initialize the package instance with Norwegian compliance settings
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      throw new Error('{{PACKAGE_DISPLAY_NAME}} already initialized');
    }

    // Initialize Norwegian compliance features
    if (this.config.compliance?.norwegian) {
      await this.initializeNorwegianCompliance();
    }

    // Initialize logging and metrics
    if (this.config.features?.logging) {
      await this.initializeLogging();
    }

    if (this.config.features?.metrics) {
      await this.initializeMetrics();
    }

    this.initialized = true;
  }

  /**
   * Get the current compliance status
   */
  getComplianceStatus(): ComplianceStatus {
    return {
      nsm: {
        classification: this.config.compliance?.nsmClassification || 'ÅPEN',
        encryptionRequired: this.config.compliance?.nsmClassification !== 'ÅPEN',
        accessControlRequired: this.config.compliance?.nsmClassification !== 'ÅPEN',
      },
      gdpr: {
        enabled: this.config.compliance?.gdpr || false,
        auditLogging: this.config.compliance?.auditLogging || false,
        dataMinimization: true,
      },
      digdir: {
        interoperabilityCompliant: NORWEGIAN_COMPLIANCE.DIGDIR_STANDARDS.INTEROPERABILITY_REQUIRED,
        accessibilityLevel: NORWEGIAN_COMPLIANCE.DIGDIR_STANDARDS.ACCESSIBILITY_LEVEL,
      },
      timestamp: new Date(),
    };
  }

  /**
   * Validate Norwegian compliance
   */
  async validateNorwegianCompliance(): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate NSM classification
    const classification = this.config.compliance?.nsmClassification;
    if (
      classification &&
      !NORWEGIAN_COMPLIANCE.NSM_CLASSIFICATIONS.includes(classification as any)
    ) {
      errors.push(`Invalid NSM classification: ${classification}`);
    }

    // Validate GDPR compliance
    if (this.config.compliance?.gdpr && !this.config.compliance?.auditLogging) {
      warnings.push('GDPR compliance enabled but audit logging is disabled');
    }

    // Validate DigDir standards
    if (!this.config.compliance?.digdir) {
      warnings.push('DigDir compliance is disabled');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Get package health status
   */
  getHealth(): HealthStatus {
    try {
      return {
        status: 'healthy' as const,
        version: PACKAGE_VERSION,
        initialized: this.initialized,
        compliance: this.getComplianceStatus(),
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        status: 'unhealthy' as const,
        version: PACKAGE_VERSION,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      };
    }
  }

  private async initializeNorwegianCompliance(): Promise<void> {
    // Initialize NSM security classifications
    if (this.config.compliance?.nsmClassification !== 'ÅPEN') {
      // Enable encryption for non-ÅPEN classifications
      await this.enableEncryption();
    }

    // Initialize GDPR compliance
    if (this.config.compliance?.gdpr) {
      await this.initializeGDPRCompliance();
    }

    // Initialize DigDir standards
    if (this.config.compliance?.digdir) {
      await this.initializeDigDirCompliance();
    }
  }

  private async initializeLogging(): Promise<void> {
    // Initialize logging with Norwegian compliance
    // Implementation depends on package-specific requirements
  }

  private async initializeMetrics(): Promise<void> {
    // Initialize metrics collection
    // Implementation depends on package-specific requirements
  }

  private async enableEncryption(): Promise<void> {
    // Enable encryption based on NSM classification
    // Implementation depends on package-specific requirements
  }

  private async initializeGDPRCompliance(): Promise<void> {
    // Initialize GDPR compliance features
    // - Data minimization
    // - Consent management
    // - Right to erasure
    // - Data portability
    // Implementation depends on package-specific requirements
  }

  private async initializeDigDirCompliance(): Promise<void> {
    // Initialize DigDir standards compliance
    // - Interoperability
    // - Accessibility (WCAG 2.2 AA)
    // - Multi-language support
    // Implementation depends on package-specific requirements
  }
}

// Default export
export default PackageMain;

// Convenience functions
export const createPackage = (config?: Partial<PackageConfig>) => {
  return new PackageMain(config);
};

export const initializePackage = async (config?: Partial<PackageConfig>) => {
  const instance = new PackageMain(config);
  await instance.initialize();
  return instance;
};

// Norwegian municipality helper functions
export const getMunicipalityInfo = (municipalityCode: string) => {
  const municipalities: Record<string, { name: string; county: string }> = {
    '0301': { name: 'Oslo', county: 'Oslo' },
    '4601': { name: 'Bergen', county: 'Vestland' },
    '5001': { name: 'Trondheim', county: 'Trøndelag' },
    '1103': { name: 'Stavanger', county: 'Rogaland' },
    '1601': { name: 'Tromsø', county: 'Troms og Finnmark' },
  };

  return municipalities[municipalityCode] || { name: 'Unknown', county: 'Unknown' };
};

export const isValidNorwegianMunicipality = (municipalityCode: string) => {
  const info = getMunicipalityInfo(municipalityCode);
  return info.name !== 'Unknown';
};

// NSM classification helpers
export const isNSMClassificationValid = (
  classification: string
): classification is (typeof NORWEGIAN_COMPLIANCE.NSM_CLASSIFICATIONS)[number] => {
  return NORWEGIAN_COMPLIANCE.NSM_CLASSIFICATIONS.includes(classification as any);
};

export const requiresEncryption = (classification: string): boolean => {
  return classification !== 'ÅPEN';
};

export const requiresAccessControl = (classification: string): boolean => {
  return classification !== 'ÅPEN';
};

export const requiresAuditTrail = (classification: string): boolean => {
  return ['KONFIDENSIELT', 'HEMMELIG'].includes(classification);
};

export const requiresSecurityClearance = (classification: string): boolean => {
  return classification === 'HEMMELIG';
};
