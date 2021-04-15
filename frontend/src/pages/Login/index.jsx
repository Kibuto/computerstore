import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth, useRouter } from "../../hooks";
import "./style.css";

const Login = () => {
  const router = useRouter();
  const { signin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    const handleRedirectHome = () => router.push("/");
    signin({ username, password, handleRedirectHome, setMessage });
  };

  return (
    <div className="login-wrapper mt-4">
      <h3>Login</h3>
      {message && (
        <Alert variant="danger" dismissible onClose={() => setMessage(false)}>
          {message}
        </Alert>
      )}
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
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
            required
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
