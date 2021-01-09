import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Redirect, Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

class ElItem extends Component {

    constructor(props) {
        super(props);
    }

    getFormGroups() {
        var argument = this.props.argument;
        delete argument['buttonDel'];
        delete argument['buttonEdit'];
        delete argument['buttonView'];
        var keys = Object.keys(argument);
        var forms = keys.map(
            (key) => {
                var type = "text";
                if ( argument[key]?.type === "number") {
                    type = "number";
                } 
                return <Form.Group key={key}>
                        <Form.Label>{argument[key]?.label}</Form.Label>
                    <Form.Control readOnly={
                        function(mode) {
                            var readOnly = false;
                            if ( mode === "view" ) {
                                readOnly = true;
                            }
                            return readOnly;
                        }(this.props.mode)
                    } key={key} type={type} defaultValue={
                        function(mode, item) {
                            if ( mode === "edit" || mode === "view") {
                                return item;
                            } 
                            return "";
                        }(this.props.mode, this.props.item[key])
                    } name={key}/>
                    </Form.Group>
            }
        );
        return forms.filter(Boolean);
    }

    getButton(id) {
        if ( this.props.mode === "view" ) {
            return "";
        } else if ( this.props.mode === "edit" ) {
            return <><Button variant="primary" onClick={this.props.editItemAjax} type="submit">
            Save
            </Button> {' '}
            <Button variant="secondary" onClick={this.props.delItemAjax} >
            Del
            </Button></> ;
        }
      return  <><Button variant="primary" onClick={this.props.newItemAjax } >
             Create
             </Button> {' '}
             </> ;
    }

    render() {
        return <Form>
            {this.getFormGroups()}
            {this.getButton(this.props.item.id)}
        </Form>
    }
}

ElItem.defaultProps = {
    mode : "edit",
    item : {
        id : 1,
        name: "Djo",
        age: 30
    },
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
        first_name : {
            label: "Имя",
            type: "text",
            attribute: {
              
            }
        },
        email : {
            label: "Эмайл",
            type: "text",
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

export default ElItem;