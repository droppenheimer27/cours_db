import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import Orders from './Orders';
import Executors from './Executors';

export default class Home extends React.Component<{}, {}> {
    
    render() {
        return(
            <div className="container" style={{backgroundColor: '#ffffff', padding: '3rem', marginTop: '5rem'}}>
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Orders">
                        <Orders />
                    </Tab>
                    <Tab eventKey="profile" title="Executors">
                        <Executors />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}