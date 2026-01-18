import { EventBus } from "./EventBus";
import { AuthEvent, AuthEventType, AuthEventHandler } from "../types";

export class AuthEvents {
  private bus = new EventBus();

  on(type: AuthEventType, handler: AuthEventHandler) {
    this.bus.on(type, handler);
  }

  async emit(
    type: AuthEventType,
    payload: Omit<AuthEvent, "type" | "timestamp">
  ) {
    const event: AuthEvent = {
      type,
      timestamp: new Date(),
      ...payload
    };
    await this.bus.emit(event, this.createContext());
  }

  private createContext() {
    // placeholder for session helpers, revoke, etc.
    return {};
  }
}
