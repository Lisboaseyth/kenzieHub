// theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      // Estilos globais aqui
      // Por exemplo, body: { bg: 'gray.100', color: 'gray.800' }
      body: {
        bg: '#121214',
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
      scrollbarWidth: '5px', // Para navegadores baseados no Firefox
      scrollbarColor: '#4A5568 #2D3748', // Para navegadores baseados no Firefox
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
},
  components: {
  Button: {
    // Estilos para o componente de botão aqui
  },
  Heading: {
    baseStyle: {
      // Estilos base para o componente Heading aqui
    },
    sizes: {
      // Tamanhos personalizados para o componente Heading aqui
    },
  },
  // Adicione mais componentes conforme necessário
},
});

export default theme;
