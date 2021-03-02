import { create } from 'apisauce';

let api = create({
    baseURL: 'https://jotaspet.herokuapp.com/',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})

export default api;