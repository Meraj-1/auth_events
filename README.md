# auth-events

![npm](https://img.shields.io/npm/v/auth-events) ![license](https://img.shields.io/github/license/<your-username>/auth-events)

**auth-events** is a lightweight, open-source Node.js library designed to **track, monitor, and react to authentication events** across any authentication provider.  

While providers like Auth0, Clerk, or Firebase handle authentication, they do **not provide an easy way to control and respond to post-auth events**. This library fills that gap by giving developers **visibility, control, and automation** over everything that happens after login.

---

## 🚀 Features

- **Unified Event Tracking:** login, logout, password changes, role updates — all in one consistent API  
- **Session Intelligence:** track active sessions, devices, locations, and token lifetimes  
- **Rule Engine:** define custom logic for auth events (revoke sessions, force re-auth, trigger webhooks)  
- **Provider-Agnostic:** works with Auth0, Clerk, Firebase, or any custom JWT auth  
- **Developer-First:** minimal setup, zero magic, easy integration  

---

## 💡 Why Use auth-events?

Traditional auth providers solve "who the user is", but **what happens after login** is often messy and error-prone.  

With **auth-events**, developers can:  
- Track all user sessions and devices  
- Automatically enforce security rules (e.g., revoke old sessions after password change)  
- React to suspicious logins or role changes  
- Gain peace of mind and focus on business logic instead of boilerplate auth management  

---

## ⚡ Installation

```bash
npm install auth-events
