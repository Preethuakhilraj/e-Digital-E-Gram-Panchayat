import { useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./Login.css";
import axiosInstance from "./axiosinterceptor";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      console.log("Login successful:", response.data);

      // Redirect or handle successful login
      window.location.href = "/userdashboard"; // Update with your dashboard route
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <Box className="center-wrapper">
      <Box className="login-container">
        {/* Left Section */}
        <Box className="login-left">
          <Typography variant="h4" gutterBottom>
            The best offer for your business
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, expedita iusto veniam atque magni tempora mollitia.
          </Typography>
        </Box>

        {/* Right Section */}
        <Box className="login-right">
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              required
            />

            {/* Error Message */}
            {error && (
              <Typography color="error" variant="body2" align="center" gutterBottom>
                {error}
              </Typography>
            )}

            {/* Forgot Password */}
            <Box display="flex" justifyContent="flex-end" mb={1}>
              <Link href="#" underline="hover">
                Forgot Password?
              </Link>
            </Box>

            {/* Checkbox */}
            <FormControlLabel
              control={<Checkbox />}
              label="Subscribe to our newsletter"
            />

            {/* Login Button */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              className="signup-btn"
            >
              Login
            </Button>

            {/* Alternative Sign-up */}
            <Typography
              className="alternative-signup"
              variant="body2"
              align="center"
              marginY={2}
            >
              or Log in with:
            </Typography>

            {/* Social Icons */}
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <IconButton>
                  <FacebookIcon color="primary" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <GoogleIcon color="error" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <TwitterIcon color="primary" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <GitHubIcon />
                </IconButton>
              </Grid>
            </Grid>

            {/* Sign Up Option */}
            <Typography
              variant="body2"
              align="center"
              mt={3}
              className="signup-option"
            >
              Don&apos;t have an account?{" "}
              <Link href="/register" underline="hover">
                Sign up
              </Link>
            </Typography>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
