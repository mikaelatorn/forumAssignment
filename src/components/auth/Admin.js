import React from 'react'
import { Table } from 'react-bootstrap'
import Btn from '../partials/Btn.js'
import AlertMessage from '../partials/AlertMessage.js'
import firebase from '../../firebase.js';
import { connect } from 'react-redux';
import { makeAdmin, deleteUser } from '../../actions';


class Admin extends React.Component {
    state = {
        alertVisible: false,
        alert: {
            type: '',
            message: '',
        }
    }
    handleAdmin = (event) => { //find user in db and change admin flag to true
        var self = this;
        firebase.database().ref('users/' + event.target.value).update({ isAdmin: true }).catch(function (error) {
            var errorMessage = error.message;
            self.setState({ alertVisible: true, alert: { type: 'danger', message: errorMessage } })
        });
    }
    deleteUser = (event) => { //find user in db and delete 
        var self = this;
        firebase.database().ref('users/' + event.target.value).remove().catch(function (error) {
            var errorMessage = error.message;
            self.setState({ alertVisible: true, alert: { type: 'danger', message: errorMessage } })
        });
    }
    componentDidMount = () => { // listeners on user object changed and deleted
        var fb = firebase.database().ref('users');
        var self = this;
        fb.on("child_changed", function (snapshot) {
            self.props.makeAdmin({
                admin: snapshot.val(),
            })
            self.setState({ alertVisible: true, alert: { type: 'success', message: 'User was made Admin!' } })
        });
        fb.on("child_removed", function (snapshot) {
            self.props.deleteUser({
                user: snapshot.val(),
            })
            self.setState({ alertVisible: true, alert: { type: 'success', message: 'User was deleted!' } })
        });
    }
    handleAlertDismiss = () => { // alert close handler
        this.setState({ alertVisible: false });
    }
    render() {
        const users = [];
        if (this.props.users) { // append all users except current user
            for (var user in this.props.users) {
                if (this.props.users[user].uid === this.props.user.uid) continue;
                users.push(
                    <tr key={user}><td>{this.props.users[user].username}</td><td>{this.props.users[user].email}</td><td>{this.props.users[user].isAdmin === true ? 'Admin' : <Btn onClick={this.handleAdmin} value={user} size="xsmall" name='Make Admin' bsStyle="warning"></Btn>}</td><td><Btn onClick={this.deleteUser} value={user} size="xsmall" bsStyle="danger" name='Delete'></Btn></td></tr>
                );
            }
        }
        return <div className="row">
            <div className="col-sm-12" >
                {
                    this.state.alertVisible &&
                    <AlertMessage type={this.state.alert.type} onDismiss={this.handleAlertDismiss} alertMsg={this.state.alert.message} />
                }
                < div className="card post" >
                    <div className="card-block">
                        <h3 className="card-title">Users</h3>
                        <Table responsive>
                            <thead>
                                <tr><th>Username</th>
                                    <th>Email</th>
                                    <th>Admin access</th>
                                    <th>Delete</th></tr>
                            </thead>
                            <tbody>
                                {users}
                            </tbody>
                        </Table>
                    </div>
                </div >
            </div >
        </div >
    }
}

function mapDispatchToProps(dispatch) {
    return {
        makeAdmin: auth => dispatch(makeAdmin(auth)),
        deleteUser: auth => dispatch(deleteUser(auth)),
    }
}

function mapStateToProps(state) {
    return {
        state: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
