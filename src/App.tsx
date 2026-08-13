import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServerDetailPage from './pages/ServerDetailPage';
import CategoryPage from './pages/CategoryPage';
import { Container } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/mcp" replace />} />
            <Route path="/mcp" element={<HomePage type="mcp" />} />
            <Route path="/skills" element={<HomePage type="skill" />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/categories/:categoryId" element={<CategoryPage />} />
            <Route path="/server/:id" element={<ServerDetailPage />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
