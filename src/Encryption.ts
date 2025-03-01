import CONFIG from './CONFIG'
import { RSAKeyManager } from './RsaKeyManager'
import { SecureEncryptionSdkConfig } from './TYPES'
import _ from 'lodash'
import crypto from 'crypto'

export class SecureEncryption {
  /** @private */
  #initialized = false

  /** @private */
  #rsaKeyManager: RSAKeyManager

  /**
   * Creates an instance of SecureEncryption.
   *
   * @constructor
   * @param [config]
   */

  constructor(config?: SecureEncryptionSdkConfig) {
    const thisConfig = _.merge(CONFIG, config)
    this.#rsaKeyManager = new RSAKeyManager(thisConfig)

    this.encryptAES = this.encryptAES.bind(this)
    this.decryptAES = this.decryptAES.bind(this)
    this.encryptRSA = this.encryptRSA.bind(this)
    this.decryptRSA = this.decryptRSA.bind(this)
  }

  encryptAES(text: string, secretKey: string): string {
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(secretKey),
      Buffer.alloc(16, 0)
    )
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
  }

  decryptAES(encryptedText: string, secretKey: string): string {
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(secretKey),
      Buffer.alloc(16, 0)
    )
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  }

  async encryptRSA(text: string): Promise<string> {
    const { publicKey } = await this.#rsaKeyManager.getKeys()
    return crypto.publicEncrypt(publicKey, Buffer.from(text)).toString('base64')
  }

  async decryptRSA(encryptedText: string): Promise<string> {
    const { privateKey } = await this.#rsaKeyManager.getKeys()
    return crypto
      .privateDecrypt(privateKey, Buffer.from(encryptedText, 'base64'))
      .toString('utf8')
  }
}
