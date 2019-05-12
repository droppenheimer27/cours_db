import React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { Button } from 'react-bootstrap';

import ApiService from '../../../Services/ApiService';
import { ApiUrls } from '../../../AppConstants';

import ExecutorModel from '../../../Models/ExecutorModel';

import { appStore } from '../../../Stores/AppStore';
import { modalStore } from '../../../Stores/ModalStore';
import { commentsStore } from '../../../Stores/CommentsStore';

import CommentDialog from '../../Dialogs/CommentDialog';
import EditCommentDialog from '../../Dialogs/EditCommentDialog';
import EditExecutorProfileDialog from '../../Dialogs/EditExecutorProfileDialog';

interface IExecutorProps {
    match: any;
}

@observer
export default class Executor extends React.Component<IExecutorProps, {}> {
    @observable executor: ExecutorModel | null = null;

    constructor(props: any) {
        super(props);

        this.loadData();
    }

    render() {
        let services: any[] = [];
        if (this.executor)
            services = this.executor.serviceClassiferDescription.split(',');
        return (
            <React.Fragment>
                {this.executor && (
                    <div
                        className="row"
                        style={{
                            backgroundColor: '#ffffff',
                            margin: '5rem',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '5rem'
                        }}
                    >
                        <div className="box">
                            <div className="row">
                                <div className="col">
                                    <h2>
                                        <b>
                                            {this.executor.firstName +
                                                ' ' +
                                                this.executor.lastName}
                                        </b>
                                    </h2>
                                </div>
                                {appStore.isAuthorize &&
                                    appStore.currentUserId ===
                                        this.executor.userId && (
                                        <div className="col">
                                            <Button
                                                variant="warning"
                                                onClick={
                                                    this
                                                        .openEditExecutorProfileDialog
                                                }
                                            >
                                                Edit profile
                                            </Button>
                                        </div>
                                    )}
                            </div>
                            <div className="row" />
                            <div className="box-body">
                                <hr />
                                <div
                                    className="row"
                                    style={{
                                        marginLeft: '5rem',
                                        marginBottom: '5rem'
                                    }}
                                >
                                    <div className="col">
                                        <p>{this.executor.description}</p>
                                    </div>
                                    <div className="col col-lg-2">
                                        <ul>
                                            Services
                                            {(services || []).map(
                                                (
                                                    service: any,
                                                    index: number
                                                ) => {
                                                    return (
                                                        <li key={index}>
                                                            {service}
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="box-footer">
                                <div className="row">
                                    <div className="col" />
                                    {appStore.isAuthorize &&
                                        this.executor.userId !==
                                            appStore.currentUserId && (
                                            <div className="pull-right">
                                                <Button
                                                    type="button"
                                                    variant="primary"
                                                    onClick={
                                                        this.openCommentDialog
                                                    }
                                                >
                                                    Leave a comment
                                                </Button>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <hr />
                {(commentsStore.comments || []).map((comment, index) => {
                    return (
                        <div
                            key={comment.id + index}
                            className="row"
                            style={{
                                backgroundColor: '#ffffff',
                                marginTop: '3rem',
                                marginLeft: '20rem',
                                marginRight: '20rem',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                padding: '2rem'
                            }}
                        >
                            <div className="box">
                                <div className="row">
                                    <div className="col text-primary">
                                        <h5>{comment.userName}</h5>
                                    </div>
                                    {comment.userId ===
                                        appStore.currentUserId && (
                                        <div className="col">
                                            <Button
                                                className="pull-right"
                                                variant="warning"
                                                onClick={() =>
                                                    this.openEditCommentDialog(
                                                        comment.id,
                                                        comment.content
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <hr />
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col">
                                            <p>{comment.content}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p>
                                                <small className="text-muted">
                                                    {comment.createdAt}
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </React.Fragment>
        );
    }

    async loadData() {
        this.executor = await ApiService.getData(
            ApiUrls.ExecutorsUrl + '/' + this.props.match.params.id
        );
        commentsStore.comments = await ApiService.getData(
            ApiUrls.CommentsUrl + '/' + this.props.match.params.id
        );
    }

    openCommentDialog = () => {
        modalStore.showModal(
            <CommentDialog executorId={this.props.match.params.id} />,
            'Leave a comment'
        );
    };

    openEditCommentDialog = (id: number, content: string) => {
        modalStore.showModal(
            <EditCommentDialog commentId={id} content={content} />,
            'Edit a comment'
        );
    };

    openEditExecutorProfileDialog = () => {
        modalStore.showModal(
            <EditExecutorProfileDialog executor={this.executor} />,
            'Edit executor profile'
        );
    };
}
