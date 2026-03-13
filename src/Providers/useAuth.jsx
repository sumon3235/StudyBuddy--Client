import { useContext } from "react";
import { AuthContext } from "./AuthContex";

const useAuth = () => {
  return useContext(AuthContext)
};

export default useAuth;