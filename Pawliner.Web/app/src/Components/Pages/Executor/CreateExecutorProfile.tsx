import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Form, Button, Badge } from 'react-bootstrap';

import ApiService from '../../../Services/ApiService';
import { ApiUrls } from '../../../AppConstants';
import { appStore } from '../../../Stores/AppStore';

interface ICreateExecutorProfileState {
    [key: string]: any;
    services: string[];
    servicesId: number[];
    firstName: string;
    lastName: string;
    patronymic: string;
    description: string;
    number: string;
    payerAccountNumber: string;
    fullJuridicalName: string;
    shortJuridicalName: string;
    executorType: string;
}

@observer
export default class CreateExecutorProfile extends React.Component<
    {},
    ICreateExecutorProfileState
> {
    @observable services: [] = [];

    constructor(props: any) {
        super(props);

        this.state = {
            services: [],
            servicesId: [],
            firstName: '',
            lastName: '',
            patronymic: '',
            description: '',
            number: '',
            payerAccountNumber: '',
            fullJuridicalName: '',
            shortJuridicalName: '',
            executorType: '1'
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
                <h2>Create Executor Profile</h2>
                <hr />
                <Form
                    onSubmit={(event: any) =>
                        this.onCreateExecutorProfile(event)
                    }
                >
                    <Form.Group>
                        <Form.Check
                            inline
                            label="Natural person"
                            type="radio"
                            name="executor"
                            id="naturalPerson"
                            defaultChecked
                            onChange={(event: any) =>
                                this.handleInputChange(event)
                            }
                        />
                        <Form.Check
                            inline
                            label="Sole trader"
                            type="radio"
                            name="executor"
                            id="soleTrader"
                            onChange={(event: any) =>
                                this.handleInputChange(event)
                            }
                        />
                        <Form.Check
                            inline
                            label="Juridical person"
                            type="radio"
                            name="executor"
                            id="juridicalPerson"
                            onChange={(event: any) =>
                                this.handleInputChange(event)
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Services</Form.Label>
                        {(this.state.services || []).map(
                            (service: string, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            display: 'inline-block',
                                            marginLeft: '1rem'
                                        }}
                                    >
                                        <Button
                                            variant="primary"
                                            onClick={() =>
                                                this.removeService(service)
                                            }
                                        >
                                            {service}
                                            <Badge
                                                variant="light"
                                                style={{ marginLeft: '1rem' }}
                                            >
                                                X
                                            </Badge>
                                        </Button>
                                    </div>
                                );
                            }
                        )}
                        <Form.Control
                            style={{
                                marginTop: '1rem'
                            }}
                            name="service"
                            as="select"
                            multiple
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
                                                            id={id}
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
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            name="firstName"
                            type="text"
                            placeholder="Enter Your First Name"
                            required
                            onChange={(event: any) =>
                                this.handleInputChange(event)
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            name="lastName"
                            type="text"
                            placeholder="Enter Your Last Name"
                            onChange={(event: any) =>
                                this.handleInputChange(event)
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Patronymic</Form.Label>
                        <Form.Control
                            name="patronymic"
                            type="text"
                            placeholder="Enter Your Patronymic"
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
                            placeholder="Enter Description"
                            required
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
                    {(this.state.executorType === '2' ||
                        this.state.executorType === '3') && (
                        <Form.Group>
                            <Form.Label>Payer Account Number</Form.Label>
                            <Form.Control
                                name="payerAccountNumber"
                                type="text"
                                placeholder="Enter Payer Account Number"
                                required
                                onChange={(event: any) =>
                                    this.handleInputChange(event)
                                }
                            />
                        </Form.Group>
                    )}
                    {this.state.executorType === '3' && (
                        <Form.Group>
                            <Form.Label>Full Juridical Name</Form.Label>
                            <Form.Control
                                name="fullJuridicalName"
                                type="text"
                                placeholder="Enter Full Juridical Name"
                                required
                                onChange={(event: any) =>
                                    this.handleInputChange(event)
                                }
                            />
                        </Form.Group>
                    )}
                    {this.state.executorType === '3' && (
                        <Form.Group>
                            <Form.Label>Short Juridical Name</Form.Label>
                            <Form.Control
                                name="shortJuridicalName"
                                type="text"
                                placeholder="Enter Short Juridical Name"
                                required
                                onChange={(event: any) =>
                                    this.handleInputChange(event)
                                }
                            />
                        </Form.Group>
                    )}
                    <hr />
                    <Button variant="primary" type="submit">
                        Create Executor Profile
                    </Button>
                </Form>
            </div>
        );
    }

    handleInputChange(event: any) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (target.type === 'radio') {
            if (target.id === 'naturalPerson') value = '1';
            if (target.id === 'soleTrader') value = '2';
            if (target.id === 'juridicalPerson') value = '3';

            this.setState({ executorType: value });
        }

        if (target.type === 'select-multiple') {
            let serviceId = 0;
            this.services.map((serviceClassifer: any, index: number) => {
                const services = serviceClassifer.servicesDescriptions.split(
                    ','
                );

                services.map((service: any, index: number) => {
                    if (service.length === 0) services.splice(index, 1);

                    const serviceInfo = service.split('---');
                    const id = serviceInfo[0];
                    const description = serviceInfo[1];

                    if (target.value === description) serviceId = id;
                });
            });

            if (
                this.state.services.indexOf(value) === -1 &&
                this.state.servicesId.indexOf(serviceId)
            ) {
                this.state.servicesId.push(serviceId);
                this.state.services.push(value);
            }
        }

        this.setState({
            [name]: value
        });
    }

    removeService = (service: string) => {
        const services = [...this.state.services];
        const index = services.indexOf(service);
        if (index > -1) {
            services.splice(index, 1);
            this.setState({ services: services });
        }

        let serviceId = 0;
        this.services.map((serviceClassifer: any, index: number) => {
            const services = serviceClassifer.servicesDescriptions.split(',');

            services.map((serviceValue: any, index: number) => {
                if (serviceValue.length === 0) services.splice(index, 1);

                const serviceInfo = serviceValue.split('---');
                const id = serviceInfo[0];
                const description = serviceInfo[1];

                if (service === description) serviceId = id;
            });
        });

        const servicesId = [...this.state.servicesId];
        const indexId = servicesId.indexOf(serviceId);
        if (indexId > -1) {
            servicesId.splice(indexId, 1);
            this.setState({ servicesId: servicesId });
        }
    };

    onCreateExecutorProfile(event: any) {
        event.preventDefault();

        const data = {
            servicesId: this.state.servicesId.join(', '),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            patronymic: this.state.patronymic,
            description: this.state.description,
            number: this.state.number,
            payerAccountNumber: this.state.payerAccountNumber,
            fullJuridicalName: this.state.fullJuridicalName,
            shortJuridicalName: this.state.shortJuridicalName,
            executorType: parseInt(this.state.executorType),
            userId: appStore.currentUserId
        };

        ApiService.postData(ApiUrls.ExecutorsUrl, data).then(() => {
            appStore.clearUserData();
            document.location.replace('/');
        });
    }

    loadData() {
        ApiService.getData(ApiUrls.ServicesUrl).then(response => {
            this.services = response;
        });
    }
}
