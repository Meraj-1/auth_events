import { AuthEvents } from "../../dist/index.js";

console.log("=== AuthEvents Test Start ===");

const auth = new AuthEvents();

auth.on("login", (event) => {
  console.log("LOGIN EVENT RECEIVED");
  console.log(event);
});

await auth.emit("login", {
  userId: "user_123",
  sessionId: "sess_1",
  ip: "1.2.3.4",
  userAgent: "Chrome/Mac"
});

console.log("=== Test End ===");
