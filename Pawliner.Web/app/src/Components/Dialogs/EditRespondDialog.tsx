import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import ApiService from '../../Services/ApiService';
import { ApiUrls } from '../../AppConstants';

import { modalStore } from '../../Stores/ModalStore';
import { respondsStore } from '../../Stores/RespondsStore';

interface IEditRespondDialogProps {
    respond: any;
}

@observer
export default class EditRespondDialog extends React.Component<
    IEditRespondDialogProps,
    { content: string }
> {
    constructor(props: IEditRespondDialogProps) {
        super(props);

        this.state = {
            content: props.respond.content
        };

        console.log(props.respond);
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Respond</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Enter your respond"
                        onChange={(event: any) => this.onChangeInput(event)}
                        value={this.state.content}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="button"
                    onClick={this.editRespond}
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    type="button"
                    onClick={this.removeRespond}
                    style={{ marginLeft: '1rem' }}
                >
                    Remove
                </Button>
            </Form>
        );
    }

    onChangeInput(event: any) {
        this.setState({ content: event.currentTarget.value });
    }

    editRespond = () => {
        const data = {
            id: this.props.respond.id,
            content: this.state.content
        };

        ApiService.putData(ApiUrls.CommentsUrl, data).then((response: any) => {
            respondsStore.responds.forEach((element: any) => {
                if (element.id === response.id) {
                    element.content = response.content;
                }
            });

            modalStore.closeModal();
        });
    };

    removeRespond = () => {
        ApiService.deleteData(ApiUrls.RespondsUrl, {
            id: this.props.respond.id
        }).then((id: number) => {
            respondsStore.responds.map((element: any, index: number) => {
                if (element.id === id) {
                    respondsStore.responds.splice(index, 1);
                }
            });

            modalStore.closeModal();
        });
    };
}
