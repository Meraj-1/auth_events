# auth-events

![npm](https://img.shields.io/npm/v/auth-events)

# Auth Events 


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





Basic Usage
import { AuthEvents } from "auth-events";

const authEvents = new AuthEvents();

// Listen for login events
authEvents.on("login", async (event, context) => {
  context.logger?.info("Login event received", { event });

  // Example: block login if device is new and riskScore high
  if (event.isNewDevice && event.riskScore && event.riskScore > 80) {
    return { action: "block", reason: "High risk new device" };
  }

  return { action: "allow" };
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
  type: AuthEventType;           // Event type (login, logout, etc.)
  userId: string;                // Unique user ID
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
✅ Single source of truth for all auth-related actions

✅ Real-time risk analysis and automation

✅ Easy to integrate with any auth provider (custom, Firebase, Auth0, etc.)

✅ Enterprise-ready with audit trails, session management, MFA, and device trust

Future Improvements
Webhooks / external notifications

Priority-based handler execution

Event persistence for audit / replay

Rule engine for automated security actions
