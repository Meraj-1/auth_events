import { AuthEvent, AuthEventHandler, AuthEventType } from "../types";

export class EventBus {
  private handlers: Map<AuthEventType, AuthEventHandler[]> = new Map();

  on(type: AuthEventType, handler: AuthEventHandler) {
    const existing = this.handlers.get(type) ?? [];
    this.handlers.set(type, [...existing, handler]);
  }

  async emit(event: AuthEvent, context: unknown) {
    const handlers = this.handlers.get(event.type) ?? [];
    for (const handler of handlers) {
      await handler(event, context);
    }
  }
}