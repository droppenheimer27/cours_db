import React from 'react';
import { action } from 'mobx';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

import SignUpDialog from '../Components/Dialogs/SignUpDialog';

import { ApiUrls } from '../AppConstants';
import ApiService, { ParamsModel } from '../Services/ApiService';

import { ordersStore } from '../Stores/OrdersStore';
import { executorsStore } from '../Stores/ExecutorsStore';
import { modalStore } from '../Stores/ModalStore';

export default class Header extends React.Component<{}, {}> {
    render() {
        return (
            <Navbar fixed="top" bg="primary" expand="lg">
                <Link to='/'><Navbar.Brand style={{color: 'white'}}>Pawliner</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Link to='/'><Nav.Link style={{color: 'white'}}>Home</Nav.Link></Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.onSearch} />
                    </Form>
                    <Nav className="mr-auto">
                        <NavDropdown title="Profile" id="basic-nav-dropdown">
                            <Form>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Username" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                            </Form>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <div style={{textAlign: 'center'}}><Button type="button">Sign in</Button></div>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Button type="button" onClick={this.onSignUp}>Register new account</Button>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

    @action
    onSearch(event: any) {
        if (event.currentTarget.value.length === 0) return;
        const data: ParamsModel = {
            search: event.currentTarget.value
        };

        ApiService.getData(ApiUrls.OrdersUrl, data).then(response => {
            ordersStore.orders = response;
        });
        
        ApiService.getData(ApiUrls.ExecutorsUrl, data).then(response => {
            executorsStore.executors = response;
        }); 
    }

    @action
    onSignUp() {
        modalStore.showModal(<SignUpDialog/>, 'Sign Up');
    }
}