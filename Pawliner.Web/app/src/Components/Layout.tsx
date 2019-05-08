import React from 'react';
import { Switch, Route } from 'react-router-dom'

import ModalDialogContainer from './ModalDialogContainer';
import Home from './Pages/Home/Home';
import Order from './Pages/Order/Order';
import Executor from './Pages/Executor/Executor';

export default class Layout extends React.Component<{}, {}> {
    render() {
        return (
            <React.Fragment>
                <ModalDialogContainer />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/orders/:id' component={Order}/>
                    <Route path='/executors/:id' component={Executor}/>
                </Switch>
            </React.Fragment>
        );
    }
}