import React, { Component } from 'react';
import StockService from '../Service/StockService';
import StockInfo from '../component/stockInfo';
import AutoSuggest from './autosuggest';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import 'chart.js'
import NewsCardComponent from './newsCardComponent';
import 'react-input-range/lib/css/index.css';


export default class StockComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                news: [],
                quote: null,
                logo: "",
                chart: []
            },
            symbol: 'aapl',
            loading: false
        }
        this.StockService = new StockService();
    }

    async componentDidMount() {
        this.updateLatestStockData(this.state.symbol)
        this.intervalStockData();
    }

    getLatestStockData = async (symbol) => {
        this.setState({
            symbol
        })
        this.updateLatestStockData(symbol);
    }

    updateLatestStockData = async (symbol) => {
        this.setState({
            loading: true
        })
        const data = await this.StockService.getStockData(symbol);
        this.setState({
            data,
            loading: false
        })
    }

    intervalStockData = () => {
        //setInterval(() => this.updateLatestStockData(this.state.symbol), 15000)
    }

    getChartData = (data) => {
        return data ? data.reduce((cd, d) => {
            cd[d.date] = d.close;
            return cd;
        }, {}) : {}
    }

    render() {
        const { quote, logo, news } = this.state.data;
        const firstNews = news[0];
        return (

            <div className="wrapper">
                <div className="title-section" >
                    <h1 className="stockTitle">Advanced Stock Screener</h1>

                    {/* <input class="search" type="text" placeholder="Search here for the stock your interested in..."></input> */}
                    <AutoSuggest getLatestStockData={this.getLatestStockData}></AutoSuggest>
                </div>
                <div className="body-content">
                    {!this.state.loading ? <>
                        {quote ? <StockInfo quote={quote} logo={logo} /> : ""}








                        
                        <h1 className="newstitle">Latest News</h1>
                        <div className="linebreak"></div>
                        <div className="newscolumns">

                            <div className="singlenewsarticle">{firstNews ? <NewsCardComponent news={firstNews} /> : ""}</div>
                            <div className="news">
                                {news.slice(1).map(news =>
                                    <NewsCardComponent news={news} />
                                )}
                            </div>
                        </div>


                    </> : <div className="loader"><Loader

                        type="Triangle"
                        color="#00edff"
                        height={150}
                        width={150}


                    /></div>}
                </div>
            </div>
        )
    }
}
