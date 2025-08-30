import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2E7D32', // Dark green
    primaryDark: '#1B5E20',
    primaryLight: '#4CAF50',
    secondary: '#8BC34A', // Light green
    accent: '#FF9800', // Orange for alerts
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    textSecondary: '#757575',
    error: '#D32F2F',
    warning: '#FF9800',
    success: '#388E3C',
    info: '#1976D2',
    mangrove: '#4A6741', // Mangrove brown-green
    ocean: '#1976D2', // Ocean blue
    sand: '#F4E4BC', // Sand color
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#212121',
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#212121',
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      color: '#212121',
    },
    body: {
      fontSize: 16,
      color: '#212121',
    },
    caption: {
      fontSize: 14,
      color: '#757575',
    },
  },
};
