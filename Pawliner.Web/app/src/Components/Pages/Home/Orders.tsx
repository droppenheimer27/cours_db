import React from 'react';
import { Image } from 'react-bootstrap';
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
        return (
            (ordersStore.orders || []).map((order: any, index: number) => {
                const regex = new RegExp('/', 'g');
                let picture = '';
                if (order.path) picture = order.path.replace(regex, '\\');
                return (
                    <div key={order.id + index} className="col-md-9">
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title"><Link to={'orders/' + order.id}><b>{order.header}</b></Link></h3>
                            </div>
                            <div className="box-body">
                                <div className="row container">
                                    <div className="col-2">
                                        {!order.fileName && <img className="img-thumbnail" src="http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg"/>}
                                        {order.fileName && <Image className="img-thumbnail" src={Paths.ImgPath + picture}/>}
                                    </div>
                                    <div className="col-lg-5">
                                        <p id="description" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', wordWrap: 'break-word'}}>{order.description}</p>
                                    </div>
                                    <div className="col">
                                        <ul>
                                            <li className="text-muted">Price - {order.price}</li>
                                            {order.status === 0 && <li className="text-muted">Active</li>}
                                            {order.status === 1 && <li className="text-muted">Submited</li>}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="box-footer">
                                <div className="row">
                                    <div className="col">
                                        <p className="text-muted">Service - {order.serviceClassiferDescription}</p>
                                    </div>
                                    <div className="col">
                                        <p className="pull-right">Complete on - {order.completedOn}</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                )
            })
        );
    }

    async loadData() {
        ordersStore.orders = await ApiService.getData(ApiUrls.OrdersUrl);
    }
}