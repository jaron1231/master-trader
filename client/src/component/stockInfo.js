import React, { Component } from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
// import Loader from 'react-loader-spinner'
// import { AreaChart } from 'react-chartkick'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { ReactComponent as Arrow } from "../images/arrow.svg";
import TradingViewWidget from 'react-tradingview-widget';
import WatchlistService from '../Service/WatchlistService';
import { toast } from 'react-toastify';


export default class StockInfo extends Component {
    constructor(props) {
        super(props);
        this.watchlistService = new WatchlistService();
    }

    async addToWatchlist(symbol) {
        const data = await this.watchlistService.addWatchlist(symbol);
        if (data) {
            toast.success("Added to watchlist!");
        }
    }

    render() {
        const { quote, logo, isWatchlist } = this.props;
        const value = {
            min: quote ? quote.low : 0,
            max: quote ? quote.high : 0
        };

        const valueyear = {
            min: quote ? quote.week52Low : 0,
            max: quote ? quote.week52High : 0
        };

        const deltayear = valueyear.max - valueyear.min;
        const delta = value.max - value.min;

        const change = quote.isUSMarketOpen ? quote.change : quote.extendedChange;
        const changePercent = quote.isUSMarketOpen ? quote.changePercent : quote.extendedChangePercent;

        return (
            <div>
                <div className="parent">
                    <div className="title-div-full">
                        <div className="title-div">

                            <div className="div1"> <span className="stockTicker">{quote.companyName}</span></div>
                            <img className="stockLogo" src={logo.url} alt="" srcset="" />
                        </div>
                        <div className="title-div-right">{!isWatchlist ? <button class="watchlistbutton" onClick={() => this.addToWatchlist(quote.symbol)}>+ My Watchlist</button> : ""}</div>
                    </div>

                    <div className="left-right">
                        <div className="stock-left-col">
                            <div className="linebreak"></div>
                            <div className="open-or-not">
                                <div className="tickerandname"> <span>{quote.symbol} | {quote.primaryExchange}</span></div>

                                <span className={quote.isUSMarketOpen == false ? "premarket2" : "open"}>Market Closed</span>
                                <span className={quote.isUSMarketOpen == true ? "premarket2" : "open"}>Market Open</span>
                            </div>
                            <div className="div2">  <p className={quote.isUSMarketOpen == false ? "marketclosedprice" : "marketopenprice"}>${quote.latestPrice} </p> </div>
                            <div className="div2">  <p className={quote.isUSMarketOpen == true ? "marketclosedprice" : "marketopenprice"}>${quote.extendedPrice} </p> </div>

                            <div className="div22"><span className={quote.isUSMarketOpen == false ? "premarket" : "open"}>pre-market</span></div>

                            <div className={change > 0 ? "price-change up div3" : "price-change down div3"}>
                                <span >${change} </span>
                                <Arrow className={change > 0 ? "arrow" : "fillred"} />
                                <span >&nbsp;{changePercent * 100}%</span>
                            </div>

                            <div className="div4"> <p className="latesttime">Last Updated: {quote.latestTime}</p></div>
                            <div className="div10"> <span className="realtimequote">realtime quote</span></div>

                            <div className={quote.isUSMarketOpen == false ? "marketisopen" : "marketisclosed"}>
                                <div className="closedmarkettable">
                                    <span>Close</span>
                                    <span>Change</span>
                                    <span>Change %</span>


                                </div>
                                <div className="linebreaksmall"></div>
                                <div className={quote.change > 0 ? "up" : "down"}>
                                    <div className="closedmarkettablenumbers">
                                        <span>${quote.latestPrice}</span>
                                        <span>${quote.change}</span>
                                        <span>{quote.changePercent * 100}%</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="stock-right-col">
                            {/* <div className="div5"> <AreaChart colors={["#05edff", "#00edff"]} min={null} data={this.getChartData(chart)} /></div> */}
                            <div className="div5"><TradingViewWidget
                                symbol={quote.symbol}

                                locale="usa"
                                height="400px"
                                width="700px;"
                            /> </div>
                        </div></div>
                    <div className="stock-bars">
                        <div className="div6"> <h3 class="bartitle">52 week high/low</h3><InputRange
                            maxValue={valueyear.max + deltayear * 0.1}
                            minValue={valueyear.min - deltayear * 0.1}
                            value={valueyear} /></div>

                        <div className="div7"><h3 class="bartitle">Previous day high/low</h3><InputRange
                            maxValue={value.max + delta * 0.1}
                            minValue={value.min - delta * 0.1}
                            value={value} /></div>
                        <div className="div8"></div>
                    </div>
                </div>
            </div>
        )
    }
}
