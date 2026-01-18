# auth-events

![npm](https://img.shields.io/npm/v/auth-events) ![license](https://img.shields.io/github/license/<your-username>/auth-events)



# auth-events — Authentication Event Engine for Node.js

A lightweight, open-source Node.js library to **listen, track, and react to authentication events** in a clean, event-driven way.

Authentication providers like Auth0, Clerk, Firebase, or custom JWT systems handle authentication well — but they don’t give you enough control over what happens *after authentication.*

That’s where **auth-events** fits in.

---

## 🚀 What Problem Does It Solve?

Most applications need to react when authentication events occur.

| Event | Purpose |
|------|--------|
| User logs in | Track activity |
| Password changes | Revoke sessions |
| Role changes | Sync permissions |
| Suspicious login | Trigger security flows |

Instead of scattering this logic across your backend, **auth-events centralizes it using events.**

---

## ✨ Features

- Event-Driven Authentication Logic
- Provider-Agnostic (Auth0, Clerk, Firebase, JWT, etc.)
- Strong TypeScript Support
- Full Post-Authentication Control
- Minimal & Lightweight
- No heavy dependencies

---

## ⚡ Installation

```bash
npm install auth-events
```

or

```bash
yarn add auth-events
```

---

## 🧠 Core Concept

You **emit events when authentication happens**, and **subscribe to them anywhere in your app.**

Supported event types:

```ts
export type AuthEventType =
  | "login"
  | "logout"
  | "password_changed"
  | "role_changed";
```

---

## 📦 Basic Usage

### 1️⃣ Import the Library

```ts
import { auth } from "auth-events";
```

---

### 2️⃣ Listen to Authentication Events

#### Login Event

```ts
auth.on("login", (event) => {
  console.log(`User ${event.userId} logged in at ${event.timestamp}`);
});
```

#### Password Change Event

```ts
auth.on("password_changed", (event) => {
  console.log(`Password changed for user ${event.userId}`);

  // Example:
  // revokeAllSessions(event.userId);
});
```

---

### 3️⃣ Emit Events from Your Auth Logic

#### Example: Login Controller

```ts
auth.emit("login", {
  userId: user.id,
  timestamp: Date.now(),
  ipAddress: req.ip,
});
```

#### Example: Password Update

```ts
auth.emit("password_changed", {
  userId: user.id,
  timestamp: Date.now(),
});
```

---

## 🛠️ Where Can You Use This?

- Security monitoring
- Session management
- Audit logs
- Analytics & tracking
- Notifications
- Role & permission syncing
- Compliance logging

---

## 🧩 Works With

- Auth0
- Clerk
- Firebase Auth
- Custom JWT / Session Auth
- Any Node.js backend

---

## 🌱 Philosophy

**Authentication tells you who the user is.**  
**auth-events tells you what to do next.**

---

## 🤝 Contributing

Contributions and feedback are welcome.  
Open an issue or submit a pull request 🚀

---

## 📄 License

MIT License
