import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Context/UserContext"; // Import UserProvider
import { useAuth } from "./Context/UserContext"; // If your folder is named "Context"

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
