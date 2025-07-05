# 📚 BookPinion API

A powerful RESTful API for searching books and managing user reviews.  
Supports user authentication (JWT-based), role-based access control (admin/user), and flexible book search by title, author, or ISBN.

🔗 **Live API**: [https://bookpinion-api.onrender.com](https://bookpinion-api.onrender.com)  
📄 **Docs**: [https://bookpinion-api.onrender.com/docs](https://bookpinion-api.onrender.com/docs)

---

## 🚀 Features

- 🔎 **Search Books**
  - By **title**, **author**, or **ISBN**
  - Pagination supported for large datasets (10K+ books)

- ✍️ **User Reviews**
  - Add, update, delete reviews (1–5 stars)
  - One review per book per user

- 🔐 **Authentication**
  - JWT login system
  - Password hashing with bcrypt
  - Role-based authorization (`user`, `admin`)

- 🧑‍💻 **Admin Privileges**
  - Delete any user's review
  - Delete users

---

## 📦 Tech Stack

- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas (for users & reviews)
- **Book Data**: Stored in-memory from a static JSON file
- **Auth**: JWT, bcrypt
- **Docs**: Static HTML (soon to be dynamic w/ Vanilla JS & Prism.js)

---

## 📂 API Routes Overview

| Method | Route                        | Auth      | Description                     |
|--------|------------------------------|-----------|---------------------------------|
| `GET`  | `/books`                     | ❌        | Get all books (with pagination) |
| `GET`  | `/books/title/:title`        | ❌        | Search books by title           |
| `GET`  | `/books/author/:author`      | ❌        | Search books by author          |
| `GET`  | `/books/isbn/:isbn`          | ❌        | Get book by ISBN                |
| `POST` | `/auth/signup`               | ❌        | Register new user               |
| `POST` | `/auth/login`                | ❌        | Login, receive JWT token        |
| `DELETE` | `/user/:id`               | 🔒        | Delete self or (admin) any user |
| `GET`  | `/reviews/:isbn`            | ❌        | Get reviews for a book          |
| `POST` | `/reviews/:isbn`            | 🔒        | Add/update review               |
| `DELETE` | `/reviews/:isbn?username=target` | 🔒        | Delete own or (admin) user's review |

> 🔒 = Requires JWT token in `Authorization: Bearer <token>` header

---

## 🛠️ Setup Locally

```bash
git clone https://github.com/Emanuel-DevX/BookPinion-API.git
cd BookPinion-API
npm install
