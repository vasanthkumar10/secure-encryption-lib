import { RedisSdkConfig } from '@am92/redis'

/**
 * Type definition of Secure Encryption Configurations
 *
 * @interface
 */
export interface SecureEncryptionConfig {
  /**
   * Expiry time of Generated TOKEN
   */
  SECURE_ENCRYPTION_TOKEN_EXPIRY_IN_SECS: number
}

/**
 * Default Secure Encryption Configurations
 */
export const DEFAULT_SECURE_ENCRYPTION_CONFIG: SecureEncryptionConfig = {
  SECURE_ENCRYPTION_TOKEN_EXPIRY_IN_SECS: 900
}

/**
 * Type definition of SSOSdk Configurations
 *
 * @interface
 */
export interface SecureEncryptionSdkConfig {
  /**
   * Overriding RedisSdk Configurations
   */
  REDIS_CONFIG: RedisSdkConfig
  /**
   * Secure Encryption Configurations
   */
  SECURE_ENCRYPTION_CONFIG: SecureEncryptionConfig
}

declare global {
  /** @ignore */
  interface Console {
    success?(...data: any[]): void
    fatal?(...data: any[]): void
  }
}
