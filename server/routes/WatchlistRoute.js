var express = require('express');
var WatchList = require('../models/Watchlist');
var router = express.Router();

router.get('/', async function (req, res, next) {
    if (req.session.user) {
        const watchList = await WatchList.findOne({ userId: req.session.user._id });
        res.status(200).json(watchList);
    } else {
        res.status(403).json({ message: 'Unauthorized' })
    }
});

router.get('/add/:symbol', async function (req, res, next) {
    if (req.session.user) {
        const symbol = req.params.symbol;
        const userWatchList = await WatchList.findOne({ userId: req.session.user._id });
        if ((userWatchList && !userWatchList.watchList.includes(symbol)) || !userWatchList) {
            const watchList = await WatchList.findOneAndUpdate(
                { userId: req.session.user._id },
                { $push: { watchList: symbol } },
                {
                    new: true,
                    upsert: true // Make this update into an upsert
                }
            )
            res.status(200).json(watchList)
        } else {
            res.status(200).json(userWatchList)
        }
    } else {
        res.status(403).json({ message: 'Unauthorized' })
    }
});

router.get('/delete/:symbol', async function (req, res, next) {
    if (req.session.user) {
        const symbol = req.params.symbol;
        const userWatchList = await WatchList.findOne({ userId: req.session.user._id });
        if ((userWatchList && userWatchList.watchList.includes(symbol))) {
            const modifiedWatchList = userWatchList.watchList.filter(sym => sym !== symbol)
            const watchList = await WatchList.findOneAndUpdate(
                { userId: req.session.user._id },
                { watchList: modifiedWatchList },
                {
                    new: true,
                    upsert: true // Make this update into an upsert
                }
            )
            res.status(200).json(watchList)
        } else {
            res.status(200).json(userWatchList)
        }
    } else {
        res.status(403).json({ message: 'Unauthorized' })
    }
});

module.exports = router;
