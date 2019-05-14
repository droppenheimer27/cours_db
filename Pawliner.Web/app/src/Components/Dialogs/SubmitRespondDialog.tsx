import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { modalStore } from '../../Stores/ModalStore';
import ApiService from '../../Services/ApiService';
import { ApiUrls } from '../../AppConstants';
import { respondsStore } from '../../Stores/RespondsStore';

export default class SubmitRespondDialog extends React.Component<
    { order: any; id: number },
    {}
> {
    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Respond</Form.Label>
                    <Form.Text>Are you sure to submit this respond?</Form.Text>
                </Form.Group>
                <Button variant="primary" type="button" onClick={this.submit}>
                    Submit
                </Button>
                <Button
                    variant="danger"
                    type="button"
                    onClick={this.cancel}
                    style={{ marginLeft: '1rem' }}
                >
                    Cancel
                </Button>
            </Form>
        );
    }

    submit = () => {
        ApiService.putData(ApiUrls.SubmitRespondUrl, {
            id: this.props.id
        }).then(() => {
            respondsStore.responds.forEach(respond => {
                if (respond.id === this.props.id) respond.status = 1;
            });

            this.props.order.status = 2;

            modalStore.closeModal();
        });
    };

    cancel = () => {
        modalStore.closeModal();
    };
}
