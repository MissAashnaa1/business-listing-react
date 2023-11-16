# Business-Listing-Node-Backend

Node server for supporting Business-Listing-Frontend and its Admin Panel.
This repository contains a Node.js server integrating Socket.io for real-time communication, Express for HTTP handling, dotenv for environment variables, API routes, middlewares, and CORS configuration.

## Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Environment Variables:**
   To run this project, you will need to add the following environment variables to your .env file

   - Create a `.env` file in the root directory.
   - Define your environment variables in this file. For example:

     ```plaintext
     PORT = 3000
     MONGO_URI = your_database_url
     FRONTEND_URL =
     FRONTEND_URL2 =
     FRONTEND_URL_HOSTED =
     JWT_SECRET =
     NODE_ENV = Development
     MAIL_SMTP_HOST =
     MAIL_SMTP_PORT =
     MAIL_USER =
     APP_PASSWORD =
     MAIL_SERVICE =
     MAIL_HOST =
     MAIL_AUTH_KEY =
     MAIL_VERIFIER_KEY =
     BACKEND_URL =
     RAZORPAY_KEY_ID =
     RAZORPAY_KEY_SECRET =


     # Add other variables as needed
     ```
