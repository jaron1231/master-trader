import axios from 'axios';

class WatchlistService {
    constructor() {
        const service = axios.create({
            baseURL: 'http://localhost:3000/api/watchlist',
            withCredentials: true
        });
        this.service = service;
    }

    async getWatchlist() {
        try {
            const { data } = await this.service.get("/");
            return data;
        } catch (e) {
            return null;
        }
    }

    async addWatchlist(symbol) {
        try {
            const { data } = await this.service.get(`/add/${symbol}`);
            return data;
        } catch (e) {
            return null;
        }
    }

    async deleteWatchlist(symbol) {
        try {
            const { data } = await this.service.get(`/delete/${symbol}`);
            return data;
        } catch (e) {
            return null;
        }
    }
}

// const service = new StockService();

// async function get() {

//     let getMultipleStocks = await service.getMultipleStocks(["AAPL", "FB"]);

// }

// get()
export default WatchlistService;

// async getMultipleStocks(symbols) {

//     const multipleStocks = symbols.map(async (symbol) => {
//         try {
//             const { data } = await this.service.get(`${symbol}/batch`, {
//                 params: {
//                     types: 'quote,logo',
//                     token: 'pk_8b099ee700d042049d54247b20bf5164'
//                 }
//             });
//             return data;
//         } catch (e) {

//             return null
//         }
//     });

//     return await Promise.all(multipleStocks).then(result => {
//         return result;
//     });

// }