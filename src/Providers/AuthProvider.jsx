import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContex";
import { auth } from "../Firebase/firebase.init";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const AuthProvider = ({ children }) => {
  // Set A user State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login User With Email And Password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   Set A Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // cleanup
  }, []);

  const authInfo = {
    user,
    loading,
    loginUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
