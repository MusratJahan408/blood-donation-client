import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ErrorPage from "../Components/ErrorPage";
import Search from "../Components/Search";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Profile from "../Pages/Dashboard/Profile";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests";
import EditDonationRequest from "../Pages/Dashboard/EditDonationRequest";
import DonationRequestDetails from "../Pages/Dashboard/DonationRequestDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        element:<Home></Home>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:'/search-donors',
        element:<Search></Search>
      },
      {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
          {
             index: true,
             element: <DashboardHome></DashboardHome> 
          }, 
          {
             path: "profile",
             element: <Profile></Profile>
          },
          {
             path: "create-donation-request",
             element: <CreateDonationRequest></CreateDonationRequest>
          },
          { 
            path: "my-donation-requests",
            element: <MyDonationRequests></MyDonationRequests>
          },
          {
           path: "edit-donation-request/:id",
           element: <EditDonationRequest></EditDonationRequest>
          }, 
          { 
            path: "donation-request/:id", 
            element: <DonationRequestDetails></DonationRequestDetails> }, 
        ],
      }

    ]
  },
]);

