// libs
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
// hooks
import { useRouter, useAuth } from "../../hooks";
import "./style.css";

const Registration = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegisterUser = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const handleRedirectRouter = () => router.push("/login");
      signup({
        email,
        username,
        password,
        handleRedirectRouter,
        setMessage,
      });
    } else {
      alert("Password và confirm password bị sai");
    }
  };

  return (
    <div className="registration-wrapper container mt-4">
      <h3>Registration</h3>
      {message && (
        <Alert variant="danger" dismissible onClose={() => setMessage(false)}>
          {message}
        </Alert>
      )}
      <form onSubmit={handleRegisterUser}>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
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
          <label>Confirm Password: </label>
          <input
            type="password"
            required
            className="form-control"
            placeholder="Confirm Password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Register" className="btn btn-primary" />
        </div>
        <div className="card-text">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
