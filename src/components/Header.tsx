import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';
import { Search, Code, GitHub } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // 实现搜索逻辑
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
            MCP 市场
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
          <Button color="inherit" onClick={() => navigate('/')}>
            浏览
          </Button>
          <Button color="inherit" onClick={() => navigate('/categories')}>
            分类
          </Button>
          <Button color="inherit" onClick={() => navigate('/submit')}>
            提交
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;