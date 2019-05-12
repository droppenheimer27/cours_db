import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import ApiService from '../../../Services/ApiService';
import { ApiUrls, Paths } from '../../../AppConstants';

import { ordersStore } from '../../../Stores/OrdersStore';

@observer
export default class Orders extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);

        this.loadData();
    }

    render() {
        return (ordersStore.orders || []).map((order: any, index: number) => {
            const regex = new RegExp('/', 'g');
            let picture = '';
            if (order.path) picture = order.path.replace(regex, '\\');
            return (
                <div
                    key={order.id + index}
                    className="col-md-9"
                    style={{ marginTop: '2rem', marginBottom: '1rem' }}
                >
                    <Card>
                        <Card.Header>
                            <Link to={'orders/' + order.id}>
                                <b>{order.header}</b>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <div className="row">
                                    <div className="col-2">
                                        {!order.fileName && (
                                            <img
                                                className="img-thumbnail"
                                                src="http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg"
                                                alt=""
                                            />
                                        )}
                                        {order.fileName && (
                                            <Image
                                                className="img-thumbnail"
                                                src={Paths.ImgPath + picture}
                                                alt=""
                                            />
                                        )}
                                    </div>
                                    <div className="col-lg-5">
                                        <p
                                            id="description"
                                            style={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                wordWrap: 'break-word'
                                            }}
                                        >
                                            {order.description}
                                        </p>
                                    </div>
                                    <div className="col">
                                        <ul>
                                            <li className="text-muted">
                                                Price - {order.price}
                                            </li>
                                            {order.status === 0 && (
                                                <li className="text-muted">
                                                    Active
                                                </li>
                                            )}
                                            {order.status === 1 && (
                                                <li className="text-muted">
                                                    Submited
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                <hr />
                                <div
                                    className="row"
                                    style={{ marginTop: '.4rem' }}
                                >
                                    <div className="col">
                                        <p className="text-muted">
                                            Service -{' '}
                                            {order.serviceClassiferDescription}
                                        </p>
                                    </div>
                                    <div className="col">
                                        <p className="pull-right">
                                            Complete on - {order.completedOn}
                                        </p>
                                    </div>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            );
        });
    }

    async loadData() {
        ordersStore.orders = await ApiService.getData(ApiUrls.OrdersUrl);
    }
}
