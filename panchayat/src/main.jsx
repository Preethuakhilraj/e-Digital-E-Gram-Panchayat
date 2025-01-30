import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b", // Teal color for main buttons, headers
    },
    secondary: {
      main: "#004d40", // Darker teal for accents
    },
    background: {
      default: "#f4f6f9", // Light gray background
    },
    text: {
      primary: "#333", // Dark text for readability
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h6: {
      fontWeight: "bold",
    },
    body1: {
      fontSize: "1rem",
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
)

