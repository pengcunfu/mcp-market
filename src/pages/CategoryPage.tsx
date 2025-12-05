import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Search,
  Download,
  Code,
  Work,
  Chat,
  Analytics,
  Psychology,
  Settings,
  Launch,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { McpServer, McpCategory, FilterOptions } from '../types';
import { mockServers, mockCategories } from '../data/mockData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`category-tabpanel-${index}`}
      aria-labelledby={`category-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const categoryIcons: { [key: string]: React.ReactElement } = {
  development: <Code />,
  productivity: <Work />,
  communication: <Chat />,
  data: <Analytics />,
  ai: <Psychology />,
  system: <Settings />,
};

function CategoryServerCard({ server }: { server: McpServer }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            {categoryIcons[server.category] || <Code />}
          </Avatar>
          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              {server.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              by {server.author}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>
          {server.description}
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
          {server.tags.slice(0, 3).map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
          {server.tags.length > 3 && (
            <Chip label={`+${server.tags.length - 3}`} size="small" variant="outlined" />
          )}
        </Box>

        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <Rating value={server.rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary">
            ({server.reviews})
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2} color="text.secondary">
          <Box display="flex" alignItems="center" gap={0.5}>
            <Download fontSize="small" />
            <Typography variant="body2">
              {server.downloads.toLocaleString()}
            </Typography>
          </Box>
          <Typography variant="body2">
            v{server.version}
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={() => navigate(`/server/${server.id}`)}
        >
          查看详情
        </Button>
        <Button
          size="small"
          startIcon={<Launch />}
          href={server.repository}
          target="_blank"
          rel="noopener noreferrer"
        >
          仓库
        </Button>
      </CardActions>
    </Card>
  );
}

function CategoryOverview({ category }: { category: McpCategory }) {
  const categoryServers = useMemo(() => {
    return mockServers.filter(server => server.category === category.id);
  }, [category.id]);

  const stats = useMemo(() => {
    const totalDownloads = categoryServers.reduce((sum, server) => sum + server.downloads, 0);
    const averageRating = categoryServers.length > 0
      ? categoryServers.reduce((sum, server) => sum + server.rating, 0) / categoryServers.length
      : 0;
    const topServers = [...categoryServers]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);

    return {
      serverCount: categoryServers.length,
      totalDownloads,
      averageRating: averageRating || 0,
      topServers,
    };
  }, [categoryServers]);

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 56, height: 56 }}>
          {categoryIcons[category.id]}
        </Avatar>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {category.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {category.description}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h3" component="div" color="primary.main">
                {stats.serverCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                服务器数量
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h3" component="div" color="primary.main">
                {stats.totalDownloads.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                总下载量
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h3" component="div" color="primary.main">
                {stats.averageRating.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                平均评分
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h3" component="div" color="primary.main">
                {stats.topServers.length > 0 ? stats.topServers[0].rating.toFixed(1) : '0.0'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                最高评分
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {stats.topServers.length > 0 && (
        <Box mb={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            🔥 热门服务器
          </Typography>
          <Grid container spacing={2}>
            {stats.topServers.map((server) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={server.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {server.name}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Rating value={server.rating} precision={0.1} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary">
                        ({server.reviews} 评价)
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {server.downloads.toLocaleString()} 次下载
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sortBy: 'downloads',
    sortOrder: 'desc',
  });

  const currentCategory = useMemo(() => {
    if (!categoryId) return null;
    return mockCategories.find(cat => cat.id === categoryId) || null;
  }, [categoryId]);

  const filteredServers = useMemo(() => {
    let servers = currentCategory
      ? mockServers.filter(server => server.category === currentCategory.id)
      : mockServers;

    if (searchTerm) {
      servers = servers.filter(server =>
        server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    servers.sort((a, b) => {
      let comparison = 0;
      switch (filterOptions.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'downloads':
          comparison = a.downloads - b.downloads;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'updated':
          comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
          break;
      }
      return filterOptions.sortOrder === 'desc' ? -comparison : comparison;
    });

    return servers;
  }, [currentCategory, searchTerm, filterOptions]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    if (newValue === 0) {
      navigate('/categories');
    } else {
      const category = mockCategories[newValue - 1];
      navigate(`/categories/${category.id}`);
    }
  };

  React.useEffect(() => {
    if (categoryId) {
      const index = mockCategories.findIndex(cat => cat.id === categoryId);
      if (index !== -1) {
        setTabValue(index + 1);
      }
    } else {
      setTabValue(0);
    }
  }, [categoryId]);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        分类浏览
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        <Tab label="全部分类" />
        {mockCategories.map((category) => (
          <Tab
            key={category.id}
            label={category.name}
          />
        ))}
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {mockCategories.map((category) => {
            const serverCount = mockServers.filter(server => server.category === category.id).length;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => navigate(`/categories/${category.id}`)}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        {categoryIcons[category.id]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="h2">
                          {category.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {category.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="primary.main">
                      {serverCount} 个服务器
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </TabPanel>

      {mockCategories.map((category, index) => (
        <TabPanel key={category.id} value={tabValue} index={index + 1}>
          <CategoryOverview category={category} />

          <Box display="flex" gap={2} alignItems="center" mb={3}>
            <TextField
              placeholder="搜索服务器..."
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
              sx={{ minWidth: 300 }}
            />

            <FormControl variant="outlined" sx={{ minWidth: 150 }}>
              <InputLabel>排序方式</InputLabel>
              <Select
                value={`${filterOptions.sortBy}-${filterOptions.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  setFilterOptions(prev => ({
                    ...prev,
                    sortBy: sortBy as FilterOptions['sortBy'],
                    sortOrder: sortOrder as FilterOptions['sortOrder'],
                  }));
                }}
                label="排序方式"
              >
                <MenuItem value="downloads-desc">下载量 (高到低)</MenuItem>
                <MenuItem value="downloads-asc">下载量 (低到高)</MenuItem>
                <MenuItem value="rating-desc">评分 (高到低)</MenuItem>
                <MenuItem value="rating-asc">评分 (低到高)</MenuItem>
                <MenuItem value="name-asc">名称 (A-Z)</MenuItem>
                <MenuItem value="name-desc">名称 (Z-A)</MenuItem>
                <MenuItem value="updated-desc">最近更新</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Typography variant="h5" component="h2" gutterBottom>
            所有服务器 ({filteredServers.length})
          </Typography>

          <Grid container spacing={3}>
            {filteredServers.map((server) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={server.id}>
                <CategoryServerCard server={server} />
              </Grid>
            ))}
          </Grid>

          {filteredServers.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                没有找到匹配的服务器
              </Typography>
              <Typography variant="body2" color="text.secondary">
                尝试调整搜索条件或筛选器
              </Typography>
            </Box>
          )}
        </TabPanel>
      ))}
    </Box>
  );
}