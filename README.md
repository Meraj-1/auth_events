# auth-events

![npm](https://img.shields.io/npm/v/auth-events)

# Auth Events 

**`auth-events`** is a lightweight, powerful, and extensible Node.js library to handle authentication and user-related events in your application. It provides an **event-driven architecture** for login, logout, registration, password changes, role updates, device tracking, risk signals, and more.  

**`auth-events`** is a lightweight, powerful, and extensible Node.js library to handle authentication and user-related events in your application. It provides an **event-driven architecture** for login, logout, registration, password changes, role updates, device tracking, risk signals, and more.  

Designed for **security, audit, and automation**, it works with any auth provider (custom, Google, Firebase, Auth0, etc.) and can power your **enterprise-grade authentication workflows**.

---

## Features 

- 🔹 **Core Auth Events:** login, logout, register, password changes, role updates
- 🔹 **Security & Risk Events:** suspicious login, brute force detection, IP/device risk, geo-velocity
- 🔹 **Session & Token Lifecycle:** session creation, expiration, token issued/revoked/refresh
- 🔹 **Device & Trust Tracking:** new device detection, device trust/untrust
- 🔹 **Multi-Factor & Verification Events:** OTP, 2FA, email/phone verification
- 🔹 **Update/Change Tracking:** profile updates, email/phone changes, previous and new values
- 🔹 **Audit & Meta:** requestId, correlationId, custom metadata
- 🔹 **Developer-Friendly Context:** logger, db, cache, env injected into handlers
- 🔹 **Decision-Aware Handlers:** handlers can allow, block, or challenge actions
- 🔹 **Enterprise Ready:** support for admin actions, automation, security scoring

---

## Installation

```bash
npm install auth-events
# or
yarn add auth-events

auth-events

A lightweight event layer for authentication flows.

 Mental Model (Read this first)

Think of authentication in two responsibilities:

Auth Code   → WHAT happened?
Auth Events → WHAT should we do about it?


Examples:

Login happened → emit event

Password changed → emit event

New device detected → emit event

auth-events only broadcasts facts.
It does not decide business logic.

This keeps authentication clean and predictable.

 How it works

Your app emits an auth event (e.g. "login").

One or more listeners react to that event.

Authentication logic stays clean and focused.

There is no coupling between auth code and side-effects.

📁 Recommended File Structure

This is where most projects go wrong — structure matters.

src/
├─ auth/
│  ├─ auth.controller.ts      # login, signup, logout
│  ├─ auth.service.ts         # password verification, token logic
│
├─ auth-events/
│  ├─ index.ts                # single AuthEvents instance
│  ├─ listeners/
│  │  ├─ audit.listener.ts
│  │  ├─ security.listener.ts
│  │  ├─ analytics.listener.ts
│  │  └─ notification.listener.ts
│
├─ app.ts
└─ server.ts

🧩 Step 1: Create one global AuthEvents instance

📍 src/auth-events/index.ts

import { AuthEvents } from "auth-events";

export const authEvents = new AuthEvents();


⚠️ Important

Your application should have only one AuthEvents instance.
All listeners and emitters must use this same instance.

🧩 Step 2: Emit events inside existing auth code

📍 src/auth/auth.controller.ts

import { authEvents } from "../auth-events";

export const login = async (req, res) => {
  const user = await authService.login(req.body);

  // Emit fact, not logic
  await authEvents.emit("login", {
    userId: user.id,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    sessionId: req.sessionID
  )});

  res.json({ token: user.token });
};


✅ Login responsibility = done
❌ No logging
❌ No analytics
❌ No security rules

🧩 Step 3: Attach operations using listeners

This is where auth-events shines.

🔐 Security listener

📍 auth-events/listeners/security.listener.ts

import { authEvents } from "../index";

authEvents.on("login", async (event) => {
  if (isNewDevice(event)) {
    await authEvents.emit("new_device_detected", event);
  }
});

📜 Audit logging

📍 auth-events/listeners/audit.listener.ts

authEvents.on("login", async (event) => {
  await AuditLog.create({
    userId: event.userId,
    action: "LOGIN",
    ip: event.ip,
    userAgent: event.userAgent
  });
});

📊 Analytics tracking

📍 auth-events/listeners/analytics.listener.ts

authEvents.on("login", async (event) => {
  analytics.track("user_login", {
    userId: event.userId,
    device: event.userAgent
  )});

🔔 Notifications

📍 auth-events/listeners/notification.listener.ts

authEvents.on("new_device_detected", async (event) => {
  await sendEmail({
    to: event.userId,
    subject: "New device login detected"
  });
});



// Emit a login event
await authEvents.login({
  userId: "123",
  email: "user@example.com",
  ip: "192.168.1.1",
  deviceId: "device_abc123",
  deviceType: "desktop",
  browser: "Chrome",
  country: "IN",
  riskScore: 25,
  status: "success"
});
AuthEvent Interface
Each event provides a rich set of fields for security, auditing, and automation:

export interface AuthEvent {
  type: AuthEventType;           
  userId: string;                
  email?: string;
  roles?: string[];

  // Session & Token
  sessionId?: string;
  tokenId?: string;
  tokenType?: "jwt" | "session";
  tokenIssuedAt?: Date;
  tokenExpiresAt?: Date;

  // Network
  ip?: string;
  isp?: string;
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;

  // Device
  deviceId?: string;
  deviceType?: "mobile" | "desktop" | "tablet";
  os?: string;
  browser?: string;
  userAgent?: string;

  // Auth context
  provider?: "google" | "firebase" | "auth0" | "custom";
  origin?: "web" | "mobile" | "api";
  referrer?: string;
  status?: "success" | "failed";
  failureReason?: string;
  attemptCount?: number;
  authMethod?: "password" | "oauth" | "magic_link" | "otp";

  // Risk signals
  riskScore?: number;
  deviceRiskScore?: number;
  geoVelocityRisk?: boolean;
  isNewDevice?: boolean;
  isNewIP?: boolean;
  isProxy?: boolean;
  isTor?: boolean;
  isBot?: boolean;

  // Update / Change tracking
  changedFields?: string[];
  previousValues?: Record<string, any>;
  newValues?: Record<string, any>;
  updatedBy?: string;
  updatedVia?: "user" | "admin" | "api" | "system";
  changeId?: string;
  previousVersion?: number;
  newVersion?: number;

  // Meta & audit
  metadata?: Record<string, any>;
  requestId?: string;
  correlationId?: string;

  timestamp: Date;
}


AuthEventType
All supported events (enterprise-ready):

export type AuthEventType =
  | "login" | "logout" | "register" | "login_failed"
  | "suspicious_login" | "brute_force_detected"
  | "account_locked" | "account_unlocked"
  | "ip_blocked" | "device_blocked" | "location_changed"
  | "otp_sent" | "otp_verified" | "otp_failed"
  | "mfa_enabled" | "mfa_disabled" | "email_verified" | "phone_verified"
  | "session_created" | "session_revoked" | "session_expired" | "session_refreshed"
  | "token_issued" | "token_refreshed" | "token_revoked" | "token_expired"
  | "new_device_detected" | "device_trusted" | "device_untrusted" | "device_removed"
  | "password_changed" | "role_changed"
  | "profile_updated" | "email_changed" | "phone_changed"
  | "rate_limit_exceeded" | "policy_violation" | "security_rule_triggered" | "risk_score_updated"
  | "provider_linked" | "provider_unlinked" | "provider_login" | "provider_error";




Developer Tips

Use changedFields, previousValues, and newValues for auditing profile updates.

Use riskScore, isNewDevice, and geoVelocityRisk for security automation.

Handlers can return actions: allow, block, or challenge (OTP, 2FA).

Inject logger, db, cache in context for advanced workflows.

Can be extended with plugins or middleware for notifications (email/SMS), dashboards, or analytics.



Why use auth-events?
Single source of truth for all auth-related actions
Real-time risk analysis and automation
Easy to integrate with any auth provider (custom, Firebase, Auth0, etc.)
Enterprise-ready with audit trails, session management, MFA, and device trust


Future Improvements
Webhooks / external notifications
Priority-based handler execution
Event persistence for audit / replay
Rule engine for automated security actions

