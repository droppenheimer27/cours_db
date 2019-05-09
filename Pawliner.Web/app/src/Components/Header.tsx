import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { Link } from 'react-router-dom';
import {
    Nav,
    Navbar,
    NavDropdown,
    Form,
    FormControl,
    Button
} from 'react-bootstrap';

import SignUpDialog from '../Components/Dialogs/SignUpDialog';

import { ApiUrls } from '../AppConstants';
import ApiService, { ParamsModel } from '../Services/ApiService';
import TokenModel from '../Models/TokenModel';

import { ordersStore } from '../Stores/OrdersStore';
import { executorsStore } from '../Stores/ExecutorsStore';
import { modalStore } from '../Stores/ModalStore';
import { appStore } from '../Stores/AppStore';

@observer
export default class Header extends React.Component<{}, {}> {
    @observable userName: string = '';
    @observable password: string = '';

    componentWillMount() {
        appStore.isAuthorize = !!appStore.currentToken;
    }

    render() {
        return (
            <Navbar fixed="top" bg="primary" expand="lg">
                <Link to="/">
                    <Navbar.Brand style={{ color: 'white' }}>
                        Pawliner
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/">
                            <Nav.Link style={{ color: 'white' }}>Home</Nav.Link>
                        </Link>
                    </Nav>
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                            onChange={this.onSearch}
                        />
                    </Form>
                    <Nav className="mr-auto">
                        <NavDropdown
                            title={
                                appStore.isAuthorize
                                    ? appStore.getValue('userName')
                                    : 'Profile'
                            }
                            id="basic-nav-dropdown"
                        >
                            {!appStore.isAuthorize && (
                                <React.Fragment>
                                    <Form>
                                        <Form.Group>
                                            <Form.Control
                                                name="userName"
                                                type="text"
                                                placeholder="Username"
                                                onChange={(event: any) => {
                                                    this.userName =
                                                        event.currentTarget.value;
                                                }}
                                                value={this.userName}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Control
                                                name="password"
                                                type="password"
                                                placeholder="Password"
                                                onChange={(event: any) => {
                                                    this.password =
                                                        event.currentTarget.value;
                                                }}
                                                value={this.password}
                                            />
                                        </Form.Group>
                                    </Form>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>
                                        <div style={{ textAlign: 'center' }}>
                                            <Button
                                                type="button"
                                                onClick={this.onSignIn}
                                            >
                                                Sign in
                                            </Button>
                                        </div>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>
                                        <Button
                                            type="button"
                                            onClick={this.onSignUp}
                                        >
                                            Register new account
                                        </Button>
                                    </NavDropdown.Item>
                                </React.Fragment>
                            )}
                            {appStore.isAuthorize && (
                                <NavDropdown.Item>
                                    <Button
                                        type="button"
                                        onClick={this.onLogOut}
                                    >
                                        Log out
                                    </Button>
                                </NavDropdown.Item>
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
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
        modalStore.showModal(<SignUpDialog />, 'Sign Up');
    }

    @action
    onSignIn = () => {
        const login = {
            userName: this.userName,
            password: this.password
        };

        ApiService.postData(ApiUrls.SignInUrl, login).then(
            (response: TokenModel) => {
                appStore.setValue('token', 'Bearer ' + response.token);
                appStore.setValue('userName', response.userName);
                appStore.setValue('userId', response.userId);

                appStore.isAuthorize = true;
            }
        );
    };

    onLogOut = () => {
        appStore.clearUserData();

        appStore.isAuthorize = false;
    };
}
