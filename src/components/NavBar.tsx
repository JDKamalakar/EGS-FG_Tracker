import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useOwnership } from '../context/OwnershipContext';

interface NavBarProps {
  page: 'home' | 'dashboard';
  onNavigate: (page: 'home' | 'dashboard') => void;
}

export default function NavBar({ page, onNavigate }: NavBarProps) {
  const { ownedGames } = useOwnership();

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            flexShrink: 0,
          }}
          onClick={() => onNavigate('home')}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #00d4ff22, #00d4ff44)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SportsEsportsIcon sx={{ fontSize: '1.2rem', color: 'primary.main' }} />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="body1" fontWeight={800} sx={{ lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              EpicVault
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
              FREE GAMES TRACKER
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Owned count badge */}
        {ownedGames.size > 0 && (
          <Chip
            icon={<CheckCircleIcon sx={{ fontSize: '0.85rem !important' }} />}
            label={`${ownedGames.size} owned`}
            size="small"
            sx={{
              bgcolor: 'rgba(0, 230, 118, 0.1)',
              color: 'success.main',
              border: '1px solid rgba(0, 230, 118, 0.2)',
              fontWeight: 700,
              fontSize: '0.72rem',
            }}
          />
        )}

        {/* Nav links */}
        <Button
          startIcon={<HomeIcon sx={{ fontSize: '1rem' }} />}
          onClick={() => onNavigate('home')}
          size="small"
          sx={{
            color: page === 'home' ? 'primary.main' : 'text.secondary',
            fontWeight: 600,
            fontSize: '0.8rem',
            '&:hover': { color: 'primary.main', bgcolor: 'rgba(0, 212, 255, 0.06)' },
          }}
        >
          Home
        </Button>

        <Button
          startIcon={<DashboardIcon sx={{ fontSize: '1rem' }} />}
          onClick={() => onNavigate('dashboard')}
          size="small"
          sx={{
            color: page === 'dashboard' ? 'primary.main' : 'text.secondary',
            fontWeight: 600,
            fontSize: '0.8rem',
            '&:hover': { color: 'primary.main', bgcolor: 'rgba(0, 212, 255, 0.06)' },
          }}
        >
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
}
