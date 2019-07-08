import React, { Component } from 'react';
import Header from './components/Header';

//-----------------------------------------
import { Route } from 'react-router';
import { Marked_repositories } from './components/MarkedRepositories/Marked_repositories';
import { RepositoriesSearch } from './components/RepositoriesSearch/RepositoriesSearch';

//---------------------------------------
export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <div className="container">
                <Header/>
                <Route exact path='/' component={RepositoriesSearch} />
                <Route path='/MarkedRepositories' component={Marked_repositories} />
                
            </div>
        );
    }
}
