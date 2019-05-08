import axios from 'axios';

export interface ParamsModel {
    filter?: string;
    search?: string;
}

export default class ApiService {
    static async getData(url: string, data?: ParamsModel) {
        try {
            return await axios.get('https://localhost:44356/' + url, { params: data }).then(response => {
                return response.data;
            });
            } catch (error) {
            console.error(error)
        }
    }
}