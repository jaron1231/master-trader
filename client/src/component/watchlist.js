import React, { Component } from 'react'
import WatchlistService from '../Service/WatchlistService';
import StockService from '../Service/StockService';
import StockInfo from '../component/stockInfo';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';


export default class Watchlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watchList: [],
            data: { quote: null },
            logo: "",
            watchListLoading: true
        }
        this.watchlistService = new WatchlistService();
        this.stockService = new StockService();
    }

    async componentDidMount() {
        const data = await this.watchlistService.getWatchlist();
        if (data) {
            const watchList = await this.stockService.getMultipleStocks(data.watchList);
            this.setState({
                watchList,
                watchListLoading: false
            })
        }
        else {
            this.setState({
                watchList: null,
                watchListLoading: false
            })
        }
    }

    async deleteStock(symbol) {
        this.setState({
            watchList: this.state.watchList.filter(stock => stock.quote.symbol !== symbol)
        })
        const data = await this.watchlistService.deleteWatchlist(symbol);
    }

    preventDefault(e) {
        e.stopPropagation();
    }

    render() {
        const { watchList, watchListLoading } = this.state;
        return !watchListLoading ? (watchList.length ? <div>
            <Accordion allowZeroExpanded="true">
                {watchList.map(stock => {
                    const { logo, quote } = stock;
                    return <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="accordioncontent">
                                    <div className="left-col-accordion">
                                        {quote.symbol} | {quote.companyName}
                                    </div>
                                    <div className="right-col-accordion">
                                        <span>{quote.latestPrice}</span>
                                    </div>
                                </div>
                                <button onClick={(e) => { this.preventDefault(e); this.deleteStock(quote.symbol) }}>sakka</button>
                            </AccordionItemButton>

                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <StockInfo quote={quote} logo={logo} isWatchlist="true" />
                        </AccordionItemPanel>
                    </AccordionItem>
                })}
            </Accordion>

        </div> : <h1>Watchlist Empty</h1>) : <h1>Loading...</h1>
    }
}

