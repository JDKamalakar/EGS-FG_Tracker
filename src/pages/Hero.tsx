import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { GAMES } from '../data/games';

interface HeroProps {
  onGoToDashboard: () => void;
}

export default function Hero({ onGoToDashboard }: HeroProps) {
  const totalGames = GAMES.length;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Hero background image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/hero-banner.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.35)',
          zIndex: 0,
        }}
      />

      {/* Radial glow overlays */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(0deg, #080c14 0%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* Grid lines */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,212,255,0.03) 0px, transparent 1px, transparent 60px, rgba(0,212,255,0.03) 61px), repeating-linear-gradient(90deg, rgba(0,212,255,0.03) 0px, transparent 1px, transparent 60px, rgba(0,212,255,0.03) 61px)',
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 12 }}>
        <Box sx={{ maxWidth: 700 }}>
          {/* Badge */}
          <Chip
            icon={<AutoAwesomeIcon sx={{ fontSize: '0.85rem !important' }} />}
            label="Epic Games Free Tracker"
            sx={{
              mb: 3,
              bgcolor: 'rgba(0, 212, 255, 0.1)',
              color: 'primary.main',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              fontWeight: 700,
              letterSpacing: '0.06em',
              fontSize: '0.75rem',
            }}
          />

          {/* Headline */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 900,
              lineHeight: 1.05,
              mb: 2,
              background: 'linear-gradient(135deg, #ffffff 30%, #00d4ff 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.03em',
            }}
          >
            Every Free Epic
            <br />
            Game. Ever.
          </Typography>

          {/* Subhead */}
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              mb: 4,
              maxWidth: 560,
              lineHeight: 1.6,
              fontSize: { xs: '1rem', sm: '1.2rem' },
            }}
          >
            Browse, track and manage your Epic Games Store free games collection.
            Mark what you own, discover what you missed.
          </Typography>

          {/* Stats badges */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 5 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: 'rgba(0, 212, 255, 0.08)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
              }}
            >
              <SportsEsportsIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
              <Typography variant="body2" fontWeight={700} sx={{ color: 'primary.main' }}>
                {totalGames}+ Games
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: 'rgba(0, 230, 118, 0.08)',
                border: '1px solid rgba(0, 230, 118, 0.2)',
              }}
            >
              <CheckCircleIcon sx={{ fontSize: '1rem', color: 'success.main' }} />
              <Typography variant="body2" fontWeight={700} sx={{ color: 'success.main' }}>
                Track Ownership
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: 'rgba(255, 112, 67, 0.08)',
                border: '1px solid rgba(255, 112, 67, 0.2)',
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: '1rem', color: 'secondary.main' }} />
              <Typography variant="body2" fontWeight={700} sx={{ color: 'secondary.main' }}>
                Since 2018
              </Typography>
            </Box>
          </Box>

          {/* CTA */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={onGoToDashboard}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #00d4ff 0%, #0099bb 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #33deff 0%, #00b8d9 100%)',
                },
              }}
            >
              Browse All Games
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
