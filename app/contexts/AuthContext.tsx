import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import sha256 from "crypto-js/sha256";

type User = {
  name: string;
  email: string;
  phone: string;
  age: string;
  country: string;
  state: string;
  picture: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?nat=br&format=json")
      .then((response) => {
        const data = response.data.results[0];
        const userToken = sha256(data.login.uuid).toString();

        Cookies.set("user_token", userToken, { expires: 7 });

        setUser({
          name: `${data.name.first} ${data.name.last}`,
          email: data.email,
          phone: data.phone,
          age: data.dob.age,
          country: data.location.country,
          state: data.location.state,
          picture: data.picture.medium,
        });

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
