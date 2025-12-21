The main goal of this project is to streamline the blood donation process. It allows users to search for donors based on location and blood group, create donation requests, and manage the entire lifecycle of a donation. It also includes a funding system via Stripe to support the organization's operations.

## ✨ Key Features
* **User Authentication**: Secure registration and login using Firebase (Email/Password and Google Social Login).
* **Role-Based Dashboards**: 
    * **Donor**: Can create donation requests, view recent requests, and manage their profile.
    * **Volunteer**: Can manage donation requests and view stats.
    * **Admin**: Full control over users (block/unblock, role management), donation requests, and organization funding stats.
* **Donation Requests**: Users can create, update, and delete requests. Donors can "accept" a request, changing its status to "inprogress".
* **Donor Search**: Advanced search functionality to find donors by blood group, district, and upazila.
* **Secure Payments**: Integrated Stripe payment gateway for users to donate funds to the organization.
* **Responsive Design**: Fully mobile-responsive UI built with Tailwind CSS and DaisyUI.

## 🛠️ Technologies & Packages Used

### Frontend
* **React (v19)**: Core library for building the UI.
* **Vite**: Fast build tool and development server.
* **Tailwind CSS & DaisyUI**: For modern styling and UI components.
* **React Router**: For handling navigation and private routes.
* **React Hook Form**: For efficient form handling and validation.
* **Axios**: For making API requests to the backend.
* **Firebase**: For authentication and hosting.
* **Lucide React & React Icons**: For beautiful iconography.
* **SweetAlert2 & React Hot Toast**: For interactive alerts and notifications.

### Backend (Used in the Project)
* **Node.js & Express**: Server environment and framework.
* **MongoDB**: NoSQL database for storing user data, donation requests, and payments.
* **Stripe**: To process secure credit card transactions.
* **Dotenv**: To manage environment variables securely.