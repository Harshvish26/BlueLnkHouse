<<<<<<< HEAD
# 📘 Blue Ink House - Author & Book Management Platform

This is a lightweight Author and Book Management Platform developed as an assignment for the SDE Intern role at Blue Ink House.

The platform provides a simple interface for authors to register, submit books, and allows an administrator to approve author accounts before they can publish content.

## 🚀 Key Features

* **Author Management:** Registration, viewing status (`pending`/`approved`), and administrative approval.
* **Book Management:** Add, List, and Search books by title, genre, and author name.
* **Access Control (Bonus):** JWT Authentication to secure the book posting API.
* **Frontend:** Built using simple EJS templates for quick prototyping and demonstration.

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Backend** | Node.js, Express.js | Robust routing and API handling. |
| **Database** | MongoDB (via Mongoose) | Persistent storage for authors and books. |
| **Frontend** | EJS (Embedded JavaScript) | Server-Side Rendering for the basic UI. |
| **Authentication (Bonus)**| JSON Web Tokens (JWT), bcryptjs | Securing the Book Post endpoint. |

## 📦 Getting Started

### Prerequisites

You must have Node.js and npm installed on your system.

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone [(https://github.com/Harshvish26/Blue-Lnk-House)]
    cd Blue-Lnk-House
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables (.env):**
    Create a file named `.env` in the root directory and add your MongoDB connection string and a JWT Secret:
    ```
    PORT=5000
    MONGO_URI=mongodb+srv://<your_credentials_here>/blueinkdb?retryWrites=true&w=majority
    JWT_SECRET=a_very_secure_secret_key_for_jwt
    ```

4.  **Run the application:**
    ```bash
    # Runs the server using nodemon (if installed) or node
    npm run dev 
    ```
    The application will be available at `http://localhost:5000`.

## 🔒 Special Admin Credentials

To facilitate quick testing of the Author Approval flow, use the following credentials for any manual internal checks (like approving authors via the API or simulating the Admin panel logic):

> **Email:** `admin@blueink.com`
> **Password:** `Admin@123`

**(Note: In this implementation, the Admin Panel does not require a formal JWT login; the Author Approval API is accessible via the Admin Panel link on the frontend.)**

## 🗺️ Project Flow and Walkthrough

The platform follows a simple pending/approved workflow:

1.  **Author Registration:** An author registers via the `/authors/add` page. Their account status is automatically set to `"pending"`.
2.  **Admin Review:** An administrator visits the `/admin/authors` page. They can see all pending requests.
3.  **Approval:** The administrator clicks the "Approve" button, which calls the `PATCH /authors/:id/approve` endpoint, changing the author's status to `"approved"`.
4.  **Book Posting:** The approved author logs in (`/authors/login`), gets a JWT token, and can now successfully add books via the `/books/add` page. The backend strictly checks the JWT payload to ensure the author is `"approved"`.

## ⚡ API Endpoints Documentation

The following RESTful APIs are available:

| Method | Endpoint | Description | Required Body (Example) |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/authors` | Create a new Author (Status: `pending`). | `{name, email, password, bio}` |
| `GET` | `/api/authors` | List all Authors with their book count. | None |
| `PATCH`| `/api/authors/:id/approve`| Change Author status from `pending` to `approved`. | None |
| `POST` | `/api/books` | Add a new Book (Requires **JWT** in Authorization header). | `{title, description, genre, author_id}` |
| `GET` | `/api/books` | List all Books with author details. | None |
| `GET` | `/api/books/search` | Search books by `q` (title, genre, or author name). | Query Param: `?q=fantasy` |

## 🏗️ Architecture Design

The project utilizes a straightforward **Three-Tier Monolithic Architecture**:

* **Presentation Layer (EJS):** Handles all visual rendering and user interaction.
* **Application Layer (Node/Express):** Contains all API logic, data validation, and business rules (like checking author approval status).
* **Data Layer (MongoDB/Mongoose):** Manages data persistence and querying.


## 📝 Deliverables and Self-Assessment

This project fulfills all core requirements of the Blue Ink House SDE Intern Assignment, including clean APIs, form validation, and clear data models. The bonus requirement for **JWT Auth** has also been implemented to secure the book posting process.

*Developed by 
Harsh Vishwakarma
https://github.com/Harshvish26/Blue-Lnk-House



=======
# BlueLnkHouse
>>>>>>> 6277ca60567ebffccc72828aa198380c5d0c1f09
