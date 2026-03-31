# Restful-Booker API Automation
Repository for an API automation suite focused on CRUD lifecycle validation and Secure Token handling.

---

## 🏗️ Architecture

The framework is structured to separate test logic from configuration:

* **tests/**: Contains test files for the full CRUD cycle (Auth, Create, Update, and Delete).
* **playwright.config.js**: The main file for API settings and URLs.
* **.github/workflows/**: Automated test execution via GitHub Actions.

## 💡 Implementation Details

* **Security (Auth Tokens)**: Some actions require a secret token. I built a flow that retrieves a **JWT token** and uses it automatically to authorize restricted requests.
* **Stability (Self-Healing)**: To prevent failures caused by deleted data, the script finds an **active Booking IDs** before execution to ensure the test always has a real target.
* **Performance**: Optimized for browser-less execution, allowing the entire suite to run in **under 1.5 seconds**.
* **Reports**: Uses Playwright HTML reporting to provide a visual breakdown of every request and server response.

## 🛠️ Commands

* **Install Dependencies**: `npm install`
* **Execute Tests**: `npx playwright test`
* **View Report**: `npx playwright show-report`