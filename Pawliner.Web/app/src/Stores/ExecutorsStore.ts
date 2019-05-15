import { observable } from 'mobx';

import ExecutorModel from '../Models/ExecutorModel';

class ExecutorsStore {
    @observable executors: ExecutorModel[] = [];
    @observable pagination: any = [];
}

export const executorsStore = new ExecutorsStore();
