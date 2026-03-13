import { createBrowserRouter } from "react-router";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import AllAssignments from "../Pages/AllAssignments";
import Login from "../Pages/Login";
import Register from "../Pages/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <h2>No Routes Found</h2>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/all-assignments',
            element: <AllAssignments></AllAssignments>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        }
    ]
  },
]);

export default router