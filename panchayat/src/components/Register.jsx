import { useState } from "react";
import axiosInstance from "./axiosinterceptor";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./Register.css";

const Register = () => {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        alert("Registration successful! Please login.");
        // Redirect to login page
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <Box className="center-wrapper">
      <Box className="login-container">
        {/* Left Section */}
        <Box className="login-left">
          <Typography variant="h4" gutterBottom>
          Join Digital Panchayat today! 
          </Typography>
          <Typography variant="body1">
          Empower yourself with seamless access to community services, real-time updates, and essential government resources. Sign up now to be an active part of your local governance and development.
          </Typography>
        </Box>

        {/* Right Section */}
        <Box className="login-right">
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Name Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              variant="outlined"
              type="text"
              value={name}
              onChange={(e) => setFullName(e.target.value)}
            />

            {/* Email Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Confirm Password Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Error Message */}
            {error && (
              <Typography
                variant="body2"
                color="error"
                style={{ marginBottom: "10px" }}
              >
                {error}
              </Typography>
            )}

            {/* Sign Up Button */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              className="signup-btn"
            >
              Sign Up
            </Button>

            {/* Alternative Sign-up */}
            <Typography
              className="alternative-signup"
              variant="body2"
              align="center"
              marginY={2}
            >
              or sign up with:
            </Typography>

            {/* Social Icons */}
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Button variant="outlined" startIcon={<FacebookIcon />}>
                  Facebook
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" startIcon={<GoogleIcon />}>
                  Google
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" startIcon={<TwitterIcon />}>
                  Twitter
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" startIcon={<GitHubIcon />}>
                  GitHub
                </Button>
              </Grid>
            </Grid>

            {/* Login Option */}
            <Typography
              variant="body2"
              align="center"
              mt={3}
              className="signup-option"
            >
              Already have an account?{" "}
              <Link href="/login" underline="hover">
                Login
              </Link>
            </Typography>
            <Typography variant="body2" align="center" mt={3}>
                            <Link href="/" underline="hover">
             Back to Home
              </Link>
            </Typography>  
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
