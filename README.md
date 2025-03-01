# Secure Encryption Library

## Overview

Secure Encryption Library is a TypeScript-based encryption solution designed for banking and financial applications. It provides AES & RSA encryption, automatic RSA key generation.

## Features

- AES-256 encryption & decryption
- RSA public/private key encryption & decryption
- Automatic RSA key generation and secure storage in Redis
- Key rotation mechanism to enhance security
- Secure handshake and service verification using SHA-256
- Built-in Express API endpoints

## Installation

### Prerequisites

Ensure you have Node.js and npm installed.

### Install the package

```sh
npm install secure-encryption-lib
```

## Usage

### 1. Import the Library

```typescript
import { SecureEncryption } from 'secure-encryption-lib'
```

### 2. Encrypt & Decrypt Data using AES

```typescript
const secretMessage = 'Hello, Secure World!'
const encryptedData = SecureEncryption.encryptAES(secretMessage)
console.log('Encrypted:', encryptedData)

const decryptedData = SecureEncryption.decryptAES(encryptedData)
console.log('Decrypted:', decryptedData)
```

### 3. Encrypt & Decrypt Data using RSA

```typescript
const message = 'Confidential Data'
const encryptedRSA = SecureEncryption.encryptRSA(message)
console.log('RSA Encrypted:', encryptedRSA)

const decryptedRSA = SecureEncryption.decryptRSA(encryptedRSA)
console.log('RSA Decrypted:', decryptedRSA)
```

### 4. Handshake Verification

```typescript
fetch('/handshake', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ serviceId: 'service-123' })
})
  .then(res => res.json())
  .then(console.log)
```

### 5. Rotate RSA Keys

```typescript
fetch('/rotate-keys', { method: 'POST' })
  .then(res => res.json())
  .then(console.log)
```

## API Endpoints

### `POST /handshake`

Initiates a handshake and returns a signed timestamp.

**Request:**

```json
{
  "serviceId": "your-service-id"
}
```

**Response:**

```json
{
  "timestamp": "1623456789012",
  "signature": "hashed-signature"
}
```

### `POST /verify`

Verifies a service request using SHA-256 hashing.

**Request:**

```json
{
  "serviceId": "your-service-id",
  "timestamp": "1623456789012",
  "signature": "hashed-signature"
}
```

**Response:**

```json
{
  "message": "Service verified successfully"
}
```

### `POST /rotate-keys`

Rotates RSA key pairs for enhanced security and stores them in Redis.

**Response:**

```json
{
  "message": "RSA keys rotated successfully"
}
```

## Configuration

### Environment Variables (`.env` file)

```env
PORT=3000
SECRET_KEY=mysecurekey
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=yourpassword
```

## Testing

Run tests using Jest:

```sh
npm test
```

## License

MIT License

## Contributors

- [Vasanthkumar V](https://github.com/)
