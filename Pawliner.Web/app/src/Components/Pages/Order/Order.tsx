import React from 'react';
import { observer, propTypes } from 'mobx-react';
import { observable } from 'mobx';
import { Button } from 'react-bootstrap';

import ApiService from '../../../Services/ApiService';
import { ApiUrls } from '../../../AppConstants';

import OrderModel from '../../../Models/OrderModel';
import RespondModel from '../../../Models/RespondModel';

interface IOrderProps {
    match: any
}

@observer
export default class Order extends React.Component<IOrderProps, {}> {
    @observable order: OrderModel | null = null;
    @observable responds: RespondModel[] = [];

    constructor(props: any) {
        super(props);

        this.loadData();
    }

    render() {
        return (
            <React.Fragment>
                {this.order && <div className="row" style={{backgroundColor: '#ffffff', margin: '5rem', display: 'flex', justifyContent: 'center', padding: '5rem'}}>
                    <div className="box">
                        <div className="row">
                            <h2><b>{this.order.header}</b></h2> 
                        </div>
                        <div className="row">
                            {this.order.status === 0 && <h5>Active</h5>}
                            {this.order.status === 1 && <h5>Submited</h5>}
                            {this.order.status === 2 && <h5>UnSubmited</h5>}
                            {this.order.status === 3 && <h5>Done</h5>}
                        </div>
                        <div className="box-body">
                            <hr/>
                            <div className="row" style={{marginLeft: '5rem', marginBottom: '5rem'}}>
                                <div className="col">
                                    <p>{this.order.description}</p>
                                </div>
                                <div className="col col-lg-2">
                                    <ul>
                                        <li className="text-muted">{this.order.name}</li>
                                        <li className="text-muted">{this.order.price}</li>
                                        <li className="text-muted">{this.order.serviceClassiferDescription}</li>
                                        <li className="text-muted">{this.order.phoneNumber}</li>
                                        <li className="text-muted">{this.order.address}</li>
                                        {this.responds && <li className="text-muted">{this.responds.length} откликов</li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer">
                            <div className="row">
                                <div className="col">
                                    <p>Complete on - {this.order.completedOn} </p>
                                </div>
                                <div className="pull-right">
                                    <Button type="button" variant="primary">Leave a respond</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                <hr />
                {(this.responds || []).map((respond, index) => {
                    return (
                        <div key={respond.id + index} className="row" style={{backgroundColor: '#ffffff', marginTop: '3rem', marginLeft: '20rem', marginRight: '20rem', display: 'flex', justifyContent: 'flex-start', padding: '2rem'}}>
                            <div className="box">
                                <div className="row">
                                    <div className="col text-white">
                                        <h5><a className="text-orange" href="#!/main/executor/<%= Executor.Id %>">{respond.firstName + ' ' + respond.lastName}</a></h5>
                                    </div>
                                    {/* <div className="col">
                                        <% if (Executor.UserId === window.app.model.get('userId')) { %>
                                            <a className="text-white pull-right edit-respond" href="" style="margin-right: 80px;">Edit a respond</a>
                                        <% } %>
                                        <% if (Order.UserId === window.app.model.get('userId')) { %>
                                            <a className="text-white pull-right submit-respond" href="" style="margin-right: 80px;">Submit</a>
                                        <% } %>
                                    </div> */}
                                    </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col">
                                            <p>{respond.content}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p><small className="text-muted">{respond.createdAt}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </React.Fragment>
        )
    }

    async loadData() {
        this.order = await ApiService.getData(ApiUrls.OrdersUrl + '/' + this.props.match.params.id);
        this.responds = await ApiService.getData(ApiUrls.RespondsUrl + '/' + this.props.match.params.id);
    }
}