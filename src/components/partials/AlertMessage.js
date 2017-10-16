

import React from 'react'
import { Alert} from 'react-bootstrap'


class AlertMessage extends React.Component {
  closeMessage = () => {
    this.props.onDismiss();
  }
  render() {
        return  <Alert bsStyle={this.props.type} onDismiss={this.closeMessage}>
          <p>{ this.props.alertMsg }</p>
        </Alert>
    
  }
}

export default AlertMessage;



