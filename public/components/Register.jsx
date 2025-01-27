
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
  return (
    <Box className="center-wrapper">
      <Box className="login-container">
        {/* Left Section */}
        <Box className="login-left">
          <Typography variant="h4" gutterBottom>
            Join us today!
          </Typography>
          <Typography variant="body1">
            Discover a better way to manage your business. Sign up and get access to all the amazing features we offer.
          </Typography>
        </Box>

        {/* Right Section */}
        <Box className="login-right">
          <form className="login-form">
            {/* Name Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              variant="outlined"
              type="text"
            />

            {/* Email Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              variant="outlined"
              type="email"
            />

            {/* Password Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              variant="outlined"
              type="password"
            />

            {/* Confirm Password Field */}
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              variant="outlined"
              type="password"
            />

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
              <Link href="#" underline="hover">
                Login
              </Link>
            </Typography>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
