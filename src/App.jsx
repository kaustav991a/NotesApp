import { RouterProvider } from "react-router-dom";

import "./styles/base.scss";
import router from "./Routes";

// Wrapper to handle animation on route change
function App() {
  return (
    <RouterProvider router={router} />
    // <LoadingProvider>
    //   <AnimatePresence mode="wait">
    //     <RouterProvider router={router} />
    //   </AnimatePresence>
    // </LoadingProvider>
  );
}

export default App;
