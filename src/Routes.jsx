import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotesApp from "./pages/NotesApp/NotesApp";
import SignUp from "./pages/SignUP/SignUp";

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
    path: "/notes",
    element: <NotesApp />,
  },

  // ],
  // },
]);

export default router;
