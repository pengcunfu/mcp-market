import React from 'react';
import { Box, Typography, Link, Divider, Container } from '@mui/material';
import { Code, GitHub } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 4,
        bgcolor: 'grey.900',
        color: 'grey.300',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Code />
              <Typography variant="h6" color="inherit">
                MCP Market
              </Typography>
            </Box>
            <Typography variant="body2" color="grey.500" sx={{ mt: 1 }}>
              发现、分享和管理强大的 MCP 服务器
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              color="inherit"
              sx={{ mb: 1, fontWeight: 'bold' }}
            >
              快速链接
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Link
                component={RouterLink}
                to="/categories"
                color="inherit"
                underline="hover"
              >
                分类浏览
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                underline="hover"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
              >
                <GitHub fontSize="small" />
                GitHub
              </Link>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'grey.700', my: 2 }} />

        <Typography variant="body2" color="grey.500" align="center">
          © {new Date().getFullYear()} MCP Market · 基于 React 与 MUI 构建
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
