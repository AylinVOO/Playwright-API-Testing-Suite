# 🏨 API Automation Suite: Restful-Booker Integration
**A specialized Playwright-JS Framework for Backend Validation**

This repository contains a full-lifecycle API testing suite designed to validate data integrity, security protocols, and state management within a hotel booking system.

---

## 🏗️ Technical Architecture & CRUD Implementation

The framework is built to handle the four core database operations (CRUD) through a browser-less environment, prioritizing speed and reliability.

| Operation | HTTP Method | Implementation Logic |
| :--- | :--- | :--- |
| **Create** | `POST` | Dispatched nested JSON payloads to the `/booking` endpoint to verify record generation. |
| **Read** | `GET` | Validated data retrieval and checked for schema consistency (Price, Dates, Names). |
| **Update** | `PUT` | Implemented secure state changes by injecting Auth Tokens into request headers. |
| **Delete** | `DELETE` | Verified record removal and confirmed `404 Not Found` status on subsequent lookups. |

---

## 🛠️ Key Engineering Challenges Solved

### 1. Handling Secure State (Tokenization)
**Problem:** Restricted endpoints like `PUT` and `DELETE` return `403 Forbidden` without proper authorization.
**Solution:** I developed a multi-step authentication flow. The suite first hits the `/auth` endpoint to retrieve a **JWT-style token**, which is then dynamically stored and injected into the `Cookie` header of all restricted requests.

### 2. Logic vs. Syntax Debugging
**Problem:** Early iterations faced `TypeError` and `SyntaxError` regarding arrow function boundaries and assertion placement.
**Solution:** By utilizing the **Playwright Trace Viewer**, I isolated a parenthesis mismatch in the `expect().toBe()` chain. This refined my understanding of how the test runner parses asynchronous assertions.

### 3. Asynchronous Data Management
**Problem:** Public APIs are dynamic; requesting a static ID (e.g., `/booking/1`) often results in a failure if that specific ID was deleted by another user.
**Solution:** I implemented **Self-Healing logic**. The scripts are designed to fetch a list of all current IDs first, then select an active ID for testing. This ensures the suite is resilient to external data changes.

---

## 📊 Performance Benchmarks
* **Execution Speed:** The entire CRUD cycle (5+ tests) executes in **under 1.2 seconds**.
* **Stability:** Zero UI-related "flakiness" due to the removal of DOM dependencies.
* **Coverage:** Validates both positive (200 OK) and negative (404 Not Found) server responses.

---

## 🚀 Getting Started
1. **Clone:** `git clone [repository-link]`
2. **Setup:** `npm install`
3. **Execute:** `npx playwright test`
4. **Report:** `npx playwright show-report`