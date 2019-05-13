import { observable } from 'mobx';

class RespondsStore {
    @observable responds: any[] = [];
}

export const respondsStore = new RespondsStore();
