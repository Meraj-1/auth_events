export type AuthEventType =
  // Core auth
  | "login"
  | "logout"
  | "register"
  | "login_failed"

  // Security & risk
  | "suspicious_login"
  | "brute_force_detected"
  | "account_locked"
  | "account_unlocked"
  | "ip_blocked"
  | "device_blocked"
  | "location_changed"

  // MFA & verification
  | "otp_sent"
  | "otp_verified"
  | "otp_failed"
  | "mfa_enabled"
  | "mfa_disabled"
  | "email_verified"
  | "phone_verified"

  // Session & token
  | "session_created"
  | "session_revoked"
  | "session_expired"
  | "session_refreshed"
  | "token_issued"
  | "token_refreshed"
  | "token_revoked"
  | "token_expired"

  // Device trust
  | "new_device_detected"
  | "device_trusted"
  | "device_untrusted"
  | "device_removed"

  // Account changes
  | "password_changed"
  | "role_changed"
  | "profile_updated"
  | "email_changed"
  | "phone_changed"

  // Automation / system
  | "rate_limit_exceeded"
  | "policy_violation"
  | "security_rule_triggered"
  | "risk_score_updated"

  // Provider
  | "provider_linked"
  | "provider_unlinked"
  | "provider_login"
  | "provider_error";


export interface AuthEvent {
  type: AuthEventType;

  // User
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



export interface AuthEventContext {
  /** Unique request identifier for tracing */
  requestId?: string;

  /** Client network info */
  ip?: string;
  userAgent?: string;

  /** Logger injected by host application */
  logger?: {
    info(message: string, meta?: Record<string, any>): void;
    warn(message: string, meta?: Record<string, any>): void;
    error(message: string, meta?: Record<string, any>): void;
  };

  /** Optional shared resources */
  db?: unknown;        // database connection
  cache?: unknown;     // redis / in-memory cache

  /** Runtime environment */
  env?: "development" | "staging" | "production";
}


export type AuthEventHandler = (
  event: AuthEvent,
  context: AuthEventContext
) => void | Promise<void>;
