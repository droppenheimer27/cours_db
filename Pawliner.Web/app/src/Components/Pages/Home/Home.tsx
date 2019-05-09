import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';

import Orders from './Orders';
import Executors from './Executors';
import { observer } from 'mobx-react';

import { appStore } from '../../../Stores/AppStore';

@observer
export default class Home extends React.Component<{}, {}> {
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
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Orders">
                        <Orders />
                    </Tab>
                    <Tab eventKey="profile" title="Executors">
                        <Executors />
                    </Tab>
                    {appStore.isAuthorize && (
                        <Tab
                            eventKey="place-order"
                            title={<Link to="place-order">Place Order</Link>}
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
        );
    }
}
