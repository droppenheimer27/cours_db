import React from 'react';
import { observer } from 'mobx-react';
import { Form, Button } from 'react-bootstrap';
import ApiService from '../../Services/ApiService';
import { modalStore } from '../../Stores/ModalStore';
import { ApiUrls } from '../../AppConstants';
import { appStore } from '../../Stores/AppStore';
import { respondsStore } from '../../Stores/RespondsStore';

interface IRespondDialogProps {
    orderId: number;
}

@observer
export default class RespondDialog extends React.Component<
    IRespondDialogProps,
    { content: string }
> {
    constructor(props: IRespondDialogProps) {
        super(props);

        this.state = {
            content: ''
        };
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
                    onClick={this.sendRespond}
                >
                    Send
                </Button>
            </Form>
        );
    }

    onChangeInput(event: any) {
        this.setState({ content: event.currentTarget.value });
    }

    sendRespond = () => {
        const data = {
            content: this.state.content,
            orderId: this.props.orderId,
            executorId: parseInt(appStore.currentExecutorId)
        };

        ApiService.postData(ApiUrls.RespondsUrl, data).then((response: any) => {
            respondsStore.responds.push(response);
            modalStore.closeModal();
        });
    };
}
