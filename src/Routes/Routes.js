import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Leads from "../components/Leads/Leads";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";

export const router=createBrowserRouter([
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"dashboard/leads",
        element:<Dashboard/>,
        children:[
            {
             path:"/dashboard/leads",
             element:<Leads/>
            }
        ]
    }
])