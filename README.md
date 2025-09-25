Getting Started
=================================
Prerequisites
Node.js (v16+)
MySQL Server
npm / yarn

Technologies Used
=================================
Frontend:
React.js (JSX)
Tailwind CSS
Framer Motion (UI Animations)
React Router DOM
Backend:
Node.js + Express
MySQL (via mysql2)
bcrypt (Password Hashing)
CORS, JSON Parsing

TODO
=================================
 Add Profile
 Export Patient Data (CSV, PDF)
 Pagination + Search on Backend
 Role-based Access Control (Admin/User)
 Mobile Responsive Design

Frontend Pages
=================================
Route	    Description
/login	    Login form
/register	Registration form
/dashboard	Dashboard + stats
/patients	Patient list + actions

Frontend Setup
=================================
npm install
npm run dev

Backend Setup
=================================
npm install
npm start
localhost:8081

Configure MySQL (Default):

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "medicalDB"
});


Project Structure
=================================
medical-management-system/
├── backend/              # Node.js + Express backend
│   └── index.js          # Main server file
├── frontend/             # React.js frontend app
│   └── src/
│       └── pages/
            └── components/
└── database/
    └── medicalDB.sql     # MySQL dump file (optional)

Login Credentials (Admin)
=================================
Role	Email	            Password
Admin	admin@gmail.com	    12345678



Screenshots
=================================
