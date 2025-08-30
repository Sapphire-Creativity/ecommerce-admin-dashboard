import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { setUser } from "./redux/slice/authSlice.js";
import { subscribeToAuth } from "./services/authService.js";
import {
  browserLocalPersistence,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "./firebase.js";
import CircularProgress from "@mui/material/CircularProgress";

function Root() {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    // Set persistence (choose browserLocalPersistence or browserSessionPersistence)
    setPersistence(auth, browserLocalPersistence).catch(console.warn);

    const unsubscribe = subscribeToAuth((user) => {
      if (user)
        store.dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      else {
        store.dispatch(setUser(null));
      }

      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);
  if (!authReady)
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-2">
        <CircularProgress sx={{ color: "#FF7A00" }} size={30} />
        <p className="text-primary text-sm md:text-base text-center">  Loading...</p>
      
      </div>
    );

  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
