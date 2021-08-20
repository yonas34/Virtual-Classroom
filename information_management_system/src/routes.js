import { Navigate } from "react-router";
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import ClassMangement from "./pages/ClassMangement";
import Profile from "./pages/profile";
import Schedule from "./pages/Schedule";
import UserManagment from "./pages/UserManagment";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import My_profile from "./pages/SubPages/My_profile";
import Deans_profile from "./pages/SubPages/Deans_profile";
import Chairs_profile from "./pages/SubPages/Chairs_profile";
import Lecturer_profile from "./pages/SubPages/Lecturer_profile";
import Edit_Schedule_Table from "./pages/SubPages/Edit_Schedule_Table";
import Schedule_Table from "./pages/SubPages/Schedule_Table";
import User_List from "./pages/SubPages/User_List";
import Create_new_user from "./pages/SubPages/Create_new_user";
import Create_Class from "./pages/SubPages/Create_Class";
import Add_Course from "./pages/SubPages/Add_Course";
import Create_qr_code from "./pages/SubPages/Create_qr_code";
import Scan_qr from "./pages/SubPages/Scan_qr";
import Post_view from "./pages/SubPages/Post_view";
import About from "./pages/About";
import React from 'react';

const routes=[
{
    path:'app',
    element:<Home/>,
    children:[
        {path:'home',element:<Post_view/>},
{path:'attendance',element:<Attendance/>},
    {path:'attendance/create_qr',element:<Create_qr_code/>},
    {path:'attendance/scan_qr',element:<Scan_qr/>},
{path:'schedule',element:<Schedule/>},
    {path:'schedule/edit_schedule',element:<Edit_Schedule_Table/>},
    {path:'schedule/schedule_table',element:<Schedule_Table/>},
{path:'profile',element:<Profile/>},
{path:'user_management',element:<UserManagment/>},
    {path:'user_management/user_list',element:<User_List/>},
    {path:'user_management/create_new_user',element:<Create_new_user/>},
{path:'class_management',element:<ClassMangement/>},
{path:'profile',element:<Profile/>},

    {path:'class_management/add_course',element:<Add_Course/>},
    {path:'class_management/add_class',element:<Create_Class/>},

    {path:'profile/my_profile',element:<My_profile/>},
    {path:'profile/deans_profile',element:<Deans_profile/>},
    {path:'profile/chairs_profile',element:<Chairs_profile/>},
    {path:'profile/lecturer_profile',element:<Lecturer_profile/>},
    
{path:'about',element:<About/>},


{path:'*',element:<Navigate to='/404'/>}

]

},
{
path:'/',
element:<Login/>


}



]
export default routes;