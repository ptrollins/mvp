import React from 'react';
import { hot } from 'react-hot-loader/root';
import Game from './Game';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#339ed3',
      main: '#0086c8',
      dark: '#005d8c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#bd344c',
      main: '#ad0220',
      dark: '#790116',
      contrastText: '#18162c',
    },
  },
});

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <header>
          <h1>Reading Well</h1>
        </header>
        <Game />
        <footer>
          <span>&copy;2020</span>
        </footer>
      </ThemeProvider>
    );
  }
}

export default hot(App);
