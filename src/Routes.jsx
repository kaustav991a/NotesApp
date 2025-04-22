import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotesApp from "./pages/NotesApp/NotesApp";
import CreateNote from "./pages/CreateNote/CreateNote";
import SignUp from "./pages/SignUP/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

// const [transactions, setTransactions] = useState([]);
// const [transactions, setTransactions] = useState([]);

const router = createBrowserRouter([
  // {
  // path: "/",
  // element: <AppLayout />, // optional layout wrapper
  // children: [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp/>, 
  },
  {
    path: "/signin",
    element: <SignIn/>, 
  },
  {
    path: "/resetpassword",
    element: <ResetPassword/>,
  },
  {
    path: "/notes",
    element: <NotesApp />,
  },
  {
    path: "/create-note",
    element: <CreateNote />,
  },

  // ],
  // },
]);

export default router;
