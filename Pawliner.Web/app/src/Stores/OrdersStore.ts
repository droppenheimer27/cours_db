import { observable } from 'mobx';

import OrderModel from '../Models/OrderModel';

class OrdersStore {
    @observable orders: OrderModel[] = [];
}

export const ordersStore = new OrdersStore(); 