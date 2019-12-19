import axios from 'axios';

class Authservice {
    constructor() {
        const service = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}auth`,
            withCredentials: true
        });
        this.service = service;
    }
    async registerUser(body) {
        const { data } = await this.service.post("/register", body);
        return data;
    }

    async loginUser(body) {
        const { data } = await this.service.post("/login", body);
        return data;
    }

    async getLoggedInUser() {
        const { data } = await this.service.get("/isLoggedIn");
        return data;
    }

}

export default Authservice;

