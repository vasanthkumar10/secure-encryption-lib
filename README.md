# SecureEncryption Library

## 🚀 Overview

SecureEncryption is a TypeScript library that provides robust encryption mechanisms using **AES-256-CBC** and **RSA encryption**. It ensures secure data handling with automatic key management.

---

## 📦 Installation

Install the package using npm:

```sh
npm install secure-encryption-lib
```

or using yarn:

```sh
yarn add secure-encryption-lib
```

---

## 📌 Usage

### 🔹 Import the Library

```ts
import { SecureEncryption } from 'secure-encryption-lib'
```

### 🔹 Initialize SecureEncryption

```ts
const secureEncryption = new SecureEncryption()
```

---

## 🔑 AES Encryption & Decryption

### ✅ Encrypt Data using AES

```ts
const secretKey = 'your-16-character-long-secret-key' // Must be 16 characters
const text = 'Hello, Secure World!'

const encryptedText = secureEncryption.encryptAES(text, secretKey)
console.log('Encrypted:', encryptedText)
```

### ✅ Decrypt Data using AES

```ts
const decryptedText = secureEncryption.decryptAES(encryptedText, secretKey)
console.log('Decrypted:', decryptedText)
```

---

## 🔐 RSA Encryption & Decryption

### ✅ Encrypt Data using RSA

```ts
const encryptedRSA = await secureEncryption.encryptRSA('Sensitive Data')
console.log('RSA Encrypted:', encryptedRSA)
```

### ✅ Decrypt Data using RSA

```ts
const decryptedRSA = await secureEncryption.decryptRSA(encryptedRSA)
console.log('RSA Decrypted:', decryptedRSA)
```

---

## 🛠 Configuration

SecureEncryption supports optional configurations. You can provide a custom configuration object when initializing:

```ts
const config = {
  redisConfig: { host: 'localhost', port: 6379 },
  tokenExpiry: 3600
}

const secureEncryption = new SecureEncryption(config)
```

---

## 📝 Methods

| Method                                 | Description                      |
| -------------------------------------- | -------------------------------- |
| `encryptAES(text, secretKey)`          | Encrypts text using AES-256-CBC. |
| `decryptAES(encryptedText, secretKey)` | Decrypts AES-encrypted text.     |
| `encryptRSA(text)`                     | Encrypts text using RSA.         |
| `decryptRSA(encryptedText)`            | Decrypts RSA-encrypted text.     |

---

## 🎯 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

- **Author:** Vasanthkumar
- **GitHub:** [@vasanthkumar10](https://github.com/vasanthkumar10)
- **Email:** vasizebron10@gmail.com
