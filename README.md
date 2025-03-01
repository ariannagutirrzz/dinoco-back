# **Dinoco Back**

The backend service for the **Dinoco Inventory Management System**, designed to handle the core business logic, database interactions, and API endpoints. This backend is built with **Node.js** and **PostgreSQL**, providing a secure and scalable solution for managing inventory, sales, clients, and more.

---

## **Features**
- RESTful API to manage:
  - Products, purchases, sales, clients, vendors, and stock.
- Secure implementation of CRUD operations with strong validations.
- Database designed with **PostgreSQL**, adhering to 3NF for optimal performance.
- Invoice generation for sales with detailed product and pricing breakdown.
- Statistics module for insights like top-selling products and stock trends.
- Integration-ready endpoints for seamless communication with the frontend.
- Documentation for endpoints using **Postman Collections**.

---

## **Technologies**
- **Backend Framework:** Node.js (Express.js)
- **Database:** PostgreSQL
- **Security:** Validation and authorization implemented for sensitive endpoints
- **Tools:** Postman, Supabase

---

## **Getting Started**
Follow these steps to set up and run the backend locally:

### **Prerequisites**
1. Install **Node.js** (version `22.3.0` recommended).  
   Use NVM if possible.
2. Install **PostgreSQL** for database management.  
   [Download PostgreSQL](https://www.postgresql.org/download/)
3. Clone the repository:
   ```bash
       git clone https://github.com/your-username/dinoco-back.git
       cd yeah-back
   ```

### **Installation**:  
1. Install dependencies
    ```bash    
       npm install
    ```
2. Run the software:
   ```bash
       npm run dev
   ```

---

### **Contributing**:
If you'd like to contribute to this project:

1. Fork the repository.
2. Create a new branch: git checkout -b feature/my-feature.
3. Commit your changes: git commit -m "feat: add my feature".
4. Push your branch: git push origin feature/my-feature.
5. Submit a pull request.
