import React, { FC, useState } from 'react';
import './App.css';
import TextBox from './components/TextBox';
import TextField from './components/TextFieldLogic';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from "@material-ui/core/CssBaseline";
import { grey, cyan } from '@material-ui/core/colors';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { WordsInChars } from './interfaces/WordsInChars';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: cyan['A200'],
    },
    background: {
      default: grey[800]
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 24,
  }
});


const App: FC = () => {
  const [wordsArr, setWordsArr] = useState<Array<WordsInChars>>([])
  console.log(wordsArr);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center" className="App">
        <TextBox setWordsArr={setWordsArr}/>
        <TextField wordsArr={wordsArr}/>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
