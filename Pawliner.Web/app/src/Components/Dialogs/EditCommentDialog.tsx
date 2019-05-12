import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import ApiService from '../../Services/ApiService';
import { ApiUrls } from '../../AppConstants';

import { modalStore } from '../../Stores/ModalStore';
import CommentModel from '../../Models/CommentModel';
import { commentsStore } from '../../Stores/CommentsStore';

interface IEditCommentDialogProps {
    commentId: number;
    content: string;
}

@observer
export default class EditCommentDialog extends React.Component<
    IEditCommentDialogProps,
    {}
> {
    @observable commentContent: string = '';

    constructor(props: IEditCommentDialogProps) {
        super(props);

        this.commentContent = props.content;
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Comment</Form.Label>
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
                    onClick={this.editComment}
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    type="button"
                    onClick={this.removeComment}
                    style={{ marginLeft: '1rem' }}
                >
                    Remove
                </Button>
            </Form>
        );
    }

    onChangeInput(event: any) {
        this.commentContent = event.currentTarget.value;
    }

    editComment = () => {
        const data = {
            id: this.props.commentId,
            content: this.commentContent
        };

        ApiService.putData(ApiUrls.CommentsUrl, data).then(
            (response: CommentModel) => {
                commentsStore.comments.forEach((element: CommentModel) => {
                    if (element.id === response.id) {
                        element.content = response.content;
                    }
                });

                modalStore.closeModal();
            }
        );
    };

    removeComment = () => {
        ApiService.deleteData(ApiUrls.CommentsUrl, {
            id: this.props.commentId
        }).then((id: number) => {
            commentsStore.comments.map(
                (element: CommentModel, index: number) => {
                    if (element.id === id) {
                        commentsStore.comments.splice(index, 1);
                    }
                }
            );

            modalStore.closeModal();
        });
    };
}
