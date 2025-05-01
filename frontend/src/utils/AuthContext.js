// using React Context for authentication instead of manually passing in props
import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
