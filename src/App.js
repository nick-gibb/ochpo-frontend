import React from "react";
import "./App.css";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import Posts from './posts'
import SimpleCard from './card'

function App() {
  return (
      <div>
        <AppBar color="primary" position="static">
          <Toolbar>
            <TypoGraphy
              color="inherit"
            >
              Briefing Portal
           </TypoGraphy>
          </Toolbar>
        </AppBar>
        <Posts />
        
      </div>
  );
}

export default App;
