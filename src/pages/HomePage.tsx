import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Rating,
  IconButton,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Avatar
} from '@mui/material';
import SimpleGrid from '../components/SimpleGrid';
import {
  Download,
  GitHub,
  Language,
  TrendingUp,
  NewReleases,
  LocalFireDepartment,
  Explore,
  Add
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { mockServers, mockCategories } from '../data/mockData';
import { McpServer } from '../types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredServers = mockServers.filter(server => {
    if (selectedCategory === 'all') return true;
    return server.category === selectedCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });

  
  const ServerCard: React.FC<{ server: McpServer }> = ({ server }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{ mr: 2, bgcolor: 'primary.main' }}
            src={server.logo}
          >
            {server.name.charAt(0)}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              {server.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              by {server.author}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {server.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          {server.tags.slice(0, 3).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ mr: 0.5, mb: 0.5 }}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating
            value={server.rating}
            precision={0.1}
            size="small"
            readOnly
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {server.rating} ({server.reviews})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Download sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="body2">
              {server.downloads.toLocaleString()}
            </Typography>
          </Box>
          <Typography variant="body2">
            v{server.version}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => navigate(`/server/${server.id}`)}
        >
          查看详情
        </Button>
        <Box>
          <IconButton
            size="small"
            href={server.repository}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub />
          </IconButton>
          <IconButton
            size="small"
            href={server.documentation}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Language />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          MCP 服务器市场
        </Typography>
        <Typography variant="h6" paragraph>
          发现、分享和管理强大的 MCP 服务器
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Explore />}
            sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
          >
            浏览服务器
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Add />}
            sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            提交服务器
          </Button>
        </Box>
      </Paper>

      {/* Stats Section */}
      <SimpleGrid container spacing={3} sx={{ mb: 4 }}>
        <SimpleGrid item xs={12} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {mockServers.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              服务器总数
            </Typography>
          </Paper>
        </SimpleGrid>
        <SimpleGrid item xs={12} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {mockServers.reduce((sum, s) => sum + s.downloads, 0).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              总下载量
            </Typography>
          </Paper>
        </SimpleGrid>
        <SimpleGrid item xs={12} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {mockCategories.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              分类数量
            </Typography>
          </Paper>
        </SimpleGrid>
        <SimpleGrid item xs={12} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {(mockServers.reduce((sum, s) => sum + s.rating, 0) / mockServers.length).toFixed(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              平均评分
            </Typography>
          </Paper>
        </SimpleGrid>
      </SimpleGrid>

      {/* Categories */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        热门分类
      </Typography>
      <SimpleGrid container spacing={2} sx={{ mb: 4 }}>
        {mockCategories.map((category) => (
          <SimpleGrid item xs={12} sm={6} md={4} key={category.id}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2,
                },
              }}
              onClick={() => setSelectedCategory(category.id)}
            >
              <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                {category.icon}
              </Avatar>
              <Box>
                <Typography variant="h6">{category.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
              </Box>
            </Paper>
          </SimpleGrid>
        ))}
      </SimpleGrid>

      {/* Tabs and Filters */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="热门服务器" icon={<LocalFireDepartment />} />
          <Tab label="最新发布" icon={<NewReleases />} />
          <Tab label="趋势上升" icon={<TrendingUp />} />
        </Tabs>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>分类</InputLabel>
          <Select
            value={selectedCategory}
            label="分类"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="all">全部分类</MenuItem>
            {mockCategories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>排序</InputLabel>
          <Select
            value={sortBy}
            label="排序"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="popular">热门</MenuItem>
            <MenuItem value="rating">评分</MenuItem>
            <MenuItem value="recent">最新</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Server Grid */}
      <SimpleGrid container spacing={3}>
        {filteredServers.map((server) => (
          <SimpleGrid item xs={12} sm={6} md={4} key={server.id}>
            <ServerCard server={server} />
          </SimpleGrid>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HomePage;