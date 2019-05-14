import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ApiService from '../../../Services/ApiService';
import { ApiUrls } from '../../../AppConstants';

import OrderModel from '../../../Models/OrderModel';
import { appStore } from '../../../Stores/AppStore';
import { respondsStore } from '../../../Stores/RespondsStore';
import { modalStore } from '../../../Stores/ModalStore';

import EditOrderDialog from '../../Dialogs/EditOrderDialog';
import RespondDialog from '../../Dialogs/RespondDialog';
import EditRespondDialog from '../../Dialogs/EditRespondDialog';
import SubmitRespondDialog from '../../Dialogs/SubmitRespondDialog';

interface IOrderProps {
    match: any;
}

@observer
export default class Order extends React.Component<IOrderProps, {}> {
    @observable order: OrderModel | null = null;

    constructor(props: any) {
        super(props);

        this.loadData();
    }

    render() {
        return (
            <React.Fragment>
                {this.order && (
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
                                        <b>{this.order.header}</b>
                                    </h2>
                                </div>
                                {appStore.isAuthorize &&
                                    appStore.currentUserId ===
                                        this.order.userId && (
                                        <div className="col">
                                            <Button
                                                variant="warning"
                                                onClick={
                                                    this.openEditOrderDialog
                                                }
                                            >
                                                Edit order
                                            </Button>
                                        </div>
                                    )}
                            </div>
                            <div className="row">
                                {this.order.status === 0 && <h5>Active</h5>}
                                {this.order.status === 1 && <h5>Submited</h5>}
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
                                        <p>{this.order.description}</p>
                                    </div>
                                    <div className="col col-lg-2">
                                        <ul>
                                            <li className="text-muted">
                                                {this.order.name}
                                            </li>
                                            <li className="text-muted">
                                                {this.order.price}
                                            </li>
                                            <li className="text-muted">
                                                {
                                                    this.order
                                                        .serviceClassiferDescription
                                                }
                                            </li>
                                            <li className="text-muted">
                                                {this.order.phoneNumber}
                                            </li>
                                            <li className="text-muted">
                                                {this.order.address}
                                            </li>
                                            {respondsStore.responds && (
                                                <li className="text-muted">
                                                    {
                                                        respondsStore.responds
                                                            .length
                                                    }{' '}
                                                    откликов
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="box-footer">
                                <div className="row">
                                    <div className="col">
                                        <p>
                                            Complete on -{' '}
                                            {this.order.completedOn}{' '}
                                        </p>
                                    </div>
                                    {this.order.status !== 1 &&
                                        appStore.isAuthorize &&
                                        appStore.isExecutor &&
                                        appStore.currentUserId !==
                                            this.order.userId && (
                                            <div className="pull-right">
                                                <Button
                                                    type="button"
                                                    variant="primary"
                                                    onClick={
                                                        this.openRespondDialog
                                                    }
                                                >
                                                    Leave a respond
                                                </Button>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <hr />
                {(respondsStore.responds || []).map(
                    (respond: any, index: number) => {
                        console.log(respond);
                        return (
                            <div
                                key={respond.id + index}
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
                                        <div className="col text-white">
                                            <h5>
                                                <Link
                                                    to={
                                                        'executors/' +
                                                        respond.executorId
                                                    }
                                                    className="text-orange"
                                                >
                                                    {respond.firstName +
                                                        ' ' +
                                                        respond.lastName}
                                                </Link>
                                            </h5>
                                        </div>
                                        <div className="col">
                                            {appStore.isAuthorize &&
                                                appStore.currentExecutorId ===
                                                    respond.executorId.toString() && (
                                                    <Button
                                                        className="pull-right"
                                                        variant="warning"
                                                        onClick={() =>
                                                            this.openEditRespondDialog(
                                                                respond
                                                            )
                                                        }
                                                    >
                                                        Edit a respond
                                                    </Button>
                                                )}
                                        </div>
                                        <div className="col">
                                            {this.order &&
                                                this.order.status !== 1 &&
                                                appStore.isAuthorize &&
                                                appStore.currentUserId ===
                                                    this.order.userId.toString() && (
                                                    <Button
                                                        className="pull-right"
                                                        variant="success"
                                                        onClick={() =>
                                                            this.openSubmitRespondDialog(
                                                                respond.id
                                                            )
                                                        }
                                                    >
                                                        Submit
                                                    </Button>
                                                )}
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <div className="row">
                                            <div className="col">
                                                <p>{respond.content}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <p>
                                                    <small className="text-muted">
                                                        {respond.createdAt}
                                                    </small>
                                                </p>
                                            </div>
                                            {respond.status === 1 && (
                                                <div className="col">
                                                    <p>
                                                        <small className="text-muted">
                                                            Submited
                                                        </small>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                )}
            </React.Fragment>
        );
    }

    async loadData() {
        this.order = await ApiService.getData(
            ApiUrls.OrdersUrl + '/' + this.props.match.params.id
        );

        respondsStore.responds = await ApiService.getData(
            ApiUrls.RespondsUrl + '/' + this.props.match.params.id
        );
    }

    openEditOrderDialog = () => {
        modalStore.showModal(
            <EditOrderDialog order={this.order} />,
            'Edit order'
        );
    };

    openRespondDialog = () => {
        if (!this.order) return;

        modalStore.showModal(
            <RespondDialog orderId={this.order.id} />,
            'Leave respond'
        );
    };

    openEditRespondDialog = (respond: any) => {
        if (!this.order) return;

        modalStore.showModal(
            <EditRespondDialog respond={respond} />,
            'Leave respond'
        );
    };

    openSubmitRespondDialog = (id: number) => {
        if (!this.order) return;

        modalStore.showModal(
            <SubmitRespondDialog order={this.order} id={id} />,
            'Submit respond'
        );
    };
}
