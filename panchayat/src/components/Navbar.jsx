import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#001d18', 
    },
    secondary: {
      main: '#FFD700', // Gold for highlights
    },
  },
});

export default function Navbar() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* Add logo or menu icon here if needed */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Digital Panchayat
            </Typography>
            <Button color="inherit" sx={{ mx: 1 }} href="/">Home</Button>
            <Button color="inherit" sx={{ mx: 1 }} href="/login">Services</Button>
            <Button color="secondary" variant="outlined" sx={{ mx: 1 }} href="/login">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
