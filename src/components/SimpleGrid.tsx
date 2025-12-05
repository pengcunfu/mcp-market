import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface SimpleGridProps {
  children: React.ReactNode;
  container?: boolean;
  item?: boolean;
  xs?: number;
  sm?: number;
  md?: number;
  spacing?: number;
  sx?: BoxProps['sx'];
}

const SimpleGrid: React.FC<SimpleGridProps> = ({
  children,
  container = false,
  item = false,
  xs,
  sm,
  md,
  spacing = 0,
  sx = {}
}) => {
  if (container) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: `-${spacing / 2}px`,
          ...sx
        }}
      >
        {children}
      </Box>
    );
  }

  if (item) {
    return (
      <Box
        sx={{
          width: '100%',
          padding: `${spacing / 2}px`,
          ...(xs === 12 && { flex: '0 0 100%' }),
          ...(xs && xs < 12 && {
            flex: `0 0 ${(xs / 12) * 100}%`,
            maxWidth: `${(xs / 12) * 100}%`
          }),
          ...(sm && {
            '@media (min-width: 600px)': {
              flex: `0 0 ${(sm / 12) * 100}%`,
              maxWidth: `${(sm / 12) * 100}%`
            }
          }),
          ...(md && {
            '@media (min-width: 960px)': {
              flex: `0 0 ${(md / 12) * 100}%`,
              maxWidth: `${(md / 12) * 100}%`
            }
          }),
          ...sx
        }}
      >
        {children}
      </Box>
    );
  }

  return <Box sx={sx}>{children}</Box>;
};

export default SimpleGrid;