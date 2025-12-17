import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ErrorPage from "../Components/ErrorPage";
import Search from "../Components/Search";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Profile from "../Pages/Dashboard/Profile";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests";
import EditDonationRequest from "../Pages/Dashboard/EditDonationRequest";
import DonationRequestDetails from "../Pages/Dashboard/DonationRequestDetails";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AllUsers from "../Admin/AllUsers";
import AllDonationRequests from "../Admin/AllDonationRequests";
import VolunteerRoute from "./VolunteerRoute";
import BloodDonationRequestDetails from "../Components/BloodDonationRequestDetails";
import BloodDonationRequests from "../Components/BloodDonationRequests";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/donation-requests",
        element: <BloodDonationRequests></BloodDonationRequests>
      },
      {
        path: "donation-request-details/:id",
        element: (
          <PrivateRoute>
            <BloodDonationRequestDetails></BloodDonationRequestDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/search-donors",
        element: <Search></Search>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests></MyDonationRequests>,
      },
      {
        path: "edit-donation-request/:id",
        element: <EditDonationRequest></EditDonationRequest>,
      },
      {
        path: "donation-requests/:id",
        element: <DonationRequestDetails />,
      },

      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <VolunteerRoute>
            <AllDonationRequests></AllDonationRequests>
          </VolunteerRoute>
        ),
      },
    ],
  },
]);
