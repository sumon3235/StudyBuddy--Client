import { createBrowserRouter } from "react-router";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import AllAssignments from "../Pages/AllAssignments";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivetRoutes from "./PrivetRoutes";
import PendingAssignments from "../Components/PendingAssignments";
import CreateAssignment from "../Pages/CreateAssignment";
import UpdateAssignment from "../Pages/UpdateAssignment";
import AssignmentDetails from "../Pages/AssignmentDetails";
import GiveMarks from "../Pages/GiveMarks";


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
        },
        {
            path: '/pending-assignments',
            element: <PrivetRoutes><PendingAssignments></PendingAssignments></PrivetRoutes>
        },
        {
            path: '/create-assignment',
            element: <CreateAssignment></CreateAssignment>
        },
        {
            path: '/update/:id',
            element: <UpdateAssignment></UpdateAssignment>
        },
        {
            path: '/assignments/:id',
            element: <PrivetRoutes><AssignmentDetails></AssignmentDetails></PrivetRoutes>
        },
        {
            path: "/give-marks/:id",
            element: <PrivetRoutes><GiveMarks></GiveMarks></PrivetRoutes>
        }
    ]
  },
]);

export default router