import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Button } from 'react-bootstrap';

import ApiService from '../../../Services/ApiService';
import { ApiUrls } from '../../../AppConstants';

import ExecutorModel from '../../../Models/ExecutorModel';
import CommentModel from '../../../Models/CommentModel';

interface IExecutorProps {
    match: any
}

@observer
export default class Executor extends React.Component<IExecutorProps, {}> {
    @observable executor: ExecutorModel | null = null;
    @observable comments: CommentModel[] = [];

    constructor(props: any) {
        super(props);

        this.loadData();
    }

    render() {
        let services: any[] = [];
        if (this.executor) services = this.executor.serviceClassiferDescription.split(',');
        return (
            <React.Fragment>
                {this.executor && <div className="row" style={{backgroundColor: '#ffffff', margin: '5rem', display: 'flex', justifyContent: 'center', padding: '5rem'}}>
                    <div className="box">
                        <div className="row">
                            <h2><b>{this.executor.firstName + ' ' + this.executor.lastName}</b></h2> 
                        </div>
                        <div className="row">
                           
                        </div>
                        <div className="box-body">
                            <hr/>
                            <div className="row" style={{marginLeft: '5rem', marginBottom: '5rem'}}>
                                <div className="col">
                                    <p>{this.executor.description}</p>
                                </div>
                                <div className="col col-lg-2">
                                    <ul>
                                        Services
                                        {(services || []).map((service: any, index: number) => {
                                            return <li key={index}>{service}</li>; 
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer">
                            <div className="row">
                                <div className="col">
                                </div>
                                <div className="pull-right">
                                    <Button type="button" variant="primary">Leave a comment</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                <hr />
                {(this.comments || []).map((comment, index) => {
                    return (
                        <div key={comment.id + index} className="row" style={{backgroundColor: '#ffffff', marginTop: '3rem', marginLeft: '20rem', marginRight: '20rem', display: 'flex', justifyContent: 'flex-start', padding: '2rem'}}>
                            <div className="box">
                                <div className="row">
                                    <div className="col text-white">
                                        <h5><a className="text-orange" href="#!/main/executor/<%= Executor.Id %>">{comment.userName}</a></h5>
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
                                            <p>{comment.content}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p><small className="text-muted">{comment.createdAt}</small></p>
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
        this.executor = await ApiService.getData(ApiUrls.ExecutorsUrl + '/' + this.props.match.params.id);
        this.comments = await ApiService.getData(ApiUrls.CommentsUrl + '/' + this.props.match.params.id);
    }
}