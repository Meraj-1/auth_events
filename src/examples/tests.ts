// Create this at C:\Users\mohdm\development\Meraj\auth-events\examples\tests.ts
import { AuthEvents } from "../core/AuthEvents.js"; // .js required in ESM

const auth = new AuthEvents();

auth.on("login", (event) => {
  console.log(`LOGIN EVENT: User ${event.userId} logged in from ${event.ip}`);
});

await auth.emit("login", {
  userId: "user_123",
  sessionId: "sess_1",
  ip: "1.2.3.4",
  userAgent: "Chrome/Mac"
});
