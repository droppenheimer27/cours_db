import { observable, action, computed } from 'mobx';

class AppStore {
    @observable isAuthorize: boolean = false;

    public get currentToken(): string {
        return this.getValue('token') || '';
    }

    public get currentUser(): string {
        return this.getValue('userName') || '';
    }

    public get currentUserId(): string {
        return this.getValue('userId') || '';
    }

    public get currentExecutorId(): string {
        return this.getValue('executorId') || '';
    }

    @computed
    public get isExecutor(): boolean {
        return !!this.getValue('executorId');
    }

    @action
    setValue(key: any, value: any) {
        window.localStorage.setItem(key, value);
    }

    @action
    getValue(key: string): any | null {
        const value = window.localStorage.getItem(key);
        return value ? value : null;
    }

    @action
    clearUserData() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userName');
        window.localStorage.removeItem('userId');
        window.localStorage.removeItem('executorId');
    }
}

export const appStore = new AppStore();
