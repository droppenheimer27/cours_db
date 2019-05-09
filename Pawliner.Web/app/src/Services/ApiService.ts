import axios from 'axios';
import { appStore } from '../Stores/AppStore';

export interface ParamsModel {
    filter?: string;
    search?: string;
}

export default class ApiService {
    static async getData(url: string, data?: ParamsModel) {
        try {
            const config = {
                params: data,
                headers: {
                    Authorization: appStore.currentToken
                }
            };

            return await axios
                .get('https://localhost:44356/' + url, config)
                .then(response => {
                    return response.data;
                });
        } catch (error) {
            console.error(error);
        }
    }

    static async postData(url: string, data: any) {
        const config = {
            headers: {
                Authorization: appStore.currentToken
            }
        };

        try {
            return await axios
                .post('https://localhost:44356/' + url, data, config)
                .then(response => {
                    return response.data;
                });
        } catch (error) {
            console.error(error);
        }
    }

    static async putData(url: string, data: any) {
        const config = {
            headers: {
                Authorization: appStore.currentToken
            }
        };

        try {
            return await axios
                .put('https://localhost:44356/' + url, data, config)
                .then(response => {
                    return response.data;
                });
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteData(url: string, data: any) {
        try {
            const config = {
                params: data,
                headers: {
                    Authorization: appStore.currentToken
                }
            };

            return await axios
                .delete('https://localhost:44356/' + url, config)
                .then(response => {
                    return response.data;
                });
        } catch (error) {
            console.error(error);
        }
    }
}
