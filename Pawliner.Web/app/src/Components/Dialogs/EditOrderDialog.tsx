import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Form, Button } from 'react-bootstrap';

import ApiService from '../../Services/ApiService';
import { ApiUrls } from '../../AppConstants';
import { modalStore } from '../../Stores/ModalStore';

interface IEditOrderDialogProps {
    order: any;
}

interface IEditOrderDialogState {
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
export default class EditOrderDialog extends React.Component<
    IEditOrderDialogProps,
    IEditOrderDialogState
> {
    @observable services: [] = [];

    constructor(props: any) {
        super(props);

        this.state = {
            service: this.props.order.serviceClassiferDescription,
            header: this.props.order.header,
            description: this.props.order.description,
            name: this.props.order.name,
            city: this.props.order.city,
            address: this.props.order.address,
            completeOn: this.props.order.completedOn,
            price: this.props.order.price,
            priceDeal: this.props.order.price === 'Deal',
            number: this.props.order.phoneNumber
        };

        this.loadData();

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        return (
            <Form onSubmit={(event: any) => this.onEditOrder(event)}>
                <Form.Group>
                    <Form.Label>Services</Form.Label>
                    <Form.Control
                        value={this.state.serviceClassiferDescription}
                        name="service"
                        as="select"
                        required
                        onChange={(event: any) => this.handleInputChange(event)}
                    >
                        {(this.services || []).map(
                            (serviceClassifer: any, index: number) => {
                                const services = serviceClassifer.servicesDescriptions.split(
                                    ','
                                );

                                services.map((service: any, index: number) => {
                                    if (service.length === 0)
                                        services.splice(index, 1);
                                });
                                return (
                                    <optgroup
                                        key={serviceClassifer.id + index}
                                        label={
                                            serviceClassifer.serviceClassiferDescription
                                        }
                                    >
                                        {(services || []).map(
                                            (service: any, index: number) => {
                                                const serviceInfo = service.split(
                                                    '---'
                                                );
                                                const id = serviceInfo[0];
                                                const description =
                                                    serviceInfo[1];

                                                return (
                                                    <option key={id + index}>
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
                        value={this.state.header}
                        name="header"
                        type="text"
                        placeholder="Enter order header"
                        required
                        onChange={(event: any) => this.handleInputChange(event)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={this.state.description}
                        name="description"
                        as="textarea"
                        rows="3"
                        placeholder="Enter order description"
                        onChange={(event: any) => this.handleInputChange(event)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        value={this.state.city}
                        name="city"
                        type="text"
                        placeholder="Enter city"
                        required
                        onChange={(event: any) => this.handleInputChange(event)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={this.state.name}
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                        onChange={(event: any) => this.handleInputChange(event)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        value={this.state.address}
                        name="address"
                        type="text"
                        placeholder="Enter your address"
                        required
                        onChange={(event: any) => this.handleInputChange(event)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Complete Date (MM/DD/YY)</Form.Label>
                    <Form.Control
                        value={this.state.completeOn}
                        name="completeOn"
                        type="text"
                        placeholder="Enter complete date"
                        required
                        onChange={(event: any) => this.handleInputChange(event)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        value={this.state.price}
                        name="price"
                        disabled={this.state.priceDeal}
                        type="text"
                        placeholder="Price"
                        onChange={(event: any) => this.handleInputChange(event)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Check
                        checked={this.state.priceDeal}
                        name="priceDeal"
                        type="checkbox"
                        label="Deal"
                        onChange={(event: any) => this.handleInputChange(event)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Number</Form.Label>
                    <Form.Control
                        value={this.state.number}
                        name="number"
                        type="text"
                        placeholder="Enter your number"
                        required
                        onChange={(event: any) => this.handleInputChange(event)}
                    />
                </Form.Group>
                <hr />
                <Button variant="primary" type="submit">
                    Edit order
                </Button>
                <Button
                    variant="danger"
                    type="button"
                    style={{ marginLeft: '1rem' }}
                    onClick={this.removeOrder}
                >
                    Remove order
                </Button>
            </Form>
        );
    }

    loadData() {
        ApiService.getData(ApiUrls.ServicesUrl).then(response => {
            this.services = response;
        });
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

    onEditOrder(event: any) {
        event.preventDefault();

        const data = {
            id: this.props.order.id,
            service: this.state.service,
            header: this.state.header,
            description: this.state.description,
            name: this.state.name,
            city: this.state.city,
            address: this.state.address,
            completedOn: this.state.completeOn,
            price: !this.state.priceDeal ? this.state.price : 'Deal',
            number: this.state.number
        };

        ApiService.putData(ApiUrls.OrdersUrl, data).then((response: any) => {
            this.props.order.service = response.service;
            this.props.order.header = response.header;
            this.props.order.description = response.description;
            this.props.order.address = response.address;
            this.props.order.city = response.city;
            this.props.order.name = response.name;
            this.props.order.completedOn = response.completedOn;
            this.props.order.price = response.price;
            this.props.order.number = response.number;

            modalStore.closeModal();
        });
    }

    removeOrder = () => {
        ApiService.deleteData(ApiUrls.OrdersUrl, {
            id: this.props.order.id
        }).then(() => {
            modalStore.closeModal();
            document.location.replace('/ ');
        });
    };
}
