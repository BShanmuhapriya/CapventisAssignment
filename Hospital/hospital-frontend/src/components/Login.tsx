import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/queries";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Box, TextField, Button, Typography } from "@mui/material";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      console.log("✅ Login Response:", data); // Debugging

      if (data?.login?.token) {
        localStorage.setItem("token", data.login.token);
        navigate("/departments");
      } else {
        setErrorMessage("Invalid login credentials. Please try again.");
      }
    },
    onError: (error) => {
      console.error("❌ GraphQL Error:", error); // Debugging
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    console.log("📨 Sending Login Request:", { email, password }); // Debugging

    try {
      await loginUser({ variables: { email, password } });
    } catch (err) {
      console.error("Error during login", err);
      setErrorMessage("Failed to login. Please try again.");
    }
  };

  const handleDefaultLogin = () => {
    setEmail("demo@example.com");
    setPassword("password123");
  };

  return (
    <div className="bg-gray-100">
      <Navbar />
      <Typography variant="h3" sx={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
        Welcome to the Hospital
      </Typography>
      <div className="loginForm flex justify-center items-center min-h-screen">
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ "& .MuiTextField-root": { m: 1, width: "80%" } }}
          noValidate
          autoComplete="off"
          className="p-8 bg-white rounded border-black border-2 shadow-lg"
        >
          <div className="flex items-center mb-2">
            <TextField
              required
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center mb-2">
            <TextField
              required
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

          <div className="flex justify-center items-center mb-2">
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>

          <div className="flex justify-center items-center mb-2">
            <Button variant="outlined" onClick={handleDefaultLogin}>
              Use Default Login
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Login;
