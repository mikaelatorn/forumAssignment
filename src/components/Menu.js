import { Navbar, Nav, NavItem } from 'react-bootstrap'
import React from 'react'


class Menu extends React.Component {
  handleClick = (event) => {
    this.props.onHeaderClick(event);
  }
  render() {
    return <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a onClick={() => { this.handleClick('main') }} >Some forum</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {this.props.authenticated === true && 
          <Nav pullLeft>
            <NavItem onClick={() => { this.handleClick('userPosts') }} className={{ 'active': this.props.active === 'userPosts' }} eventKey={0} href="#">My posts</NavItem>
          </Nav>
        }
       
        {this.props.authenticated === true && this.props.isAdmin === true &&
           <Nav pullRight>
            <NavItem onClick={() => { this.handleClick('admin') }} className={{ 'active': this.props.active === 'admin' }} eventKey={3} href="#">Admin Panel</NavItem>
            </Nav>
        }
        {this.props.authenticated === false &&
          <Nav pullRight>
            <NavItem onClick={() => { this.handleClick('signup') }} className={{ 'active': this.props.active === 'signup' }} eventKey={4} href="#">Signup</NavItem>
            <NavItem onClick={() => { this.handleClick('login') }} className={{ 'active': this.props.active === 'login' }} eventKey={5} href="#">Log in</NavItem>
          </Nav>
        }
         {this.props.authenticated === true &&
          <Nav pullRight>
            <NavItem onClick={() => { this.handleClick('logout') }} eventKey={2} href="#">Logout</NavItem>
          </Nav>
        }

      </Navbar.Collapse>

    </Navbar >;


  }
}




export default Menu;