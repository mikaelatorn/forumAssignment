import React from 'react'
import { Button } from 'react-bootstrap'


class Btn extends React.Component {
   clickEvent = (event) => {
    this.props.onClick(event);
  }
  render() {
        return  <Button onClick={this.clickEvent} type={this.props.type} bsStyle={this.props.bsStyle} bsSize={this.props.size} value={this.props.value} block={ this.props.block }>{ this.props.name}</Button>
  }
}

export default Btn;