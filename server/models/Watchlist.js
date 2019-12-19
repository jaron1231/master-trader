const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const watchlistSchema = new Schema({
    userId: { type: ObjectId, ref: "User" },
    watchList: [{ type: String }]
});

module.exports = mongoose.model("Watchlist", watchlistSchema);
