// theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#00a2ff',
        // margin: '0 100px'
      },
      '::-webkit-scrollbar': {
        width: '10px',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#4A5568',
        borderRadius: '8px',
      },
      '::-webkit-scrollbar-track': {
        background: '#2D3748',
        borderRadius: '8px',
      },
      scrollbarWidth: '5px',
      scrollbarColor: '#4A5568 #2D3748'
    },
  },
  fonts: {
    body: 'M PLUS Code Latin, monospace',
    heading: "Source Code Pro, system-ui, sans-serif",
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
  breakpoints: {
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
  }
});

export default theme;
