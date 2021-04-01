import axios from "axios";
import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useProvideAuth = () => {
  const [user, setUser] = useState(false);
  const [token, setToken] = useLocalStorage("token", "");

  const signin = ({ username, password, handleRedirectHome }) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/login.php`, {
        username,
        password,
      })
      .then((res) => {
        const { user } = res.data || {};
        setToken(user[0].uId);
        setUser({
          ...user[0],
        });
        handleRedirectHome();
      })
      .catch((err) => console.error(err));
  };

  const signup = ({ email, username, password, handleRedirectRouter }) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/user.php`, {
        email,
        username,
        password,
      })
      .then(() => handleRedirectRouter());
  };

  const signout = () => {
    setToken(undefined);
    setUser(false);
  };

  return { user, token, signin, signup, signout };
};
