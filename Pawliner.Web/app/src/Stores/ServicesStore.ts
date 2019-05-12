import { observable } from 'mobx';

class ServicesStore {
    @observable services: [] = [];
}

export const servicesStore = new ServicesStore();
