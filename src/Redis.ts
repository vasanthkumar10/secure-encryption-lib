import { RedisSdk, RedisSdkConfig } from '@am92/redis'

/** @internal */
export default class Redis {
  redisSdk: RedisSdk
  REDIS_CONFIG: RedisSdkConfig

  constructor(REDIS_CONFIG: RedisSdkConfig) {
    this.redisSdk = new RedisSdk(REDIS_CONFIG)
    this.REDIS_CONFIG = this.redisSdk.CONFIG

    this.initialize = this.initialize.bind(this)
  }

  async initialize(): Promise<void> {
    await this.redisSdk.connect()
  }

  async setKey(key: string, value: string): Promise<void> {
    await this.redisSdk.set(key, value)
  }

  async getKey(key: string): Promise<string | null> {
    return await this.redisSdk.get(key)
  }
}
