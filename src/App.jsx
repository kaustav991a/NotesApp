import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./Context/UserContext"; // Import UserProvider

import "./styles/base.scss";
import router from "./Routes";

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
