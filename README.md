# Roommate Compatibility App — Frontend

## Overview

This project is the frontend for a **Roommate Compatibility Matching Platform** that helps users discover suitable roommates based on lifestyle preferences such as sleep schedule, food habits, cleanliness level, work mode, and more.

The frontend is built using **React + Vite**, focusing on clean UI structure, responsive layouts, and real-world interaction flows like authentication, profile setup, preference matching, and connection requests.

It communicates with a secure **Spring Boot backend (JWT-based authentication)** and dynamically renders compatibility suggestions between users.

---

## Features Implemented

### Authentication

* Secure login and signup integration
* JWT-based session handling
* Automatic protected route redirection
* Logout functionality

---

### Profile Management

Users can:

* Create their profile
* Update existing profile
* View profile information
* Persist profile data across sessions

Profile includes:

* Name
* Age
* Occupation
* City
* Bio

---

### Lifestyle Preferences System

Users can set roommate compatibility preferences:

* Sleep schedule
* Food habit
* Cleanliness level
* Work mode
* Smoking preference
* Drinking preference
* Guest frequency
* Budget

Smart logic automatically switches between:

* Create preferences mode
* Update preferences mode

depending on whether preferences already exist.

---

### Compatibility Dashboard

The dashboard displays:

* Suggested roommate matches
* Compatibility score percentage
* Shared lifestyle preferences
* User profile summary cards

Each card dynamically updates based on:

* Sent requests
* Accepted connections
* Pending requests

Example states:

* Connect +
* Request Sent
* Connected ✓

---

### Match Request Workflow

Users can:

* Send match requests
* Receive incoming requests
* Accept requests
* Reject requests
* View connection status instantly

UI updates in real-time after actions.

---

### Incoming Requests Tab

Displays:

* Pending connection requests
* Sender information
* Accept / Decline buttons
* Request timestamps

---

### Matching Preferences Highlighting

Shared preferences between users are displayed visually as pills:

Example:

Sleep: Late Sleeper
Food: Vegetarian
Work Mode: Hybrid

This improves explainability of compatibility scoring.

---

### Sidebar Layout System

Persistent sidebar navigation across pages:

* Dashboard
* Preferences
* Profile
* Match Requests
* Logout

Main content scrolls independently for better UX.

---

### Dark Mode Ready Layout Structure

Layout architecture supports easy integration of dark mode styling in future upgrades.

---

## Tech Stack

Frontend:

* React
* Vite
* Axios
* React Router
* Tailwind CSS

State Management:

* React Context API

Authentication:

* JWT Token Storage
* Protected Route Handling

Backend Communication:

REST APIs via Axios instance interceptor

---

## Project Structure

```
src/
 ├── api/
 ├── components/
 ├── context/
 ├── layouts/
 ├── pages/
 ├── routes/
 └── App.jsx
```

---

## UI Highlights

The interface focuses on:

* clean dashboard layout
* card-based matching UI
* compatibility score visualization
* preference highlighting badges
* connection state awareness
* responsive sidebar navigation

Designed with scalability in mind for future features like:

* roommate groups
* expense splitting
* shared dashboards
* notifications
* chat support

---

## Future Improvements

Planned frontend enhancements:

* Dark mode toggle
* Profile avatars upload
* Real-time notifications
* Chat interface for connected roommates
* Group expense management UI
* Match filtering system

---

## Contributing

Contributions are welcome and appreciated!

If you'd like to improve the project, follow these steps:

### 1. Fork the repository

Click the **Fork** button at the top right of this repository.

---

### 2. Clone your fork

```
git clone https://github.com/<your-username>/roommate-compatibility-ui.git
cd roommate-compatibility-ui
```

---

### 3. Create a new branch

Use a descriptive branch name:

```
git checkout -b feature/add-dark-mode
```

or

```
git checkout -b fix/dashboard-connection-status
```

---

### 4. Make your changes

Improve UI, fix bugs, or add features such as:

* dark mode support
* profile avatar upload
* better match filtering
* notifications UI
* accessibility improvements
* mobile responsiveness enhancements

---

### 5. Commit your changes

```
git commit -m "Add: dark mode toggle support"
```

---

### 6. Push your branch

```
git push origin feature/add-dark-mode
```

---

### 7. Open a Pull Request

Go to your fork on GitHub and click:

**Compare & Pull Request**

Provide a clear description of what you changed.

---

### Contribution Guidelines

Please ensure:

* code is clean and readable
* components remain reusable
* UI consistency is maintained
* no sensitive data is committed
* meaningful commit messages are used

---

Thanks for contributing to improving the Roommate Compatibility App!



