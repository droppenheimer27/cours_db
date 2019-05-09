import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import ApiService from '../../Services/ApiService';
import { ApiUrls } from '../../AppConstants';

import { appStore } from '../../Stores/AppStore';
import { commentsStore } from '../../Stores/CommentsStore';

import CommentModel from '../../Models/CommentModel';
import { modalStore } from '../../Stores/ModalStore';

interface ICommentDialogProps {
    executorId: string;
}

@observer
export default class CommentDialog extends React.Component<
    ICommentDialogProps,
    {}
> {
    @observable commentContent: string = '';

    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Your opinion</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Enter your comment"
                        onChange={(event: any) => this.onChangeInput(event)}
                        value={this.commentContent}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="button"
                    onClick={this.sendComment}
                >
                    Send
                </Button>
            </Form>
        );
    }

    onChangeInput(event: any) {
        this.commentContent = event.currentTarget.value;
    }

    sendComment = () => {
        const data = {
            content: this.commentContent,
            userId: appStore.currentUserId,
            executorId: this.props.executorId
        };

        ApiService.postData(ApiUrls.CommentsUrl, data).then(
            (response: CommentModel) => {
                commentsStore.comments.push(response);
                modalStore.closeModal();
            }
        );
    };
}
