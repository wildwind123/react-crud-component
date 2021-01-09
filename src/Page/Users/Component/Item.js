import React, {Component} from "react"
import ElItem from "../../../Component/Crud/ElItem"
import {Redirect} from 'react-router-dom';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
        this.newItemAjax = this.newItemAjax.bind(this);
        this.editItemAjax = this.editItemAjax.bind(this);
        this.state.page = this.props.page;
      }

      newItemAjax(event) {
        this.setState(
          {
            isLoaded: false
          }
        );
        const data = new FormData(event.target.parentNode);
        const id = data.get('id');
        if ( id === undefined || id === null) {
          this.setState({
            isLoaded: true,
            error : {
              message: "id undefined"
            }
          });
          return;
        }
        var object = {};
        data.forEach(function(value, key){
        object[key] = value;
        });

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify(object);
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://reqres.in/api/users", requestOptions)
          .then(result => result.json()).then((resp) => {
            if (resp.id !== undefined && resp.id !== null) {
              this.setState(
                {
                  isLoaded: true,
                  redirect: "/user/" + resp.id + "/view",
                  page: "view"
                }
              );
            } else {
              this.setState(
                {
                  error: {
                    message: "unknown error"
                  }
                }
              );
            }
          });
         
      }

      setItem(id) {
        fetch("https://reqres.in/api/users/" + id)
        .then(res => res.json())
        .then(
          (result) => {
            if ( Object.keys(result).length === 0 && result.constructor === Object ) {
              this.setState({
                isLoaded: true,
                error : {
                  message: "not found, https://reqres.in, does not really create new element"
                }
              });
            } else {
              this.setState({
                isLoaded: true,
                item: result.data
              });
            }
           
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
      }
    
      componentDidMount() {
        if ( this.state.page === "new" ) {
          this.setState(
            {isLoaded: true}
          );
          return;
        }
        this.setItem(this.props.id);
      }
      editItemAjax(event) {
        this.setState({
          isLoaded: false,
        });
          event.preventDefault();
          const data = new FormData(event.target.parentNode);
          const id = data.get('id');
          if ( id === undefined || id === null) {
            this.setState({
              isLoaded: true,
              error : {
                message: "id undefined"
              }
            });
            return;
          }
          var object = {};
          data.forEach(function(value, key){
          object[key] = value;
          });
          var json = JSON.stringify(object);
        
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
              method: 'PATCH',
              headers: myHeaders,
              body: json,
              redirect: 'follow'
            };

            fetch("https://reqres.in/api/users/" + id, requestOptions).then((response) => {
              response.text();
            }).then(
              (result) => {
                this.setState({
                  isLoaded: false,
                  redirect: "/user/" + id + "/view",
                  page: "view"
                });
                this.setItem(id);
                
              },
              
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            )
    }

    render() {
        const { error, isLoaded } = this.state;
          if (error) {
            return <div>Ошибка: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Запрос...</div>;
          } else {
            if (this.state.redirect !== undefined && this.props.location?.state?.redirect !== false) {
              return <Redirect to={{
                pathname: this.state.redirect,
                state: {
                  redirect: false
                }
              }} />;
            }
            return (
              <ElItem id={this.props.id} mode={this.state.page} item={this.state.item} 
              editItemAjax={this.editItemAjax} newItemAjax={this.newItemAjax} delItemAjax={this.delItemAjax} />
          )
          }
    };
    
}

export default Item;
