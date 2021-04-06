import axios from "axios";
import { useEffect, useState } from "react";
import { useUpdateEffect } from "./useUpdateEffect";
import { useLocalStorage } from "./useLocalStorage";

export const useProvideAuth = () => {
  const [user, setUser] = useState(false);
  const [token, setToken] = useLocalStorage("token", false);

  const signin = ({ username, password, handleRedirectHome }) => {
    axios
      .post(`${process.env.REACT_APP_API_URL_LARAVEL}/login`, {
        username,
        password,
      })
      .then((res) => {
        const { id } = res.data;
        setToken({ ...res.data });
        setUser({
          ...res.data,
        });
        handleRedirectHome();
      })
      .catch((err) => console.error(err));
  };

  const signup = ({ email, username, password, handleRedirectRouter }) => {
    axios
      .post(`${process.env.REACT_APP_API_URL_LARAVEL}/register`, {
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
