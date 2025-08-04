"use client";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const CreateContextAuth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user ?? null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
