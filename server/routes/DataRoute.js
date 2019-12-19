var express = require('express');
var router = express.Router();
var StockDataSchema = require('../models/StockData');
var axios = require('axios');

router.get('/', function (req, res, next) {
    StockDataSchema.find({}, async function (err, news) {

        const newsWithStockPrice = [];
        for (let i = 0; i < news.length; i++) {
            const ticker = news[i].tickers[0];
            const stockPrice = await getStockPrice(ticker);
            newsWithStockPrice.push({ ...news[i]._doc, stockPrice });
        };

        res.status(200).json(newsWithStockPrice);
    })
});


const getStockPrice = async (ticker) => {
    const { data } = await axios.get('https://www.alphavantage.co/query', {
        params: {
            'function': 'GLOBAL_QUOTE',
            'symbol': ticker,
            'apikey': 'JCF6IK0L29WHVCFW'
        }
    });
    return data['Global Quote'];
};

module.exports = router;
