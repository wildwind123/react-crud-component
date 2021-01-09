import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

class ElTable extends Component {
    
    getThreadElement() {
        var th = [];
        var threadKeys = Object.keys(this.props.argument);
        th = threadKeys.map(
            (key) => {
                var style = this.props.argument[key].attribute?.style;
                return <th key={key} style={style || {}} >{this.props.argument[key].label}</th>
            }
        );
        this.elementLength = th.length;
        if( this.props.argument?.buttonEdit ) {
            this.elementLength--;
           }

           if( this.props.argument?.buttonView ) {
            this.elementLength--;
                }

            if( this.props.argument?.buttonDel ) {
                this.elementLength--;
            }
        return <thead><tr>{th}</tr></thead>;
    }
    getTbody() {
        var collection = this.props.collection;

        return <tbody>
            
            {collection.map(
            (item) => {
                return this.getTr(item)
            })}
        </tbody>     
    }
    getTr(item) {
       var keys = Object.keys(item);
       var trCollectioin = keys.map(
           (key) => {
               return <td key={key} data-key={key}>{item[key]}</td>
           }
       );
       var trCollectionSlice = trCollectioin.slice(0, this.elementLength)
           if( this.props.argument?.buttonEdit ) {
            trCollectionSlice.push(<td key="edit" data-key="edit" id={item.id} onClick={this.props.editAction}>edit</td>)
           }

           if( this.props.argument?.buttonView ) {
            trCollectionSlice.push(<td key="view" data-key="view" id={item.id} onClick={this.props.viewAction}>view</td>)
                }

            if( this.props.argument?.buttonDel ) {
                trCollectionSlice.push(<td key="del" data-key="del" id={item.id} onClick={this.props.delAction}>del</td>)
            }

       return <tr key={item.id} data-key={item.id}>{trCollectionSlice}</tr>;
    }
    
    render() {
        return<Table striped bordered hover size="sm">
             {this.getThreadElement()}
               {this.getTbody()}
        </Table>
    }
}

ElTable.defaultProps = {
    collection : [
        {
            id : 1,
            name: "Djo",
            age: 30
        },
        {
            id: 2,
            name: "Fred",
            age: 28
        }
    ],
    argument : {
        id : {
            label: "Ид",
            type: "number",
            attribute: {
                style: {
                    width: "20px"
                }
            }
        },
        name : {
            label: "Имя",
            type: "text",
            attribute: {
              
            }
        },
        age : {
            label: "Возраст",
            type: "number",
            attribute: {
              
            }
        },
        buttonDel : {
            label: "уд.",
            attribute: {
                style: {
                    width: "20px"
                }
            }
        },
        buttonView: {
            label: "см.",
            attribute: {
                style: {
                    width: "20px"
                }
            }
        },
        buttonEdit: {
            label: "ред.",
            attribute: {
                style: {
                    width: "20px"
                }
            }
        }
    },
  
}

export default ElTable;