import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import BTECCalculator from './components/BTECCalculator';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BTECCalculator />
    </ThemeProvider>
  );
}

export default App;
