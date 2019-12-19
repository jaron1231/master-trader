import axios from 'axios';

class StockService {
    constructor() {
        const service = axios.create({
            baseURL: 'https://cloud.iexapis.com/stable/stock/',
        });
        this.service = service;
    }
    async getStockData(symbol) {
        try {
            const { data } = await this.service.get(`${symbol}/batch`, {
                params: {
                    types: 'quote,news,logo',
                    token: 'pk_93aa595f253d455cb1c1d031b4b1766e'
                }
            });
            return data;
        } catch (e) {

            console.log('Error', e);
        }
    }

    async getMultipleStocks(symbols) {

        const multipleStocks = symbols.map(async (symbol) => {
            try {
                const { data } = await this.service.get(`${symbol}/batch`, {
                    params: {
                        types: 'quote,logo',
                        token: 'pk_93aa595f253d455cb1c1d031b4b1766e'
                    }
                });
                return data;
            } catch (e) {

                return null
            }
        });

        return await Promise.all(multipleStocks).then(result => {
            return result;
        });

    }


}

// const service = new StockService();

// async function get() {

//     let getMultipleStocks = await service.getMultipleStocks(["AAPL", "FB"]);

// }

// get()
export default StockService;

