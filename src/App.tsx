import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import theme from './theme';
import { OwnershipProvider } from './context/OwnershipContext';
import NavBar from './components/NavBar';
import Hero from './pages/Hero';
import Dashboard from './pages/Dashboard';

type Page = 'home' | 'dashboard';

function App() {
  const [page, setPage] = useState<Page>('home');

  const navigate = (p: Page) => setPage(p);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OwnershipProvider>
        <NavBar page={page} onNavigate={navigate} />
        <Box sx={{ pt: page === 'dashboard' ? '64px' : 0 }}>
          {page === 'home' && <Hero onGoToDashboard={() => navigate('dashboard')} />}
          {page === 'dashboard' && <Dashboard />}
        </Box>
      </OwnershipProvider>
    </ThemeProvider>
  );
}

export default App;
