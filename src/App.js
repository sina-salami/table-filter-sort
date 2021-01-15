import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/Main/Main';
import NotFound from './components/NotFound/NotFound';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
