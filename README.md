# auth-events

![npm](https://img.shields.io/npm/v/auth-events) ![license](https://img.shields.io/github/license/<your-username>/auth-events)
auth-events is a lightweight, open-source Node.js library that lets you listen to, track, and react to authentication events in a clean, event-driven way.

Auth providers like Auth0, Clerk, Firebase, or custom JWT systems handle authentication well —
but they don’t give you enough control over what happens after authentication.

That’s where auth-events fits in.

🚀 What Problem Does It Solve?

Most apps need to react when something happens in auth:

User logs in → track activity

Password changes → revoke sessions

Role changes → update permissions

Suspicious login → trigger security flow

Instead of scattering this logic across your codebase, auth-events centralizes everything using events.

✨ Features

Event-Driven Auth Logic
React to auth events like login, logout, password changes, and role updates.

Provider Agnostic
Works with Auth0, Clerk, Firebase, custom JWT, or any backend.

Clean & Typed API
Strong TypeScript support with predefined event types.

Post-Auth Control
Handle security, analytics, logging, and automation after authentication.

Minimal & Lightweight
No heavy dependencies, no magic, easy to extend.

⚡ Installation
npm install auth-events


or with yarn:

yarn add auth-events

🧠 Core Concept

auth-events exposes an event emitter for authentication actions.

You emit events when auth happens, and subscribe to them anywhere in your app.

Supported event types:

export type AuthEventType =
  | "login"
  | "logout"
  | "password_changed"
  | "role_changed";

📦 Basic Usage
1️⃣ Import the library
import { auth } from "auth-events";

2️⃣ Listen to auth events
Login event
auth.on("login", (event) => {
  console.log(
    `User ${event.userId} logged in at ${event.timestamp}`
  );
});

Password change event
auth.on("password_changed", (event) => {
  console.log(
    `Password changed for user ${event.userId}`
  );

  // Example use-case:
  // revokeAllSessions(event.userId)
});

3️⃣ Emit events from your auth logic

Example inside your login controller:

auth.emit("login", {
  userId: user.id,
  timestamp: Date.now(),
  ipAddress: req.ip,
});


Example after password update:

auth.emit("password_changed", {
  userId: user.id,
  timestamp: Date.now(),
});

🛠️ Where Can You Use This?

Security monitoring (suspicious logins)

Session management

Audit logs

Analytics

Notifications

Role & permission syncing

Compliance & tracking

🧩 Works With

Auth0

Clerk

Firebase Auth

Custom JWT / Session auth

Any Node.js backend

🌱 Philosophy

Authentication tells you who the user is
auth-events tells you what to do next

🤝 Contributing

Contributions, ideas, and feedback are welcome.
Open an issue or submit a PR 🚀

📄 License

MIT License
## ⚡ Installation

```bash
npm install auth-events
