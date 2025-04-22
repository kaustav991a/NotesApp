import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";

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

  // ],
  // },
]);

export default router;
