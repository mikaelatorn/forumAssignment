
import React from 'react'
import { FormGroup, FormControl,  ControlLabel} from 'react-bootstrap'


class Input extends React.Component {
  handleInput = (event) => {
    this.props.onInput(event);
  }
  render() {
        return  <FormGroup>
            <ControlLabel >{ this.props.label }</ControlLabel>
            <FormControl name={this.props.name} onChange={this.handleInput} value={this.props.value} componentClass={this.props.inputType} type={ this.props.type } placeholder={this.props.placeholder} required={this.props.required}/>
        </FormGroup>
    
  }
}




export default Input;


