import { observable } from 'mobx';

import ExecutorModel from '../Models/ExecutorModel';

class ExecutorsStore {
    @observable executors: ExecutorModel[] = [];
}

export const executorsStore = new ExecutorsStore(); 