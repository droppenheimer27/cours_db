import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab, Button, Card, Collapse } from 'react-bootstrap';

import Orders from './Orders';
import Executors from './Executors';
import { observer } from 'mobx-react';

import { appStore } from '../../../Stores/AppStore';
import { servicesStore } from '../../../Stores/ServicesStore';
import ApiService, { ParamsModel } from '../../../Services/ApiService';
import { ApiUrls } from '../../../AppConstants';
import { ordersStore } from '../../../Stores/OrdersStore';
import { executorsStore } from '../../../Stores/ExecutorsStore';

@observer
export default class Home extends React.Component<
    {},
    { open: boolean; services: number[] }
> {
    constructor(props: any) {
        super(props);

        this.state = {
            open: false,
            services: []
        };

        this.loadData();
    }

    render() {
        return (
            <div
                className="container"
                style={{
                    backgroundColor: '#ffffff',
                    padding: '3rem',
                    marginTop: '5rem'
                    // maxWidth: '1024px'
                }}
            >
                <div className="row">
                    <div className="col">
                        <Tabs
                            defaultActiveKey="orders"
                            id="uncontrolled-tab-example"
                        >
                            <Tab eventKey="orders" title="Orders">
                                <Orders />
                            </Tab>
                            <Tab eventKey="executors" title="Executors">
                                <Executors />
                            </Tab>
                            {appStore.isAuthorize && (
                                <Tab
                                    eventKey="place-order"
                                    title={
                                        <Link to="place-order">
                                            Place Order
                                        </Link>
                                    }
                                />
                            )}
                            {appStore.isAuthorize && appStore.isExecutor && (
                                <Tab
                                    eventKey="become-executor"
                                    title={
                                        <Link to="become-executor">
                                            Become Executor
                                        </Link>
                                    }
                                />
                            )}
                        </Tabs>
                    </div>
                    <div
                        className="col"
                        style={{
                            backgroundColor: '#ffffff',
                            position: 'absolute',
                            width: '15rem',
                            right: 50
                        }}
                    >
                        {(servicesStore.services || []).map(
                            (serviceClassifer: any, index: number) => {
                                const services = serviceClassifer.servicesDescriptions.split(
                                    ','
                                );

                                services.map((service: any, index: number) => {
                                    if (service.length === 0)
                                        services.splice(index, 1);
                                });

                                return (
                                    <Card
                                        key={serviceClassifer.id + index}
                                        style={{
                                            marginTop: '2rem',
                                            marginBottom: '2rem'
                                        }}
                                    >
                                        <Card.Header>
                                            <Button
                                                onClick={() =>
                                                    this.setState({
                                                        open: !this.state.open
                                                    })
                                                }
                                                aria-controls={
                                                    'service' +
                                                    serviceClassifer.id
                                                }
                                                aria-expanded={this.state.open}
                                            >
                                                {
                                                    serviceClassifer.serviceClassiferDescription
                                                }
                                            </Button>
                                        </Card.Header>
                                        <Card.Body>
                                            {(services || []).map(
                                                (
                                                    service: any,
                                                    index: number
                                                ) => {
                                                    const serviceInfo = service.split(
                                                        '---'
                                                    );
                                                    const id = serviceInfo[0];
                                                    const description =
                                                        serviceInfo[1];

                                                    return (
                                                        <Collapse
                                                            key={id + index}
                                                            in={this.state.open}
                                                        >
                                                            <div className="row">
                                                                <div className="col-lg-2">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={
                                                                            'get-service' +
                                                                            id
                                                                        }
                                                                        className="checkbox"
                                                                        onChange={(
                                                                            event: any
                                                                        ) =>
                                                                            this.onSelectService(
                                                                                event,
                                                                                id
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <label>
                                                                        {
                                                                            description
                                                                        }
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Collapse>
                                                    );
                                                }
                                            )}
                                        </Card.Body>
                                    </Card>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        );
    }

    onSelectService(event: any, id: number) {
        if (event.currentTarget.checked) {
            this.state.services.push(id);
        } else {
            const index = this.state.services.indexOf(id);
            if (index > -1) {
                this.state.services.splice(index, 1);
            }
        }

        const filter = this.state.services.join(', ');
        const params = {
            filter: filter.length > 0 ? filter : null
        };

        ApiService.getData(ApiUrls.OrdersUrl, params).then((response: any) => {
            ordersStore.orders = response;
        });

        ApiService.getData(ApiUrls.ExecutorsUrl, params).then(
            (response: any) => {
                executorsStore.executors = response;
            }
        );
    }

    loadData() {
        ApiService.getData(ApiUrls.ServicesUrl).then(response => {
            servicesStore.services = response;
        });
    }
}
