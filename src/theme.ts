import { createTheme } from '@mui/material/styles';
import { deepOrange, cyan } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4ff',
      light: '#66e8ff',
      dark: '#0099bb',
    },
    secondary: {
      main: deepOrange[400],
      light: deepOrange[300],
      dark: deepOrange[600],
    },
    background: {
      default: '#080c14',
      paper: '#0d1421',
    },
    text: {
      primary: '#e8f4fd',
      secondary: '#8ba3bf',
    },
    divider: 'rgba(0, 212, 255, 0.12)',
    success: {
      main: '#00e676',
      light: '#69f0ae',
      dark: '#00c853',
    },
    info: {
      main: cyan[400],
    },
    error: {
      main: '#ff5252',
    },
    warning: {
      main: deepOrange[400],
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500, letterSpacing: '0.01em' },
    button: { fontWeight: 600, letterSpacing: '0.05em' },
    overline: { fontWeight: 700, letterSpacing: '0.12em' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #080c14 0%, #0a1628 50%, #080c14 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
        '::-webkit-scrollbar': { width: '6px' },
        '::-webkit-scrollbar-track': { background: '#0d1421' },
        '::-webkit-scrollbar-thumb': {
          background: 'rgba(0, 212, 255, 0.3)',
          borderRadius: '3px',
        },
        '::-webkit-scrollbar-thumb:hover': { background: 'rgba(0, 212, 255, 0.6)' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(13, 20, 33, 0.95) 0%, rgba(10, 16, 28, 0.98) 100%)',
          border: '1px solid rgba(0, 212, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            border: '1px solid rgba(0, 212, 255, 0.3)',
            boxShadow: '0 8px 40px rgba(0, 212, 255, 0.12)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none', fontWeight: 600 },
        contained: {
          boxShadow: '0 4px 20px rgba(0, 212, 255, 0.3)',
          '&:hover': { boxShadow: '0 6px 28px rgba(0, 212, 255, 0.45)' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.04em' },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            background: 'rgba(0, 212, 255, 0.03)',
            '& fieldset': { borderColor: 'rgba(0, 212, 255, 0.15)' },
            '&:hover fieldset': { borderColor: 'rgba(0, 212, 255, 0.35)' },
            '&.Mui-focused fieldset': { borderColor: '#00d4ff' },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(8, 12, 20, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
          boxShadow: 'none',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: 'rgba(13, 20, 33, 0.95)',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          borderRadius: 8,
          fontSize: '0.8rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
  },
  shadows: [
    'none',
    '0 1px 4px rgba(0,0,0,0.4)',
    '0 2px 8px rgba(0,0,0,0.4)',
    '0 4px 12px rgba(0,0,0,0.4)',
    '0 4px 20px rgba(0, 212, 255, 0.08)',
    '0 6px 24px rgba(0, 212, 255, 0.1)',
    '0 8px 32px rgba(0, 212, 255, 0.12)',
    '0 8px 40px rgba(0, 212, 255, 0.15)',
    '0 12px 48px rgba(0, 212, 255, 0.18)',
    '0 16px 56px rgba(0,0,0,0.5)',
    '0 20px 64px rgba(0,0,0,0.5)',
    '0 24px 72px rgba(0,0,0,0.5)',
    '0 28px 80px rgba(0,0,0,0.5)',
    '0 32px 88px rgba(0,0,0,0.5)',
    '0 36px 96px rgba(0,0,0,0.5)',
    '0 40px 104px rgba(0,0,0,0.5)',
    '0 44px 112px rgba(0,0,0,0.5)',
    '0 48px 120px rgba(0,0,0,0.5)',
    '0 52px 128px rgba(0,0,0,0.5)',
    '0 56px 136px rgba(0,0,0,0.5)',
    '0 60px 144px rgba(0,0,0,0.5)',
    '0 64px 152px rgba(0,0,0,0.5)',
    '0 68px 160px rgba(0,0,0,0.5)',
    '0 72px 168px rgba(0,0,0,0.5)',
    '0 76px 176px rgba(0,0,0,0.5)',
  ],
});

export default theme;

export const GENRE_COLORS: Record<string, string> = {
  Action: '#ff5252',
  'Action RPG': '#ff7043',
  Adventure: '#29b6f6',
  FPS: '#ef5350',
  Horror: '#ce93d8',
  Platformer: '#66bb6a',
  Puzzle: '#ffa726',
  RPG: '#ba68c8',
  Racing: '#26c6da',
  Roguelike: '#f48fb1',
  Simulation: '#26a69a',
  Strategy: '#42a5f5',
  Survival: '#a1887f',
  'Co-op': '#4dd0e1',
  'Tower Defense': '#ff8a65',
  'Card Game': '#ce93d8',
  Sports: '#9ccc65',
  Fighting: '#ef5350',
  'Open World': '#4db6ac',
  MMORPG: '#ba68c8',
};

export function getGenreColor(genre: string): string {
  return GENRE_COLORS[genre] ?? '#00d4ff';
}
