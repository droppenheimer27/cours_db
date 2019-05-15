import { observable } from 'mobx';

import OrderModel from '../Models/OrderModel';

class OrdersStore {
    @observable orders: OrderModel[] = [];
    @observable pagination: any = [];
}

export const ordersStore = new OrdersStore();
