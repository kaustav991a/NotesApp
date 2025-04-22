import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotesApp from "./pages/NotesApp/NotesApp";

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
    path: "/notes",
    element: <NotesApp />,
  },

  // ],
  // },
]);

export default router;
