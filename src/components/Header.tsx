import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem
} from '@mui/material';
import { Search, Code, GitHub, Category, KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { mockCategories } from '../data/mockData';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/categories?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleCategoryMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/categories/${categoryId}`);
    handleCategoryMenuClose();
  };

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Code sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => navigate('/')}
          >
            MCP Market
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{ mx: 4, flexGrow: 2, maxWidth: 600 }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="搜索MCP服务器..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => navigate('/mcp')}
            sx={location.pathname.startsWith('/mcp') ? { bgcolor: 'rgba(255, 255, 255, 0.15)' } : undefined}
          >
            MCP
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/skills')}
            sx={location.pathname.startsWith('/skills') ? { bgcolor: 'rgba(255, 255, 255, 0.15)' } : undefined}
          >
            Skills
          </Button>
          <Button
            color="inherit"
            startIcon={<Category />}
            endIcon={<KeyboardArrowDown />}
            onClick={handleCategoryMenuOpen}
          >
            分类
          </Button>
          <IconButton
            color="inherit"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCategoryMenuClose}
          PaperProps={{
            sx: {
              maxHeight: 300,
              minWidth: 200,
            }
          }}
        >
          <MenuItem onClick={() => { navigate('/categories'); handleCategoryMenuClose(); }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              全部分类
            </Typography>
          </MenuItem>
          {mockCategories.map((category) => (
            <MenuItem
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              {category.name}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
