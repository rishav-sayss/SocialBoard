 <div align="center">

# 📸 SocialBoard

**A full-stack image sharing platform built with React, TypeScript, Node.js, Express, and MongoDB.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](#-how-to-contribute)
[![License](https://img.shields.io/badge/license-Open%20for%20Learning-blue?style=flat-square)](#-license)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [How to Contribute](#-how-to-contribute)
- [Contribution Rules](#-contribution-rules)
- [Pull Request Example](#-pull-request-example)
- [Reporting Issues](#-reporting-issues)
- [Code of Conduct](#-code-of-conduct)
- [License](#-license)

---

## ✨ Features

| | |
|---|---|
| 🔐 | User Authentication & Authorization |
| 🖼️ | Image Upload & Sharing |
| 👤 | User Profiles & Social Handles |
| ❤️ | Like & Comment |
| 🎨 | Light & Green Themes |
| 🛠️ | Admin Dashboard |
| 🧑‍⚖️ | Role-Based Access Control |
| 📱 | Responsive Design |
| ⚡ | Real-Time Updates |

---

## 🧰 Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**Frontend**
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Zustand
- React Router

</td>
<td valign="top" width="50%">

**Backend**
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- Cloudinary

</td>
</tr>
</table>

---

## 📁 Project Structure

```text
SocialBoard/
├── client/
│   └── src/
│       ├── features/
│       ├── shared/
│       ├── lib/
│       └── routes/
│
└── server/
    └── src/
        ├── controllers/
        ├── models/
        ├── routes/
        ├── middleware/
        ├── config/
        ├── utils/
        └── types/
```

---

## 🤝 How to Contribute

We welcome contributions to improve SocialBoard! Follow the steps below to get started.

### 1️⃣ Fork the Repository
Click the **Fork** button on the GitHub repository.

### 2️⃣ Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/SocialBoard.git
cd SocialBoard
```

### 3️⃣ Create a New Branch
```bash
git checkout -b feature/your-feature-name
```
Examples:
```bash
git checkout -b feature/comment-ui
git checkout -b fix/login-error
git checkout -b feature/profile-page
```

### 4️⃣ Install Dependencies

**Frontend**
```bash
cd client
npm install
```

**Backend**
```bash
cd ../server
npm install
```

### 5️⃣ Configure Environment Variables
Create `.env` files according to the required environment variables.

> ⚠️ **Do not commit `.env` files or any secret keys.**

### 6️⃣ Make Your Changes
Follow the existing project architecture. For frontend features, use the feature-based structure:

```text
features/
└── feature-name/
    ├── components/
    ├── hooks/
    ├── services/
    ├── state/
    └── pages/
```

Keep API calls inside `services/` and avoid putting business logic directly inside UI components.

### 7️⃣ Test Your Changes
Before creating a Pull Request, make sure to:
- ✅ Test the feature locally
- ✅ Check existing functionality
- ✅ Check responsive design
- ✅ Check API errors and loading states
- ✅ Make sure there are no TypeScript or build errors

**Frontend**
```bash
cd client
npm run build
```

**Backend**
```bash
cd server
npm run build
```

### 8️⃣ Commit Your Changes
Use a clear, conventional commit message.
```bash
git add .
git commit -m "feat: add comment functionality"
```
Examples:
```text
feat: add profile editing
fix: resolve login issue
feat: add comment section
fix: resolve image upload error
refactor: improve post service
docs: update README
```

### 9️⃣ Push Your Branch
```bash
git push origin feature/your-feature-name
```

### 🔟 Create a Pull Request
Go to the original GitHub repository and create a **Pull Request** from your fork.

In the Pull Request description, mention:
- What you changed
- Why you made the change
- How you tested it
- Any issues or limitations

---

## 📏 Contribution Rules

1. Keep changes focused on one feature or bug.
2. Follow the existing project architecture.
3. Do not commit `.env` files or secret keys.
4. Do not modify unrelated code.
5. Use meaningful variable, function, and component names.
6. Keep the code simple and maintainable.
7. Test your changes before submitting a Pull Request.
8. Do not add unnecessary dependencies.
9. Update documentation when required.
10. Be respectful and constructive during code review.

---

## 📝 Pull Request Example

```text
Title:
feat: add comment functionality

Description:

### Changes
- Added comment API integration
- Added comment section UI
- Added edit and delete comment functionality

### Testing
- Tested locally
- Tested comment creation
- Tested comment deletion
- Tested responsive UI

### Screenshots
Add screenshots if the change includes UI updates.
```

---

## 🐛 Reporting Issues

If you find a bug, please [create a GitHub Issue](../../issues) and include:

- Clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots or error logs (if applicable)
- Browser/environment information

---

## 🧭 Code of Conduct

Please be respectful to other contributors and maintain a friendly, professional, and collaborative environment.

---

## 📄 License

This project is open for learning and collaboration.

---

<div align="center">

Made with ❤️ by the SocialBoard community

</div>
