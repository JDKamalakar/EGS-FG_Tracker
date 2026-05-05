import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import { GAMES } from '../data/games';
import { useOwnership } from '../context/OwnershipContext';

export default function StatsBar() {
  const { ownedGames } = useOwnership();
  const totalGames = GAMES.length;
  const ownedCount = ownedGames.size;
  const missedCount = totalGames - ownedCount;
  const pct = totalGames > 0 ? Math.round((ownedCount / totalGames) * 100) : 0;

  const stats = [
    {
      icon: <SportsEsportsIcon sx={{ fontSize: '1.2rem' }} />,
      label: 'Total Free Games',
      value: totalGames,
      color: '#00d4ff',
    },
    {
      icon: <CheckCircleIcon sx={{ fontSize: '1.2rem' }} />,
      label: 'Owned',
      value: ownedCount,
      color: '#00e676',
    },
    {
      icon: <InventoryIcon sx={{ fontSize: '1.2rem' }} />,
      label: 'Missed',
      value: missedCount,
      color: '#ff7043',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        alignItems: { xs: 'stretch', sm: 'center' },
        p: 2.5,
        borderRadius: 3,
        background: 'rgba(13, 20, 33, 0.8)',
        border: '1px solid rgba(0, 212, 255, 0.12)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {stats.map((s) => (
        <Box
          key={s.label}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            flex: 1,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: `${s.color}18`,
              border: `1px solid ${s.color}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: s.color,
              flexShrink: 0,
            }}
          >
            {s.icon}
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={800} sx={{ color: s.color, lineHeight: 1.1 }}>
              {s.value.toLocaleString()}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              {s.label}
            </Typography>
          </Box>
        </Box>
      ))}

      {/* Progress */}
      <Box sx={{ flex: 2, minWidth: 180 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Collection Progress
          </Typography>
          <Typography variant="caption" fontWeight={700} sx={{ color: 'primary.main' }}>
            {pct}%
          </Typography>
        </Box>
        <Tooltip title={`${ownedCount} / ${totalGames} games owned`} placement="top">
          <LinearProgress
            variant="determinate"
            value={pct}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Tooltip>
      </Box>
    </Box>
  );
}
