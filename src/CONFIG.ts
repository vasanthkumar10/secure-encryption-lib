import {
  IntConfigKeys,
  IntConfigs,
  SecureEncryptionSdkEnvConfig
} from './TYPES_INTERNAL'

import { DEFAULT_SECURE_ENCRYPTION_CONFIG } from './TYPES'
import { RedisSdkConfig } from '@am92/redis'

/** @ignore */
const {
  npm_package_name: pkgName = '',
  npm_package_version: pkgVersion = '',

  SECURE_ENCRYPTION_DEDICATED_REDIS = 'false',
  SECURE_ENCRYPTION_REDIS_AUTH_ENABLED = 'false',
  SECURE_ENCRYPTION_REDIS_HOST = '',
  SECURE_ENCRYPTION_REDIS_PORT = '6379',
  SECURE_ENCRYPTION_REDIS_AUTH = '',
  SECURE_ENCRYPTION_REDIS_KEY_PREFIX = '',

  SECURE_ENCRYPTION_TOKEN_EXPIRY_IN_SECS = DEFAULT_SECURE_ENCRYPTION_CONFIG.SECURE_ENCRYPTION_TOKEN_EXPIRY_IN_SECS.toString()
} = process.env

/** @ignore */
export const SERVICE = `${pkgName}@${pkgVersion}`

/** @ignore */
const DEDICATED_REDIS = SECURE_ENCRYPTION_DEDICATED_REDIS === 'true'

/** @ignore */
const DEDICATED_REDIS_AUTH_ENABLED =
  SECURE_ENCRYPTION_REDIS_AUTH_ENABLED === 'true'

/** @ignore */
let REDIS_CONNECTION_CONFIG: RedisSdkConfig['CONNECTION_CONFIG'] = {}

/** @ignore */
const REQUIRED_CONFIG: Array<string> = [
  'SECURE_ENCRYPTION_TOKEN_EXPIRY_IN_SECS'
]

/** @ignore */
const MISSING_CONFIGS: Array<string> = []

/** @ignore */
const INT_ENV: IntConfigs<string> = {
  SECURE_ENCRYPTION_REDIS_PORT,
  SECURE_ENCRYPTION_TOKEN_EXPIRY_IN_SECS
}

/** @ignore */
const INT_CONFIG: IntConfigs<number> = {}

/** @ignore */
const INVALID_INT_CONFIG: IntConfigs<string> = {}

if (DEDICATED_REDIS) {
  REQUIRED_CONFIG.push('SECURE_ENCRYPTION_REDIS_HOST')
  REQUIRED_CONFIG.push('SECURE_ENCRYPTION_REDIS_PORT')

  if (DEDICATED_REDIS_AUTH_ENABLED) {
    REQUIRED_CONFIG.push('SECURE_ENCRYPTION_REDIS_AUTH')
  }

  REQUIRED_CONFIG.forEach(function (key) {
    if (!process.env[key]) {
      MISSING_CONFIGS.push(key)
    }
  })

  if (MISSING_CONFIGS.length) {
    const logFunc = console.fatal || console.error
    logFunc(
      `[${SERVICE} ENCRYPTION] SECURE ENCRYPTION Sdk Configs Missing: ${MISSING_CONFIGS.join(', ')}`
    )
    process.exit(1)
  }
} else {
  console.warn(
    `[${SERVICE} ENCRYPTION] SECURE ENCRYPTION Sdk Config SECURE_ENCRYPTION_DEDICATED_REDIS set to false. Ensure REDIS_ENABLED is set to true`
  )
}

Object.keys(INT_ENV).forEach(key => {
  const configKey = key as IntConfigKeys
  const value = INT_ENV[configKey] || ''
  const intValue = parseInt(value, 10)

  if (isNaN(intValue)) {
    INVALID_INT_CONFIG[configKey] = value
  } else {
    INT_CONFIG[configKey] = intValue
  }
})

if (Object.keys(INVALID_INT_CONFIG).length) {
  const logFunc = console.fatal || console.error
  logFunc(
    `[${SERVICE} Encryption] Invalid SECURE ENCRYPTION Sdk Integer Configs:`,
    INVALID_INT_CONFIG
  )
  process.exit(1)
}

if (DEDICATED_REDIS) {
  REDIS_CONNECTION_CONFIG = {
    socket: {
      host: SECURE_ENCRYPTION_REDIS_HOST,
      port: INT_CONFIG.SECURE_ENCRYPTION_REDIS_PORT,
      tls: DEDICATED_REDIS_AUTH_ENABLED
    },
    password: DEDICATED_REDIS_AUTH_ENABLED
      ? SECURE_ENCRYPTION_REDIS_AUTH
      : undefined
  }
}

/** @ignore */
const CONFIG: SecureEncryptionSdkEnvConfig = {
  DEDICATED_REDIS,

  REDIS_CONFIG: {
    CONNECTION_CONFIG: REDIS_CONNECTION_CONFIG,
    KEY_PREFIX: SECURE_ENCRYPTION_REDIS_KEY_PREFIX
  },

  SECURE_ENCRYPTION_CONFIG: {
    SECURE_ENCRYPTION_TOKEN_EXPIRY_IN_SECS:
      INT_CONFIG.SECURE_ENCRYPTION_TOKEN_EXPIRY_IN_SECS ||
      DEFAULT_SECURE_ENCRYPTION_CONFIG.SECURE_ENCRYPTION_TOKEN_EXPIRY_IN_SECS
  }
}

export default CONFIG
