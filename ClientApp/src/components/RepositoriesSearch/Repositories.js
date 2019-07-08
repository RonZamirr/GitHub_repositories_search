import React, { Component } from 'react';
import { RepositoryItam } from './RepositoryItam';
export class Repositories extends Component {
    displayName = Repositories.name
    state = {
        name_to_search: ''
    }


            render() {
                return this.props.repositories.map((Repository) => (
                 
                    <RepositoryItam
                        key={Repository.id}
                        Repository={Repository}
                        BookRepository={this.props.BookRepository}
                        Marked_repositories={this.props.Marked_repositories}
                        UnBookRepository={this.props.UnBookRepository}
                    />        
         ));}
         
            
}


