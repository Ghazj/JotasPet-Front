import { create } from 'apisauce';

let api = create({
    baseURL: 'https://dashboard.heroku.com/',
    headers: {
        "Accept": "application/jason",
        "Content-Type": "application/json"
    }
})

export default api;