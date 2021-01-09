import React, {Component} from "react";
import Table from './Component/Table';
import Item from './Component/Item';
import {Redirect} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

class User extends Component {

    constructor(props) {
        super(props);
        var page = ""
        if ( 
            this.props.match.params.action === undefined &&
            this.props.match.params.id === undefined
            ) {
                page = "table";
            } else if (
                this.props.match.params.id === "new"
            ) {
                page = "new";
            } else if ( 
                this.props.match.params.action === "edit" &&
                this.props.match.params.id !== undefined
            ) {
                page = "edit";
            } else if ( 
                this.props.match.params.action === "view"
             ) {
                page = "view";
             } else if (  this.props.match.params.action === "del" ) {
                 page = "del";
             }
            this.state = {
                page: page,
            };
        this.editAction = this.editAction.bind(this);
        this.delAction = this.delAction.bind(this);
        this.viewAction = this.viewAction.bind(this);
        this.newAction = this.newAction.bind(this);
    }


    editAction(event) {
        this.setState({
            redirect: "/user/" + event.target.id + "/edit",
        });
    }
    delAction(event) {
        var answer = window.confirm("Save data?");
        if (answer) {
            var myHeaders = new Headers();
            myHeaders.append("Cookie", "__cfduid=dc44d67b55a545ab84238bd5f434094551610104020");
            
            var requestOptions = {
              method: 'DELETE',
              headers: myHeaders,
              redirect: 'follow'
            };
        this.setState(
            {
                isLoaded: false
            }
        );    
            fetch("https://reqres.in/api/users/" + event.target.id, requestOptions)
              .then(response => {
                  if ( response.status !== 204 ) {
                      alert("Не смог удалить id =" + event.target.id);
                  }
                  this.setState(
                    {
                        isLoaded: true
                    }
                );  
              });
        }
        else {
            //some code
        }

    }
    viewAction(event) {
        this.setState({
            redirect: "/user/" + event.target.id + "/view",
        });
    }
    newAction(event) {
        this.setState({
            redirect: "/user/new",
        });
        console.log("newAction");
    }

    render() {
        var childEl = "Page note found."
        var page = this.state.page;
        
        if (this.state.redirect !== undefined) {
            return <Redirect push to={this.state.redirect} />;
        } else if ( page === "table" ) {
            childEl = <Table 
            editAction={this.editAction} 
            delAction={this.delAction}
            viewAction={this.viewAction}
            newAction={this.newAction}
            />;
        } else if ( page === "new" ) {
            childEl = <Item id={this.props.match.params.id} page="new" location={this.props.location} items={this.state.items}/>;
        } else if ( page === "view" ) {
            childEl = <Item id={this.props.match.params.id} page="view" location={this.props.location} />;
        } else if ( page === "edit" ) {
            childEl = <Item id={this.props.match.params.id} page="edit" location={this.props.location} item={this.state.item}/>;
        } else if ( page === "del" ) {
            childEl = "del";
        }

        if ( this.state.isLoaded === false ) {
            childEl = "loading"
        }
    
        return (
            <div>
                <Navbar bg="dark" variant="dark"> 
                    <Nav className="mr-auto">
                        <Nav.Link href="/user">User table</Nav.Link>
                        <Nav.Link href="https://reqres.in/">Fake rest api</Nav.Link>
                    </Nav>
                </Navbar>
                <br/>
                {childEl}
                
            </div>
        );
    }
}

export default User;