# Task Manager App

**A full-stack task management application where users can register, log in, and manage their personal tasks securely. Built with modern technologies including React (Vite), TailwindCSS, Redux Toolkit, Node.js, PostgreSQL, Prisma ORM, and JWT for authentication.**

**📌 Features**

* 🔐 User Authentication (JWT-based login/register)
* ✅ Task Management
  - Create, view, update, and delete personal tasks
  - Task attributes: title, description (optional), status (pending/completed)
* 🔒 Protected Routes using JWT authentication
* 🧾 Form Validation using Zod + React Hook Form
* ⚙️ Backend Validation and error handling 

**🛠️ Tech Stack**

* Frontend: React.js, Redux Toolkit, TailwindCSS, Axios
* Backend: Node.js, Express.js, PostgreSQL, Prisma ORM
* Authentication: JSON Web Tokens (JWT)  

**🎯 Installation & Setup**

* Clone the Repository
  
   ```bash
   git clone https://github.com/saranshh/task-manager-app.git
   cd task-manager-app

* Backend Setup
  
  - Install dependencies:
    ```bash
    cd backend
    npm install
  - Create a .env file and configure:
    ```bash
    DB_URI=your_database_url
    JWT_SECRET=your_jwt_secret
  - Prisma Setup
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
  - Build the Project
    ```bash
    npm run build
  - Start the backend server:
    ``` bash
    nodemon

* Frontend Setup
  
  - Install dependencies:
    ```bash
    cd frontend
    npm install
  - Start the frontend:
    ```bash
    npm run dev
