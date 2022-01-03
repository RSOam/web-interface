import React from 'react';
import ResponsiveDrawer from './components/navigation'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import {BrowserRouter as Router} from "react-router-dom"
const theme = createMuiTheme({
  palette: {
      primary: {
        main: '#b71c1c',
      },
      secondary: {
        main: '#b71c1c',
      },
    },
});
export const App = () => {
  return(
    <Router>
      <ThemeProvider theme={theme}>
          <ResponsiveDrawer />
      </ThemeProvider>
    </Router>
  )
  };
export default App;
