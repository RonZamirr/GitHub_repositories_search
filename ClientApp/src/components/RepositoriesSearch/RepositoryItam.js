import React, { Component } from 'react';

export class RepositoryItam extends Component {
    displayName = RepositoryItam.name


    constructor(props) {
        super(props);

        this.state = {
            is_Bookmark: this.CheckIFMarked(this.props.Marked_repositories),
            Marked_repositories_id: this.props.Marked_repositories
        };

    }
    //------------------------------------------------------------------------
    CheckIFMarked = (ids) => {
        let find = false;
        this.props.Marked_repositories.forEach(id => {

            if (id === this.props.Repository.id.toString())
                find = true;
        });

        return find;
    }


    //------------------------------------------------------------------------
    onBookmark = (e) => {
        e.preventDefault();


        this.setState({ is_Bookmark: !this.state.is_Bookmark });

        if (this.state.is_Bookmark)
            this.props.UnBookRepository(this.props.Repository);//call to func from props
        else
            this.props.BookRepository(this.props.Repository)//call to func from props
    }
    //------------------------------------------------------------------------
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    //------------------------------------------------------------------------
    Bookmark
        = (e) => {
            return (<button onClick={this.onBookmark} className="btn btn-default">UnBookmark</button>)
        }
    //------------------------------------------------------------------------
    UnBookmark
        = (e) => {
            return (<button onClick={this.onBookmark} className="btn btn-info">Bookmark</button>)
        }
    //------------------------------------------------------------------------
    render() {


        return (

            <div className="card col-xs-12 col-sm-6 col-md-4 col-lg-3 shadow" >

                <img className="card-img-top" src={this.props.Repository['OwnerAvatar']} alt="Card" style={{ width: '100%' }} />

                <div className="card-body divText" >
                    <br />
                    <p className="card-title">owner:  {' ' + this.props.Repository['OwnerName']}</p>

                    <p className="card-text">Repository:
                    <br />
                        <a target="_blank" href={this.props.Repository['RepositoryUrl']} data-toggle="tooltip"
                            data-placement="bottom" title={this.props.Repository['RepositoryName']}>{this.props.Repository['RepositoryName']}</a>
                    </p>
                </div>
                {this.state.is_Bookmark ?
                    this.Bookmark() :
                    this.UnBookmark()
                }

            </div>




        )
    }
}

