import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
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

  // ],
  // },
]);

export default router;
