import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Context/UserContext"; // Import UserProvider
import "../node_modules/bootstrap/dist/css/bootstrap.css";
// import "react-toastify/dist/ReactToastify.css";

import "./styles/base.scss";
import router from "./Routes";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
