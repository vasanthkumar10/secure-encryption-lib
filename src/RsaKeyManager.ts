import { SecureEncryptionConfig, SecureEncryptionSdkConfig } from './TYPES'

import CONFIG from './CONFIG'
import Redis from './Redis'
import { RedisSdkConfig } from '@am92/redis'
import _ from 'lodash'
import crypto from 'crypto'

export class RSAKeyManager {
  /** @private */
  #initialized = false

  /** @private */
  #redis: Redis

  /**
   * Redis Configurations used by the RSAKeyManager instance
   */
  REDIS_CONFIG: RedisSdkConfig

  /**
   * SECURE ENCRYPTION Configurations used by the RSAKeyManager instance
   */
  SECURE_ENCRYPTION_CONFIG: SecureEncryptionConfig

  /**
   * Creates an instance of RSAKeyManager.
   *
   * @constructor
   * @param [config]
   */

  constructor(config?: SecureEncryptionSdkConfig) {
    const thisConfig = _.merge(CONFIG, config)
    const { REDIS_CONFIG, SECURE_ENCRYPTION_CONFIG } = thisConfig

    this.#redis = new Redis(REDIS_CONFIG)
    this.REDIS_CONFIG = this.#redis.REDIS_CONFIG
    this.SECURE_ENCRYPTION_CONFIG = SECURE_ENCRYPTION_CONFIG

    this.initialize = this.initialize.bind(this)
    this.generateKeys = this.generateKeys.bind(this)
    this.getKeys = this.getKeys.bind(this)
  }

  /**
   * Initialize the RSAKeyManager instance. It internally creates a Redis connection
   *
   * @async
   * @returns
   */
  async initialize(): Promise<void> {
    await this.#redis.initialize()
    this.#initialized = true
  }

  async generateKeys(): Promise<void> {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
    })

    await this.#redis.setKey('rsa_public_key', publicKey)
    await this.#redis.setKey('rsa_private_key', privateKey)
  }

  async getKeys(): Promise<{ publicKey: string; privateKey: string }> {
    const publicKey = await this.#redis.getKey('rsa_public_key')
    const privateKey = await this.#redis.getKey('rsa_private_key')

    if (!publicKey || !privateKey) {
      throw new Error('RSA keys not found in Redis. Generate new keys.')
    }

    return { publicKey, privateKey }
  }
}
