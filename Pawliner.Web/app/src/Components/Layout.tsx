import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ModalDialogContainer from './ModalDialogContainer';
import Home from './Pages/Home/Home';
import Order from './Pages/Order/Order';
import CreateOrder from './Pages/Order/CreateOrder';
import Executor from './Pages/Executor/Executor';
import CreateExecutorProfile from './Pages/Executor/CreateExecutorProfile';

export default class Layout extends React.Component<{}, {}> {
    render() {
        return (
            <React.Fragment>
                <ModalDialogContainer />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/orders/:id" component={Order} />
                    <Route path="/place-order" component={CreateOrder} />
                    <Route path="/executors/:id" component={Executor} />
                    <Route
                        path="/become-executor"
                        component={CreateExecutorProfile}
                    />
                </Switch>
            </React.Fragment>
        );
    }
}
