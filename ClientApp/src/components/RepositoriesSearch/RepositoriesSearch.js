import React, { Component } from 'react';
import { Search } from './Search';
import { Repositories } from './Repositories';
import axios from 'axios';
export class RepositoriesSearch extends Component {
    displayName = RepositoriesSearch.name
    state = {
        Search_value: "",
        Show_search_result: true,
        repositories: [],
        Marked_repositories: [],
        
    }

    //----------------------------------------------------
    componentDidMount() {
        fetch('api/RepositoriesSearch/GetBookmaredRepositoryIdsFromSession')
            .then(response => response.json())
            .then(res =>
               
                this.setState({ Marked_repositories: res })
                             
            );
    }
    //--------------------------------------------------------------------------------
    // Search repositories 
    SearchRepositories = (name) => {
       
       
        fetch('https://api.github.com/search/repositories?q=' + name)
            .then(response => response.json())
            .then(res =>
                this.handlesresponse(res['items'],name)
            );

    }
    //--------------------------------------------------------------------------------
    handlesresponse = (data, name) => {
        
        var arr_repositories = [];

        data.forEach(Repository => {
            arr_repositories.push({
                "OwnerAvatar": Repository['owner']['avatar_url'],
                "OwnerName": Repository['owner']['login'],
                "id": Repository["id"],
                "RepositoryName": Repository['full_name'],
                "RepositoryUrl": Repository['html_url']

            });
        });
    
        this.setState({ repositories: arr_repositories, Search_value: name, Show_search_result: data.length > 0 })
    }
    //----------------------------------------------------
    // Bookmark Repository
    BookRepository = (Repository) => {

        axios({
            method: 'post',
            url: 'api/RepositoriesSearch/BookmarkRepository',
            data: {
                OwnerName: Repository["OwnerName"],
                RepositoryName: Repository["RepositoryName"],
                RepositoryUrl: Repository["RepositoryUrl"],
                OwnerAvatar: Repository["OwnerAvatar"],
                id: Repository["id"]
            }
        })
        .then();         
    }
    //----------------------------------------------------
    // UnBookmark Repository
    UnBookRepository = (Repository) => {

        axios({
            method: 'delete',
            url: 'api/RepositoriesSearch/BookmarkRepository',
            data: {

                OwnerName: Repository["OwnerName"],
                RepositoryName: Repository["RepositoryName"],
                RepositoryUrl: Repository["RepositoryUrl"],
                OwnerAvatar: Repository["OwnerAvatar"],
                id: Repository["id"]
            }
        })
            .then();
    }
    //-----------------------------------------------------
    render() {
        return (
            <div style={Homestyle} >
                <Search search={this.SearchRepositories} />
     
                <div className="container-fluid">
                    {this.state.Show_search_result < 0 ?
                        <div className="jumbotron jumbotron-fluid">We couldn’t find any repositories matching :<br/> {this.state.Search_value}</div>

                        : <div className="row equal" >
                            <Repositories  Marked_repositories={this.state.Marked_repositories} UnBookRepository={this.UnBookRepository} BookRepository={this.BookRepository} repositories={this.state.repositories} />
                        </div>
                    }
                </div>
            </div>
        );
    }

}
//--------------------------------------------
const Homestyle = {
    paddingTop: '10px',


}