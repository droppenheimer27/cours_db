import { observable, action } from 'mobx';


export class ModalState {
    body: any = null;
    title: string = '';
    width: number = 500;
    id: string = '';
}

class ModalStore {

    @observable modalList: ModalState[] = [];

    @action
    showModal(body: any, title: string, width: number = 350) { 
        const state = new ModalState();
        state.body = body;
        state.title = title;
        state.width = width;

        this.modalList.push(state);
    }

    @action
    closeModal() {
        this.modalList.pop();
    }
}

export const modalStore = new ModalStore();