import React, {Component} from "react";
import ElTable from "../../../Component/Crud/ElTable";
import {Link} from 'react-router-dom';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }
    
      componentDidMount() {
        fetch("https://reqres.in/api/users")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.data
            });
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
      }
      
    render() {
        const { error, isLoaded, items } = this.state;
      
        if (error) {
            return <div>Ошибка: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Загрузка...</div>;
          } else {
            return (
              <>
              <Link to="/user/new">New user</Link>
                <ElTable collection={items}
                editAction={this.props.editAction}
                viewAction={this.props.viewAction}
                delAction={this.props.delAction}
                />
                </>
            );
          }
    }
}

export default Table;