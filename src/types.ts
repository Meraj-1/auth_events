export type AuthEventType =
  | "login"
  | "logout"
  | "password_changed"
  | "role_changed";

export interface AuthEvent {
  type: AuthEventType;
  userId: string;
  sessionId?: string;
  ip?: string;
  userAgent?: string;
  timestamp: Date;
}

export type AuthEventHandler = (
  event: AuthEvent,
  context: unknown
) => void | Promise<void>;
