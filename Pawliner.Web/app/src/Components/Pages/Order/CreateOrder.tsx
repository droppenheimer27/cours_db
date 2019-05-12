import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Form, Button } from 'react-bootstrap';

import ApiService from '../../../Services/ApiService';
import { ApiUrls } from '../../../AppConstants';
import { appStore } from '../../../Stores/AppStore';

interface ICreateOrderState {
    [key: string]: any;
    service: string;
    header: string;
    description: string;
    name: string;
    city: string;
    address: string;
    completeOn: string;
    price: string;
    priceDeal: boolean;
    number: string;
}

@observer
export default class CreateOrder extends React.Component<
    {},
    ICreateOrderState
> {
    @observable services: [] = [];

    constructor(props: any) {
        super(props);

        this.state = {
            service: '',
            header: '',
            description: '',
            name: '',
            city: '',
            address: '',
            completeOn: '',
            price: '',
            priceDeal: false,
            number: ''
        };

        this.loadData();

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        return (
            <div
                className="container"
                style={{
                    backgroundColor: '#ffffff',
                    padding: '3rem',
                    marginTop: '5rem'
                }}
            >
                <h2>Placing order</h2>
                <hr />
                <Form onSubmit={(event: any) => this.onCreateOrder(event)}>
                    <Form.Group>
                        <Form.Label>Services</Form.Label>
                        <Form.Control
                            name="service"
                            as="select"
                            required
                            onChange={(event: any) =>
                                this.handleInputChange(event)
                            }
                        >
                            {(this.services || []).map(
                                (serviceClassifer: any, index: number) => {
                                    const services = serviceClassifer.servicesDescriptions.split(
                                        ','
                                    );

                                    services.map(
                                        (service: any, index: number) => {
                                            if (service.length === 0)
                                                services.splice(index, 1);
                                        }
                                    );
                                    return (
                                        <optgroup
                                            key={serviceClassifer.id + index}
                                            label={
                                                serviceClassifer.serviceClassiferDescription
                                            }
                                        >
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
                                                        <option
                                                            key={id + index}
                                                        >
                                                            {description}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </optgroup>
                                    );
                                }
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Header</Form.Label>
                        <Form.Control
                            name="header"
                            type="text"
                            placeholder="Enter order header"
                            required
                            onChange={(event: any) =>
                                this.handleInputChange(event)
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            name="description"
                            as="textarea"
                            rows="3"
                            placeholder="Enter order description"
                            onChange={(event: any) =>
                                this.handleInputChange(event)
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            name="city"
                            type="text"
                            placeholder="Enter city"
                            required
                            onChange={(event: any) =>
                                this.handleInputChange(event)
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            required
                            onChange={(event: any) =>
                                this.handleInputChange(event)
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            name="address"
                            type="text"
                            placeholder="Enter your address"
                            required
                            onChange={(event: any) =>
                                this.handleInputChange(event)
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Complete Date (MM/DD/YY)</Form.Label>
                        <Form.Control
                            name="completeOn"
                            type="text"
                            placeholder="Enter complete date"
                            required
                            onChange={(event: any) =>
                                this.handleInputChange(event)
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            name="price"
                            disabled={this.state.priceDeal}
                            type="text"
                            placeholder="Price"
                            onChange={(event: any) =>
                                this.handleInputChange(event)
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            name="priceDeal"
                            type="checkbox"
                            label="Deal"
                            onChange={(event: any) =>
                                this.handleInputChange(event)
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Number</Form.Label>
                        <Form.Control
                            name="number"
                            type="text"
                            placeholder="Enter your number"
                            required
                            onChange={(event: any) =>
                                this.handleInputChange(event)
                            }
                        />
                    </Form.Group>
                    <hr />
                    <Button variant="primary" type="submit">
                        Place order
                    </Button>
                </Form>
            </div>
        );
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value =
            target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onCreateOrder(event: any) {
        event.preventDefault();

        const data = {
            service: this.state.service,
            header: this.state.header,
            description: this.state.description,
            name: this.state.name,
            city: this.state.city,
            address: this.state.address,
            completedOn: this.state.completeOn,
            price: !this.state.priceDeal ? this.state.price : 'Deal',
            number: this.state.number,
            userId: appStore.currentUserId
        };

        ApiService.postData(ApiUrls.OrdersUrl, data).then(() => {
            document.location.replace('/ ');
        });
    }

    loadData() {
        ApiService.getData(ApiUrls.ServicesUrl).then(response => {
            this.services = response;
        });
    }
}
