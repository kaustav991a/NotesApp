import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
<<<<<<< HEAD
import SignUp from "./pages/SignUP/SignUp";
=======
import NotesApp from "./pages/NotesApp/NotesApp";
>>>>>>> master

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
<<<<<<< HEAD
    path: "/signup",
    element: <SignUp/>,
=======
    path: "/notes",
    element: <NotesApp />,
>>>>>>> master
  },

  // ],
  // },
]);

export default router;
