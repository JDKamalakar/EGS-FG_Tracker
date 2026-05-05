import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { getGenreColor } from '../theme';

interface Props {
  name: string;
  genre: string;
  height?: number;
}

// Simple hash for consistent colors per game
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const GRADIENT_PAIRS = [
  ['#0a1628', '#1a2a4a'],
  ['#1a0a14', '#3a1a2e'],
  ['#0a1a0a', '#1a3a1a'],
  ['#1a1a0a', '#3a3a1a'],
  ['#0a0a1a', '#1a1a3a'],
  ['#1a0a0a', '#3a0a0a'],
  ['#0a1a1a', '#1a3a3a'],
  ['#12080a', '#2a1820'],
];

export default function GameCoverPlaceholder({ name, genre, height = 180 }: Props) {
  const h = hashCode(name);
  const [bg1, bg2] = GRADIENT_PAIRS[h % GRADIENT_PAIRS.length];
  const accentColor = getGenreColor(genre);
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <Box
      sx={{
        height,
        background: `linear-gradient(135deg, ${bg1} 0%, ${bg2} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative radial glow */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${accentColor}18 0%, transparent 70%)`,
        }}
      />
      {/* Grid lines pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, ${accentColor}08 0px, transparent 1px, transparent 24px, ${accentColor}08 25px), repeating-linear-gradient(90deg, ${accentColor}08 0px, transparent 1px, transparent 24px, ${accentColor}08 25px)`,
        }}
      />
      <SportsEsportsIcon
        sx={{ fontSize: '2.5rem', color: `${accentColor}60`, mb: 0.5, position: 'relative', zIndex: 1 }}
      />
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          color: `${accentColor}80`,
          letterSpacing: '0.1em',
          position: 'relative',
          zIndex: 1,
          lineHeight: 1,
          textShadow: `0 0 20px ${accentColor}40`,
        }}
      >
        {initials}
      </Typography>
    </Box>
  );
}
