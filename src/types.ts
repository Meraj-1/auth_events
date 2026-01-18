
export type AuthEventType =
  | "login"
  | "logout"
  | "register"
  | "password_changed"
  | "role_changed"
  | "session_revoked"
  | "suspicious_login"
  | "token_expired";



export interface AuthEvent {
  type: AuthEventType;
  userId: string;
  sessionId?: string;
  ip?: string;
  userAgent?: string;
  provider?: "google" | "firebase" | "auth0" | "custom";
  email?: string;
  roles?: string[];
  status?: "success" | "failed";
  metadata?: Record<string, any>;
  timestamp: Date;
}


export type AuthEventHandler = (
  event: AuthEvent,
  context: unknown
) => void | Promise<void>;
