import { observable, action } from 'mobx';

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

    @action
    setValue(key: string, value: string) {
        window.localStorage.setItem(key, value);
    }

    @action
    getValue(key: string): string | null {
        const value = window.localStorage.getItem(key);
        return value ? value : null;
    }

    @action
    clearUserData() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userName');
        window.localStorage.removeItem('userId');
    }
}

export const appStore = new AppStore();
