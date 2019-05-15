import React from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import ApiService from '../../../Services/ApiService';
import { ApiUrls } from '../../../AppConstants';

import { executorsStore } from '../../../Stores/ExecutorsStore';

@observer
export default class Executors extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);

        this.loadData();
    }

    render() {
        return (
            <React.Fragment>
                {(executorsStore.executors || []).map((executor: any, index: number) => {
                    const regex = new RegExp('/', 'g');
                    let picture = '';
                    if (executor.path) picture = executor.path.replace(regex, '\\');
                    return (
                        <div key={executor.id + index} className="col-md-9" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                            <Card>
                                <Card.Header>
                                    <Link to={'executors/' + executor.id}>
                                        <b>{executor.firstName + ' ' + executor.lastName}</b>
                                    </Link>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <div className="row">
                                            <div className="col-2">
                                                {!executor.fileName && (
                                                    <img
                                                        className="img-thumbnail"
                                                        src="http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg"
                                                        alt=""
                                                    />
                                                )}
                                                {executor.fileName && (
                                                    <Image className="img-thumbnail" src={process.env.PUBLIC_URL + '/' + picture} alt="" />
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
                                                    {executor.description}
                                                </p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row" style={{ marginTop: '.4rem' }}>
                                            <div className="col">
                                                <p className="text-muted">Service - {executor.serviceClassiferDescription}</p>
                                            </div>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    );
                })}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {executorsStore.pagination.hasPreviousPage && (
                        <Button variant="primary" onClick={this.prevPage}>
                            Back
                        </Button>
                    )}
                    {executorsStore.pagination.hasNextPage && (
                        <Button variant="primary" style={{ marginLeft: '2rem' }} onClick={this.nextPage}>
                            Next
                        </Button>
                    )}
                </div>
            </React.Fragment>
        );
    }

    prevPage = () => {
        ApiService.getData(ApiUrls.ExecutorsUrl, {
            currentPage: executorsStore.pagination.currentPage - 1
        }).then((response: any) => {
            executorsStore.executors = [];
            executorsStore.executors = response.items;
            executorsStore.pagination = response.pagination;
        });
    };

    nextPage = () => {
        ApiService.getData(ApiUrls.ExecutorsUrl, {
            currentPage: executorsStore.pagination.currentPage + 1
        }).then((response: any) => {
            executorsStore.executors = [];
            executorsStore.executors = response.items;
            executorsStore.pagination = response.pagination;
        });
    };

    async loadData() {
        const data = await ApiService.getData(ApiUrls.ExecutorsUrl);
        executorsStore.executors = data.items;
        executorsStore.pagination = data.pagination;
    }
}
