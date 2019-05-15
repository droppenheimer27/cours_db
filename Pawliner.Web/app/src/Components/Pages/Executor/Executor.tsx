import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Form, Button, Col, Carousel } from 'react-bootstrap';

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
export default class Executor extends React.Component<
    IExecutorProps,
    { images: any[] }
> {
    @observable executor: ExecutorModel | null = null;

    constructor(props: any) {
        super(props);

        this.state = {
            images: []
        };

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
                            <div className="row">
                                {this.executor.payerAccountNumber && (
                                    <React.Fragment>
                                        <b style={{ marginRight: '.7rem' }}>
                                            PN:
                                        </b>
                                        {this.executor.payerAccountNumber}
                                    </React.Fragment>
                                )}
                            </div>
                            <div className="row">
                                {this.executor.fullJuridicalName && (
                                    <React.Fragment>
                                        <b style={{ marginRight: '.7rem' }}>
                                            Full Juridical Name:
                                        </b>
                                        {this.executor.fullJuridicalName}
                                    </React.Fragment>
                                )}
                            </div>
                            <div className="row">
                                {this.executor.shortJuridicalName && (
                                    <React.Fragment>
                                        <b style={{ marginRight: '.7rem' }}>
                                            Short Juridical Name:
                                        </b>
                                        {this.executor.shortJuridicalName}
                                    </React.Fragment>
                                )}
                            </div>
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
                                        {this.state.images.length > 0 && (
                                            <div className="row">
                                                <h3>Gallery</h3>
                                            </div>
                                        )}
                                        <div className="row">
                                            {this.state.images.length > 0 && (
                                                <React.Fragment>
                                                    <Carousel
                                                        style={{
                                                            marginTop: '3rem',
                                                            width: '640px',
                                                            height: '480px',
                                                            marginBottom: '2rem'
                                                        }}
                                                    >
                                                        {this.state.images.map(
                                                            (
                                                                image: any,
                                                                index: number
                                                            ) => {
                                                                return (
                                                                    <Carousel.Item
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <img
                                                                            className="d-block w-100"
                                                                            src={
                                                                                process
                                                                                    .env
                                                                                    .PUBLIC_URL +
                                                                                image.blob
                                                                            }
                                                                            alt=""
                                                                            width="640"
                                                                            height="480"
                                                                        />
                                                                    </Carousel.Item>
                                                                );
                                                            }
                                                        )}
                                                    </Carousel>
                                                </React.Fragment>
                                            )}
                                        </div>
                                        {appStore.currentUserId ===
                                            this.executor.userId && (
                                            <div className="row">
                                                <Form>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Control
                                                                type="file"
                                                                multiple
                                                                placeholder="First name"
                                                                onChange={(
                                                                    event: any
                                                                ) =>
                                                                    this.handleUploading(
                                                                        event
                                                                    )
                                                                }
                                                            />
                                                        </Col>
                                                        {this.state.images && (
                                                            <Col>
                                                                <Button
                                                                    variant="primary"
                                                                    style={{
                                                                        marginLeft:
                                                                            '2rem'
                                                                    }}
                                                                    onClick={
                                                                        this
                                                                            .sendFiles
                                                                    }
                                                                >
                                                                    Send
                                                                </Button>
                                                            </Col>
                                                        )}
                                                    </Form.Row>
                                                </Form>
                                            </div>
                                        )}
                                        <div
                                            className="row"
                                            style={{ marginTop: '5rem' }}
                                        >
                                            <p>{this.executor.description}</p>
                                        </div>
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
        const data = await ApiService.getData(
            ApiUrls.ExecutorsUrl + '/' + this.props.match.params.id
        );

        this.executor = data.executor;

        const images: any[] = [];
        data.photos.forEach((value: any) => {
            images.push({
                blob: '/' + value.path,
                file: value
            });
        });
        this.setState(prevState => {
            return { images: [...images, ...prevState.images] };
        });

        commentsStore.comments = await ApiService.getData(
            ApiUrls.CommentsUrl + '/' + this.props.match.params.id
        );
    }

    handleUploading(event: any) {
        let images: any[] = [];
        [...event.target.files].forEach(value => {
            images.push({
                blob: URL.createObjectURL(value),
                file: value
            });
        });
        this.setState(prevState => {
            return { images: [...images, ...prevState.images] };
        });
    }

    sendFiles = () => {
        if (!this.executor) return;

        const files = this.state.images.map(value => value.file);

        const formData = new FormData();
        formData.append('id', this.executor.id.toString());
        files.map((file: File, index: number) => {
            formData.append('files', file);
        });

        ApiService.postData(ApiUrls.ExecutorPhotosUrl, formData);
    };

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
