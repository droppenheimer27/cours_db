import axios from 'axios';

export interface ParamsModel {
    filter?: string;
    search?: string;
}

export default class ApiService {
    static async getData(url: string, data?: ParamsModel) {
        try {
            const options = { 
                params: data, 
                headers: { 
                    'Authorization': window.sessionStorage.getItem('token')
                } 
            };

            return await axios.get('https://localhost:44356/' + url, options).then(response => {
                return response.data;
            });
            } catch (error) {
            console.error(error)
        }
    }

    static async postData(url: string, data: any) {
        try {
            return await axios.post('https://localhost:44356/' + url, data).then(response => {
                return response.data;
            });
            } catch (error) {
            console.error(error)
        }
    }
}