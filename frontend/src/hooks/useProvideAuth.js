import axios from "axios";
import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useProvideAuth = () => {
  const [user, setUser] = useState(false);
  const [token, setToken] = useLocalStorage("token", false);

  const signin = ({ username, password, handleRedirectHome, setMessage }) => {
    axios
      .post(`${process.env.REACT_APP_API_URL_LARAVEL}/login`, {
        username,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          setToken({ ...res.data.user });
          setUser({
            ...res.data.user,
          });
          handleRedirectHome();
        } else {
          setMessage(res.data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  const signup = ({
    email,
    username,
    password,
    handleRedirectRouter,
    setMessage,
  }) => {
    axios
      .post(`${process.env.REACT_APP_API_URL_LARAVEL}/register`, {
        email,
        username,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          handleRedirectRouter();
        } else {
          setMessage(res.data.message);
        }
      });
  };

  const signout = () => {
    setToken(undefined);
    setUser(false);
  };

  return { user, token, signin, signup, signout, setToken };
};
