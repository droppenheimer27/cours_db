import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import ApiService from '../../../Services/ApiService';
import { ApiUrls, Paths } from '../../../AppConstants';

import { executorsStore } from '../../../Stores/ExecutorsStore';

@observer
export default class Executors extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);

        this.loadData();
    }

    render() {
        return (executorsStore.executors || []).map(
            (executor: any, index: number) => {
                const regex = new RegExp('/', 'g');
                let picture = '';
                if (executor.path) picture = executor.path.replace(regex, '\\');
                return (
                    <div key={executor.id + index} className="col-md-9">
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title">
                                    <Link to={'executors/' + executor.id}>
                                        <b>
                                            {executor.firstName +
                                                ' ' +
                                                executor.lastName}
                                        </b>
                                    </Link>
                                </h3>
                            </div>
                            <div className="box-body">
                                <div className="row container">
                                    <div className="col-2">
                                        {!executor.fileName && (
                                            <img
                                                className="img-thumbnail"
                                                src="http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg"
                                                alt=""
                                            />
                                        )}
                                        {executor.fileName && (
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
                                            {executor.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="box-footer">
                                <div className="row">
                                    <div className="col">
                                        <p className="text-muted">
                                            Service -{' '}
                                            {
                                                executor.serviceClassiferDescription
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        );
    }

    async loadData() {
        executorsStore.executors = await ApiService.getData(
            ApiUrls.ExecutorsUrl
        );
    }
}
