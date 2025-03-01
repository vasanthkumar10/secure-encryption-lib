import { SecureEncryptionSdkConfig } from './TYPES'

/** @ignore */
export interface SecureEncryptionSdkEnvConfig
  extends SecureEncryptionSdkConfig {
  DEDICATED_REDIS: boolean
}

/** @ignore */
export type IntConfigKeys =
  | 'SECURE_ENCRYPTION_REDIS_PORT'
  | 'SECURE_ENCRYPTION_TOKEN_EXPIRY_IN_SECS'

/** @ignore */
export type IntConfigs<T> = {
  [key in IntConfigKeys]?: T
}
