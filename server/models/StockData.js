const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockDataSchema = new Schema({
    news_url: { type: String },
    image_url: { type: String },
    title: { type: String },
    text: { type: String },
    source_name: { type: String },
    date: { type: Date },
    topics: [String],
    sentiment: { type: String },
    type: { type: String },
    tickers: [String]
});

module.exports = mongoose.model("news", StockDataSchema);
