import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import ApiService from '../../../Services/ApiService';
import { ApiUrls } from '../../../AppConstants';

@observer
export default class CreateOrder extends React.Component<
    {},
    { priceDeal: boolean }
> {
    @observable services: [] = [];

    constructor(props: any) {
        super(props);

        this.state = {
            priceDeal: false
        };

        this.loadData();

        this.onPriceCheck = this.onPriceCheck.bind(this);
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
                <Form>
                    <Form.Group>
                        <Form.Label>Services</Form.Label>
                        <Form.Control as="select" required>
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
                            type="text"
                            placeholder="Enter order header"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            placeholder="Enter order description"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter city"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your address"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Complete Date</Form.Label>
                        <DatePicker onChange={this.onPriceCheck} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            disabled={this.state.priceDeal}
                            type="text"
                            placeholder="Price"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            type="checkbox"
                            label="Deal"
                            onChange={(event: any) => this.onPriceCheck(event)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }

    onPriceCheck(event: any) {
        this.setState({ priceDeal: event.currentTarget.checked });
    }

    loadData() {
        ApiService.getData(ApiUrls.ServicesUrl).then(response => {
            this.services = response;
        });
    }
}
