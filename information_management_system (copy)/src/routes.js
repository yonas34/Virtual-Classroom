import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import AddClass from './pages/AddClass';
import CustomerList from './pages/CustomerList';
import Dashboard from './pages/Dashboard';
import Edit_Classes from './pages/Edit_Classes';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Register_Lecturer from './pages/Register_Lecturer';
import Register_Student from './pages/Register_Student';
import Settings from './pages/Settings';
import React from 'react';
const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: 'register_student', element: <Register_Student/> },
      { path: 'register_lecturer', element: <Register_Lecturer/> },
      { path: 'register_class', element: <AddClass/> },
      { path: 'edit_classes', element: <Edit_Classes/> },

      { path: 'register', element: <Register/> },


      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
