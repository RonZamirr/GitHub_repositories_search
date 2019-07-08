import React, { Component } from 'react';

import { Repositories } from '../RepositoriesSearch/Repositories';

import axios from 'axios';
export class Marked_repositories extends Component {
    displayName = Marked_repositories.name
    state = {
        repositories:[],
        Marked_repositories: [],
        Show_result:false

    }
    //GetBookmaredRepositoryFromSession
    //----------------------------------------------------
    componentDidMount() {
        fetch('api/RepositoriesSearch/GetBookmaredRepositoryFromSession')
            .then(response => response.json())
            .then(res =>
                this.handlesresponse(res)
 
            );
    }
   
   //var res = str.split(" ");
    //--------------------------------------------------------------------------------
    handlesresponse = (data) => {
    
   
        var arr_repositories = [];
        var arr_ids = [];

        data.forEach(Repository => {
            Repository = Repository.split(" ");
            arr_repositories.push({
                "id": Repository[0],
                "OwnerAvatar": Repository[1],
                "OwnerName": Repository[2],
                "RepositoryName": Repository[3],
                "RepositoryUrl": Repository[4]

            });
          
            arr_ids.push(Repository[0]);         
        });
        this.setState({ Marked_repositories: arr_ids, repositories: arr_repositories, Show_result: data.length > 0 })

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
            .then(res => {
                this.RemoveRepository(Repository["id"]);
                
            });
    }
    //-------------------------------------------------
    RemoveRepository = (id_to_remove) => {
        let arr = this.state.repositories;
     
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id_to_remove) {
                arr.splice(i, 1);
  
            }
        }

        this.setState({repositories: arr, Show_result: arr.length>0 });

    }
    //-----------------------------------------------------
    render() {
        return (
            <div style={Homestyle2} >
                

                <div className="container-fluid">
                    {!this.state.Show_result  ?
                        <div className="jumbotron jumbotron-fluid">We couldn’t find any repositories you marked </div>

                        : <div className="row equal" >
                            <Repositories  repositories={this.state.repositories} Marked_repositories={this.state.Marked_repositories} UnBookRepository={this.UnBookRepository} BookRepository={this.BookRepository} />
                        </div>
                    }
                </div>
            </div>
        );
    }

}
//--------------------------------------------
const Homestyle2 = {
    paddingTop: '10px',


}