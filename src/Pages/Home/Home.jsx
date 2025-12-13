import React from "react";
import Banner from "./Banner";
import Featured from "./Featured";
import ContactSection from "./ContactSection";

const Home = () => {
  return <div>
    
    <Banner></Banner>
    <Featured></Featured>
    <ContactSection></ContactSection>
  </div>;
};

export default Home;

// {
  //   path: '/dashboard',
  //   element: (
  //     <PrivateRoute>
  //       <DashboardLayout />
  //     </PrivateRoute>
  //   ),
  //   children: [
  //     {
  //       index: true,
  //       element: (
  //         <PrivateRoute>
  //           <Statistics />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'add-plant',
  //       element: (
  //         <PrivateRoute>
  //           <AddPlant />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'my-inventory',
  //       element: (
  //         <PrivateRoute>
  //           <MyInventory />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'manage-users',
  //       element: (
  //         <PrivateRoute>
  //           <ManageUsers />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'profile',
  //       element: (
  //         <PrivateRoute>
  //           <Profile />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'my-orders',
  //       element: (
  //         <PrivateRoute>
  //           <MyOrders />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'manage-orders',
  //       element: <ManageOrders />,
  //     },
  //   ],
  // },