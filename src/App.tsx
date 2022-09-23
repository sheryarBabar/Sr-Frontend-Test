import { useState } from "react";
import AppRoutes from "./routes";
import { currentUserObject } from "utils";
import { CurrentUserContext } from "context";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currentUser, setCurrentUser] = useState(currentUserObject);
  return (
    <div className='App' data-testid='rootA'>
      <ToastContainer
        autoClose={2000}
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop
        position='bottom-right'
        pauseOnFocusLoss
        pauseOnHover
        rtl={false}
      />
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <AppRoutes />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
