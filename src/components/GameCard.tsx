import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useOwnership } from '../context/OwnershipContext';
import type { FreeGame } from '../data/games';
import { getGenreColor } from '../theme';
import GameCoverPlaceholder from './GameCoverPlaceholder';

interface GameCardProps {
  game: FreeGame;
  compact?: boolean;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
}

export default function GameCard({ game, compact = false }: GameCardProps) {
  const { isOwned, getOwnedDate, markOwned, unmarkOwned } = useOwnership();
  const [showHistory, setShowHistory] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const owned = isOwned(game.slug);
  const ownedDate = getOwnedDate(game.slug);
  const genreColor = getGenreColor(game.genre);
  const latestPeriod = game.freePeriods[game.freePeriods.length - 1];
  const hasMultiplePeriods = game.freePeriods.length > 1;

  const handleToggleOwned = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isToggling) return;
    setIsToggling(true);
    try {
      if (owned) {
        await unmarkOwned(game.slug);
      } else {
        await markOwned(game.slug, game.name);
      }
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        ...(owned && {
          border: '1px solid rgba(0, 230, 118, 0.35) !important',
          boxShadow: '0 4px 24px rgba(0, 230, 118, 0.08) !important',
        }),
      }}
    >
      {/* Owned indicator strip */}
      {owned && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #00e676, #69f0ae)',
            zIndex: 2,
          }}
        />
      )}

      {/* Game cover */}
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        {game.coverUrl ? (
          <CardMedia
            component="img"
            image={game.coverUrl}
            alt={game.name}
            sx={{ height: compact ? 140 : 180, objectFit: 'cover' }}
          />
        ) : (
          <GameCoverPlaceholder name={game.name} genre={game.genre} height={compact ? 140 : 180} />
        )}

        {/* Genre badge */}
        <Chip
          label={game.genre}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            bgcolor: `${genreColor}22`,
            color: genreColor,
            border: `1px solid ${genreColor}44`,
            backdropFilter: 'blur(8px)',
            zIndex: 1,
          }}
        />

        {/* Multiple periods badge */}
        {hasMultiplePeriods && (
          <Chip
            icon={<HistoryIcon sx={{ fontSize: '0.75rem !important' }} />}
            label={`${game.freePeriods.length}x`}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(255, 167, 38, 0.15)',
              color: '#ffa726',
              border: '1px solid rgba(255, 167, 38, 0.3)',
              backdropFilter: 'blur(8px)',
              zIndex: 1,
            }}
          />
        )}

        {/* Owned overlay */}
        {owned && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 50%, rgba(0, 230, 118, 0.15) 100%)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, p: compact ? 1.5 : 2, pb: '8px !important' }}>
        {/* Game name */}
        <Typography
          variant={compact ? 'body2' : 'body1'}
          fontWeight={700}
          sx={{
            mb: 0.5,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            color: owned ? 'success.light' : 'text.primary',
          }}
        >
          {game.name}
        </Typography>

        {/* Latest free period */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <CalendarTodayIcon sx={{ fontSize: '0.7rem', color: 'primary.main', opacity: 0.8 }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem' }}>
            {formatDateShort(latestPeriod.start)}
            {latestPeriod.end && ` – ${formatDateShort(latestPeriod.end)}`}
          </Typography>
        </Box>

        {/* Owned date */}
        {owned && ownedDate && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              mb: 1,
              p: 0.75,
              borderRadius: 1,
              bgcolor: 'rgba(0, 230, 118, 0.08)',
              border: '1px solid rgba(0, 230, 118, 0.15)',
            }}
          >
            <CheckCircleIcon sx={{ fontSize: '0.85rem', color: 'success.main' }} />
            <Typography variant="caption" sx={{ color: 'success.light', fontSize: '0.68rem' }}>
              Owned · {formatDate(ownedDate)}
            </Typography>
          </Box>
        )}

        {/* History toggle */}
        {hasMultiplePeriods && (
          <>
            <Box
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mb: 0.5 }}
              onClick={() => setShowHistory((v) => !v)}
            >
              <Typography variant="caption" sx={{ color: 'primary.main', fontSize: '0.68rem', flexGrow: 1 }}>
                Free history ({game.freePeriods.length} times)
              </Typography>
              <ExpandMoreIcon
                sx={{
                  fontSize: '1rem',
                  color: 'primary.main',
                  transform: showHistory ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                }}
              />
            </Box>
            <Collapse in={showHistory}>
              <Box sx={{ mt: 0.5 }}>
                {game.freePeriods.map((p, i) => (
                  <Typography
                    key={i}
                    variant="caption"
                    display="block"
                    sx={{ color: 'text.secondary', fontSize: '0.65rem', lineHeight: 1.8 }}
                  >
                    {i + 1}. {formatDateShort(p.start)} – {formatDateShort(p.end)}
                  </Typography>
                ))}
              </Box>
            </Collapse>
          </>
        )}

        {/* Mark owned button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto', pt: 1 }}>
          <Tooltip title={owned ? 'Unmark as owned' : 'Mark as owned'} placement="top">
            <IconButton
              size="small"
              onClick={handleToggleOwned}
              disabled={isToggling}
              sx={{
                color: owned ? 'success.main' : 'text.secondary',
                '&:hover': {
                  color: owned ? 'error.main' : 'success.main',
                  bgcolor: owned ? 'rgba(255, 82, 82, 0.08)' : 'rgba(0, 230, 118, 0.08)',
                },
                transition: 'all 0.2s',
              }}
            >
              {owned ? (
                <CheckCircleIcon sx={{ fontSize: '1.3rem' }} />
              ) : (
                <RadioButtonUncheckedIcon sx={{ fontSize: '1.3rem' }} />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}
