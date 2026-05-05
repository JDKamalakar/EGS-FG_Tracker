import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import Fade from '@mui/material/Fade';
import SearchIcon from '@mui/icons-material/Search';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { GAMES, ALL_GENRES, ALL_YEARS } from '../data/games';
import { useOwnership } from '../context/OwnershipContext';
import GameCard from '../components/GameCard';
import StatsBar from '../components/StatsBar';

type ViewMode = 'grid' | 'list';
type FilterOwned = 'all' | 'owned' | 'missing';

export default function Dashboard() {
  const { isOwned } = useOwnership();
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [filterOwned, setFilterOwned] = useState<FilterOwned>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filtered = useMemo(() => {
    return GAMES.filter((g) => {
      if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedGenre && g.genre !== selectedGenre) return false;
      if (selectedYear) {
        const yr = parseInt(selectedYear);
        const years = g.freePeriods.map((p) => new Date(p.start).getFullYear());
        if (!years.includes(yr)) return false;
      }
      if (filterOwned === 'owned' && !isOwned(g.slug)) return false;
      if (filterOwned === 'missing' && isOwned(g.slug)) return false;
      return true;
    });
  }, [search, selectedGenre, selectedYear, filterOwned, isOwned]);

  const clearFilters = () => {
    setSearch('');
    setSelectedGenre('');
    setSelectedYear('');
    setFilterOwned('all');
  };

  const hasFilters = search || selectedGenre || selectedYear || filterOwned !== 'all';

  return (
    <Box sx={{ minHeight: '100vh', pt: 2, pb: 6 }}>
      <Container maxWidth="xl">
        {/* Stats */}
        <Box sx={{ mb: 4 }}>
          <StatsBar />
        </Box>

        {/* Filters row */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
            p: 2.5,
            borderRadius: 3,
            background: 'rgba(13, 20, 33, 0.6)',
            border: '1px solid rgba(0, 212, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            alignItems: 'center',
          }}
        >
          <FilterListIcon sx={{ color: 'primary.main', flexShrink: 0 }} />

          <TextField
            size="small"
            placeholder="Search games…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: '1 1 200px', minWidth: 180 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ flex: '1 1 150px', minWidth: 140 }}>
            <InputLabel>Genre</InputLabel>
            <Select
              value={selectedGenre}
              label="Genre"
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <MenuItem value="">All Genres</MenuItem>
              {ALL_GENRES.map((g) => (
                <MenuItem key={g} value={g}>{g}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ flex: '1 1 120px', minWidth: 110 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              label="Year"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <MenuItem value="">All Years</MenuItem>
              {ALL_YEARS.map((y) => (
                <MenuItem key={y} value={String(y)}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Owned filter */}
          <ToggleButtonGroup
            exclusive
            size="small"
            value={filterOwned}
            onChange={(_, val) => val && setFilterOwned(val)}
            sx={{
              '& .MuiToggleButton-root': {
                borderColor: 'rgba(0, 212, 255, 0.15)',
                color: 'text.secondary',
                fontSize: '0.75rem',
                fontWeight: 600,
                py: 0.5,
                px: 1.5,
                '&.Mui-selected': {
                  bgcolor: 'rgba(0, 212, 255, 0.12)',
                  color: 'primary.main',
                  borderColor: 'rgba(0, 212, 255, 0.3)',
                },
              },
            }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="owned">
              <CheckCircleIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} />
              Owned
            </ToggleButton>
            <ToggleButton value="missing">
              <RadioButtonUncheckedIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} />
              Missing
            </ToggleButton>
          </ToggleButtonGroup>

          {/* View mode */}
          <ToggleButtonGroup
            exclusive
            size="small"
            value={viewMode}
            onChange={(_, val) => val && setViewMode(val)}
            sx={{
              '& .MuiToggleButton-root': {
                borderColor: 'rgba(0, 212, 255, 0.15)',
                color: 'text.secondary',
                p: 0.75,
                '&.Mui-selected': {
                  bgcolor: 'rgba(0, 212, 255, 0.12)',
                  color: 'primary.main',
                  borderColor: 'rgba(0, 212, 255, 0.3)',
                },
              },
            }}
          >
            <ToggleButton value="grid"><GridViewIcon sx={{ fontSize: '1rem' }} /></ToggleButton>
            <ToggleButton value="list"><ViewListIcon sx={{ fontSize: '1rem' }} /></ToggleButton>
          </ToggleButtonGroup>

          {hasFilters && (
            <Chip
              label="Clear"
              size="small"
              variant="outlined"
              onClick={clearFilters}
              sx={{ borderColor: 'rgba(255, 82, 82, 0.3)', color: 'error.main', cursor: 'pointer' }}
            />
          )}
        </Box>

        {/* Results count */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Showing
          </Typography>
          <Typography variant="body2" fontWeight={700} sx={{ color: 'primary.main' }}>
            {filtered.length}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            of {GAMES.length} games
          </Typography>
        </Box>

        {/* Game grid / list */}
        {filtered.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              borderRadius: 3,
              border: '1px dashed rgba(0, 212, 255, 0.15)',
            }}
          >
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              No games found
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.disabled', mt: 1 }}>
              Try adjusting your filters
            </Typography>
          </Box>
        ) : (
          <Fade in timeout={300}>
            <Grid container spacing={viewMode === 'grid' ? 2 : 1.5}>
              {filtered.map((game) => (
                <Grid
                  key={game.slug}
                  size={
                    viewMode === 'grid'
                      ? { xs: 6, sm: 4, md: 3, lg: 2 }
                      : { xs: 12, sm: 6, md: 4, lg: 3 }
                  }
                >
                  <GameCard game={game} compact={viewMode === 'grid'} />
                </Grid>
              ))}
            </Grid>
          </Fade>
        )}
      </Container>
    </Box>
  );
}
