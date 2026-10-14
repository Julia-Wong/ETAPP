# Tab

**Split expenses, not friendships.**

Tab is a modern, intuitive mobile application designed to eliminate the awkwardness of IOUs. Built for friends, roommates, and travel companions, Tab makes it effortless to track shared debts, request payments, and settle balances seamlessly.

---

## ✨ Features

* **Tracking debts:** Quickly log shared bills, dining out, or group trip expenses and split them evenly or customly.
* **Settle up:** Streamlined debt consolidation that calculates the minimal number of transactions needed to clear all balances.
* **Real-time balances:** Instantly see who owes you, whom you owe, and your net total balance across all groups.
* **Push notifications:** Instant alerts for new requests, payment reminders, and settlement updates.
* **E-transfer integration:** Seamless integration with standard payment links and e-transfers for instant settlement.

---

## 🛠 Tech Stack

* **Frontend Framework:** React Native
* **Development Platform:** Expo (Managed Workflow)
* **Language:** TypeScript / JavaScript
* **Backend Platform (Planned):** Supabase or Firebase (Authentication, Real-time DB)
* **State Management:** React Context API / "Brain" component architecture

---

## 🗂 Project Structure

The app's UI is divided into the following core screens:

* **`Auth`**: Landing, Log In, Sign Up, and Welcome/Onboarding flow.
* **`Home`**: Real-time net balance, quick actions, pending requests, and recent activity.
* **`History`**: Detailed chronological log of past transactions and specific friend histories.
* **`Send`**: Numpad interface to create a new expense or request payment.
* **`Friends`**: Friend list, contact search, and friend code management.
* **`Profile`**: Personal info, E-transfer settings, security, and app preferences.

---

## 🚀 Getting Started

Follow these steps to get a local development environment up and running.

### Prerequisites
Ensure you have the following installed on your machine:
* **Node.js** (v18.0.0 or higher)
* **npm** or **yarn**
* **Expo Go** app installed on your iOS or Android device (for physical device testing)

### Installation

1. **Clone the repository:**
   `git clone https://github.com/your-username/tab-app.git`
   `cd tab-app`

2. **Install dependencies:**
   `npm install`

3. **Start the development server:**
   `npx expo start`

### Running on Devices

| Environment | Instructions |
| :--- | :--- |
| **Physical Device** | Scan the QR code printed in the terminal using the **Expo Go** app (Android) or **Camera App** (iOS). |
| **iOS Simulator** | Press `i` in the terminal output (requires macOS and Xcode). |
| **Android Emulator** | Press `a` in the terminal output (requires Android Studio). |