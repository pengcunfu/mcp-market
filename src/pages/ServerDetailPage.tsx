import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Chip,
  Rating,
  Paper,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  ButtonGroup
} from '@mui/material';
import SimpleGrid from '../components/SimpleGrid';
import {
  ArrowBack,
  GitHub,
  Language,
  Download,
  Share,
  Bookmark,
  BookmarkBorder,
  CheckCircle,
  Code,
  Description,
  Comment,
  ThumbUp,
  Flag
} from '@mui/icons-material';
import { mockServers, mockReviews } from '../data/mockData';

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
    id={`detail-tabpanel-${index}`}
    aria-labelledby={`detail-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
  );
}

const ServerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userReview, setUserReview] = useState({ rating: 5, comment: '' });

  const server = mockServers.find(s => s.id === id);
  const reviews = mockReviews;

  if (!server) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          服务器未找到
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          startIcon={<ArrowBack />}
        >
          返回首页
        </Button>
      </Box>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: server.name,
        text: server.description,
        url: window.location.href,
      });
    }
  };

  const handleSubmitReview = () => {
    // 实现提交评价逻辑
    alert('评价已提交！');
    setUserReview({ rating: 5, comment: '' });
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          onClick={() => navigate('/')}
          startIcon={<ArrowBack />}
          sx={{ mb: 2 }}
        >
          返回
        </Button>

        <Paper sx={{ p: 4 }}>
          <SimpleGrid container spacing={4}>
            <SimpleGrid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                <Avatar
                  sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}
                  src={server.logo}
                >
                  {server.name.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                    {server.name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    by {server.author}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Rating value={server.rating} precision={0.1} readOnly />
                    <Typography variant="body2" color="text.secondary">
                      {server.rating} ({server.reviews} 评价)
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {server.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {server.tags.map((tag) => (
                      <Chip key={tag} label={tag} variant="outlined" size="small" />
                    ))}
                  </Box>
                </Box>
              </Box>
            </SimpleGrid>

            <SimpleGrid item xs={12} md={4}>
              <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <ButtonGroup variant="outlined" sx={{ mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <Button
                    startIcon={<Download />}
                    size="large"
                    sx={{ flex: 1 }}
                  >
                    安装
                  </Button>
                  <Button
                    startIcon={isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                    onClick={handleBookmark}
                    size="large"
                    sx={{ flex: 1 }}
                  >
                    {isBookmarked ? '已收藏' : '收藏'}
                  </Button>
                  <Button
                    startIcon={<Share />}
                    onClick={handleShare}
                    size="large"
                    sx={{ flex: 1 }}
                  >
                    分享
                  </Button>
                </ButtonGroup>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                  <IconButton
                    href={server.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                  >
                    <GitHub />
                  </IconButton>
                  <IconButton
                    href={server.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                  >
                    <Language />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                  统计信息
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="text.secondary">下载量</Typography>
                  <Typography fontWeight="bold">{server.downloads.toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="text.secondary">版本</Typography>
                  <Typography fontWeight="bold">{server.version}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="text.secondary">许可证</Typography>
                  <Typography fontWeight="bold">{server.license}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">最后更新</Typography>
                  <Typography fontWeight="bold">{server.lastUpdated}</Typography>
                </Box>
              </Box>
            </SimpleGrid>
          </SimpleGrid>
        </Paper>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="功能特性" icon={<CheckCircle />} />
          <Tab label="安装说明" icon={<Download />} />
          <Tab label="文档" icon={<Description />} />
          <Tab label="评价" icon={<Comment />} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            主要功能
          </Typography>
          <List>
            {server.features.map((feature, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText primary={feature} />
              </ListItem>
            ))}
          </List>

          {server.dependencies && server.dependencies.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                依赖项
              </Typography>
              <List>
                {server.dependencies.map((dep, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Code color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary={dep} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            安装说明
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'grey.100', fontFamily: 'monospace' }}>
            <Typography component="pre">
              {`# 使用 npm 安装
npm install ${server.name.toLowerCase().replace(/\s+/g, '-')}

# 使用 yarn 安装
yarn add ${server.name.toLowerCase().replace(/\s+/g, '-')}

# 使用 pnpm 安装
pnpm add ${server.name.toLowerCase().replace(/\s+/g, '-')}`}
            </Typography>
          </Paper>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            基本使用
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'grey.100', fontFamily: 'monospace' }}>
            <Typography component="pre">
              {`import { ${server.name.replace(/\s+/g, '')} } from '${server.name.toLowerCase().replace(/\s+/g, '-')}';

// 初始化配置
const config = {
  // 配置选项
};

const server = new ${server.name.replace(/\s+/g, '')}(config);

// 启动服务器
server.start();`}
            </Typography>
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            文档
          </Typography>
          {server.readme ? (
            <Paper sx={{ p: 2 }}>
              <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                {server.readme}
              </Typography>
            </Paper>
          ) : (
            <Typography color="text.secondary">
              详细文档请查看 <a href={server.documentation} target="_blank" rel="noopener noreferrer">官方文档</a>
            </Typography>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            用户评价
          </Typography>

          {/* Add Review Form */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              写下您的评价
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Rating
                value={userReview.rating}
                onChange={(event, newValue) => {
                  setUserReview({ ...userReview, rating: newValue || 5 });
                }}
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="分享您的使用体验..."
              value={userReview.comment}
              onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleSubmitReview}>
              提交评价
            </Button>
          </Paper>

          {/* Reviews List */}
          <List>
            {reviews.map((review) => (
              <Card key={review.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2 }}>{review.userName.charAt(0)}</Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1">{review.userName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {review.date}
                      </Typography>
                    </Box>
                    <Rating value={review.rating} size="small" readOnly />
                  </Box>
                  <Typography variant="body1" paragraph>
                    {review.comment}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      size="small"
                      startIcon={<ThumbUp />}
                      color="primary"
                    >
                      有用 ({review.helpful})
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Flag />}
                      color="secondary"
                    >
                      举报
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </List>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default ServerDetailPage;