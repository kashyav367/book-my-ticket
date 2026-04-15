# 🎟️ Book My Ticket - Seat Booking System

A full-stack seat booking system with secure authentication, real-time seat availability, and concurrency-safe booking using PostgreSQL transactions.

---

## 🚀 Features

### 🔐 Authentication
- User Registration (Signup)
- User Login with JWT
- Password hashing using bcrypt

### 🎟️ Seat Booking
- View all seats (Available / Booked)
- Book seats with user name
- Prevent double booking using **FOR UPDATE**

### 🛡️ Security
- JWT-based authentication
- Protected booking routes

### ⚡ Advanced Concepts
- PostgreSQL Transactions (`BEGIN`, `COMMIT`, `ROLLBACK`)
- Row-level locking (`FOR UPDATE`)
- REST API design

---

## 🧱 Tech Stack

- Backend: Node.js, Express.js  
- Database: PostgreSQL (Docker)  
- ORM: Drizzle ORM  
- Auth: JWT + bcrypt  
- Frontend: HTML, Tailwind CSS, JavaScript  

---

## 🧠 Project Flow


Register → Login → Receive Token → Select Seat → Book Seat


---

## 🔄 API Endpoints

### 🔹 Auth Routes
- `POST /auth/register` → Register a new user  
- `POST /auth/login` → Login and get JWT token  

### 🔹 Booking Routes
- `GET /seats` → Fetch all seats  
- `PUT /booking/:id` → Book a seat (Protected Route)

---

## 🔐 Authentication Flow

1. User logs in → receives JWT token  
2. Token is stored in frontend (localStorage)  
3. Token is sent in request headers:


Authorization: Bearer <token>


4. Middleware verifies token before booking  

---

## 🎯 Seat Booking Logic

- Check seat availability (`isbooked = 0`)
- Lock row using:

```sql
SELECT * FROM seats 
WHERE id=$1 AND isbooked=0 
FOR UPDATE;
Prevents race conditions (double booking)
💥 Database Fix

Issue:

column user_id does not exist

Fix:

ALTER TABLE seats ADD COLUMN user_id INT;
🧪 Testing Flow
1. Register
POST /auth/register
2. Login
POST /auth/login
3. Book Seat
PUT /booking/:id

👉 Add JWT token in headers before booking

🚀 How to Run Locally
1. Clone the repo
git clone https://github.com/your-username/book-my-ticket.git
cd book-my-ticket
2. Install dependencies
npm install
3. Start server
npm run dev
🐳 Run PostgreSQL with Docker
docker compose up
⭐ Highlight

Used PostgreSQL transactions + row-level locking (FOR UPDATE) to ensure safe and consistent seat booking.

👨‍💻 Author

Ankit kumar Singh
