import React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { Form, Button } from 'react-bootstrap';

import { modalStore } from '../../Stores/ModalStore';
import ApiService from '../../Services/ApiService';
import { ApiUrls } from '../../AppConstants';

@observer
export default class SignUpDialog extends React.Component<{}, {}> {
    @observable userName: string = '';
    @observable password: string = '';

    render() {
        return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" onChange={(event: any) => this.onChangeInputUserName(event)} value={this.userName} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event: any) => this.onChangeInputPassword(event)} value={this.password} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(event: any) => this.onSignUp(event)}>
                    Sign Up
                </Button>
            </Form>
        );
    }

    @action
    onChangeInputUserName(event: any) {
        this.userName = event.currentTarget.value;
    }

    @action
    onChangeInputPassword(event: any) {
        this.password = event.currentTarget.value;
    }

    @action
    onSignUp(event: any) {
        event.preventDefault();

        const user = {
            id: 0,
            userName: this.userName,
            passwordHash: this.password
        };

        ApiService.postData(ApiUrls.SignUpUrl, user).then(() => {
            modalStore.closeModal();
        });
    }
}