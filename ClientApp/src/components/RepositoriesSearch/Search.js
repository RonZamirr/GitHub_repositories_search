import React, { Component } from 'react';
export class Search extends Component {
    displayName = Search.name
    state = {
        name_to_search: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        //call to func from props
        if (this.state.name_to_search.length < 1) {
            alert("Validation Failed")
        }
        else
        this.props.search(this.state.name_to_search);
       
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div className="jumbotron jumbotron-fluid">
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                    <input className="form-control"
                    type="text"
                    name="name_to_search"
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Enter repositore name ..."
                    value={this.state.name_to_search}
                    onChange={this.onChange}
                />
                    <input className="btn btn-success" 
                    type="submit"
                    value="Submit"
                 
                 
                />
                </form>
            </div>
        )
    }
}

