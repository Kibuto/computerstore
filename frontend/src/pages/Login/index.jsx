import React, { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { useAuth, useRouter } from "../../hooks";

const Login = () => {
  const router = useRouter();
  const { token, signin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // if (token) return <Redirect to="/" />;

  const handleSignIn = (e) => {
    e.preventDefault();
    const handleRedirectHome = () => router.push("/");
    signin({ username, password, handleRedirectHome });
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Login</h3>
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            className="form-control"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Login" className="btn btn-primary" />
        </div>
        <div className="card-text">
          Don't have an account?{" "}
          <Link to="/registration" className="text-primary">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
