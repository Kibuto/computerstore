// libs
import React, { useState } from "react";
import { Link } from "react-router-dom";
// hooks
import { useRouter, useAuth } from "../../hooks";

const Registration = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegisterUser = (e) => {
    e.preventDefault();
    const handleRedirectRouter = () => router.push("/login");
    signup({
      email,
      username,
      password,
      handleRedirectRouter,
    });
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Registration</h3>
      <form onSubmit={handleRegisterUser}>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="text"
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
          <label>Confirm Password: </label>
          <input
            type="password"
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
