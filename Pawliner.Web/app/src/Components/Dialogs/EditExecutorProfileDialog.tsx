import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Form, Button, Badge } from 'react-bootstrap';

import ApiService from '../../Services/ApiService';
import { ApiUrls } from '../../AppConstants';
import { modalStore } from '../../Stores/ModalStore';
import { appStore } from '../../Stores/AppStore';

interface IEditExecutorProfileDialogProps {
    executor: any;
}

interface IEditExecutorProfileDialogState {
    [key: string]: any;
    services: string[];
    servicesId: number[];
    firstName: string;
    lastName: string;
    patronymic: string;
    description: string;
    phoneNumber: string;
    payerAccountNumber: string;
    fullJuridicalName: string;
    shortJuridicalName: string;
    executorType: number;
}

@observer
export default class EditExecutorProfileDialog extends React.Component<
    IEditExecutorProfileDialogProps,
    IEditExecutorProfileDialogState
> {
    @observable services: [] = [];

    constructor(props: IEditExecutorProfileDialogProps) {
        super(props);

        this.state = {
            services: this.props.executor.serviceClassiferDescription.split(
                ', '
            ),
            servicesId: [],
            firstName: this.props.executor.firstName,
            lastName: this.props.executor.lastName,
            patronymic: this.props.executor.patronymic,
            description: this.props.executor.description,
            phoneNumber: this.props.executor.phoneNumber,
            payerAccountNumber: this.props.executor.payerAccountNumber,
            fullJuridicalName: this.props.executor.fullJuridicalName,
            shortJuridicalName: this.props.executor.shortJuridicalName,
            executorType: this.props.executor.executorType
        };

        this.loadData();
    }

    render() {
        return (
            <Form onSubmit={(event: any) => this.onEditExecutorProfile(event)}>
                <Form.Group>
                    <Form.Check
                        inline
                        label="Natural person"
                        type="radio"
                        name="executor"
                        id="naturalPerson"
                        checked={this.state.executorType === 1}
                        onChange={(event: any) => this.handleInputChange(event)}
                    />
                    <Form.Check
                        inline
                        label="Sole trader"
                        type="radio"
                        name="executor"
                        id="soleTrader"
                        checked={this.state.executorType === 2}
                        onChange={(event: any) => this.handleInputChange(event)}
                    />
                    <Form.Check
                        inline
                        label="Juridical person"
                        type="radio"
                        name="executor"
                        id="juridicalPerson"
                        checked={this.state.executorType === 3}
                        onChange={(event: any) => this.handleInputChange(event)}
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
                        value={this.state.firstName}
                        name="firstName"
                        type="text"
                        placeholder="Enter Your First Name"
                        required
                        onChange={(event: any) => this.handleInputChange(event)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        value={this.state.lastName}
                        name="lastName"
                        type="text"
                        placeholder="Enter Your Last Name"
                        onChange={(event: any) => this.handleInputChange(event)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Patronymic</Form.Label>
                    <Form.Control
                        value={this.state.patronymic}
                        name="patronymic"
                        type="text"
                        placeholder="Enter Your Patronymic"
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
                        placeholder="Enter Description"
                        required
                        onChange={(event: any) => this.handleInputChange(event)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Number</Form.Label>
                    <Form.Control
                        value={this.state.phoneNumber}
                        name="phoneNumber"
                        type="text"
                        placeholder="Enter your number"
                        required
                        onChange={(event: any) => this.handleInputChange(event)}
                    />
                </Form.Group>
                {(this.state.executorType === 2 ||
                    this.state.executorType === 3) && (
                    <Form.Group>
                        <Form.Label>Payer Account Number</Form.Label>
                        <Form.Control
                            value={this.state.payerAccountNumber}
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
                {this.state.executorType === 3 && (
                    <Form.Group>
                        <Form.Label>Full Juridical Name</Form.Label>
                        <Form.Control
                            value={this.state.fullJuridicalName}
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
                {this.state.executorType === 3 && (
                    <Form.Group>
                        <Form.Label>Short Juridical Name</Form.Label>
                        <Form.Control
                            value={this.state.shortJuridicalName}
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
                    Edit Executor Profile
                </Button>
                <Button
                    variant="danger"
                    type="button"
                    style={{ marginLeft: '1rem' }}
                    onClick={this.removeExecutorProfile}
                >
                    Remove Profile
                </Button>
            </Form>
        );
    }

    loadData() {
        ApiService.getData(ApiUrls.ServicesUrl).then(response => {
            this.services = response;

            this.services.map((serviceClassifer: any, index: number) => {
                const services = serviceClassifer.servicesDescriptions.split(
                    ','
                );

                services.map((service: any, index: number) => {
                    if (service.length === 0) services.splice(index, 1);

                    const serviceInfo = service.split('---');
                    const id = serviceInfo[0];
                    const description = serviceInfo[1];

                    this.state.services.forEach(value => {
                        if (value === description) {
                            this.state.servicesId.push(id);
                        }
                    });
                });
            });
        });
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

    onEditExecutorProfile(event: any) {
        event.preventDefault();

        const data = {
            id: this.props.executor.id,
            servicesId: this.state.servicesId.join(', '),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            patronymic: this.state.patronymic,
            description: this.state.description,
            number: this.state.phoneNumber,
            payerAccountNumber: this.state.payerAccountNumber,
            fullJuridicalName: this.state.fullJuridicalName,
            shortJuridicalName: this.state.shortJuridicalName,
            executorType: this.state.executorType
        };

        ApiService.putData(ApiUrls.ExecutorsUrl, data).then(() => {
            this.props.executor.serviceClassiferDescription = this.state.services.join(
                ','
            );
            this.props.executor.firstName = this.state.firstName;
            this.props.executor.lastName = this.state.lastName;
            this.props.executor.patronymic = this.state.patronymic;
            this.props.executor.description = this.state.description;
            this.props.executor.phoneNumber = this.state.phoneNumber;
            this.props.executor.payerAccountNumber = this.state.payerAccountNumber;
            this.props.executor.fullJuridicalName = this.state.fullJuridicalName;
            this.props.executor.shortJuridicalName = this.state.shortJuridicalName;
            this.props.executor.executorType = this.state.executorType;

            modalStore.closeModal();
        });
    }

    removeExecutorProfile = () => {
        ApiService.deleteData(ApiUrls.ExecutorsUrl, {
            id: this.props.executor.id
        }).then(() => {
            appStore.setValue('executorId', '');

            modalStore.closeModal();
            document.location.replace('/ ');
        });
    };
}
