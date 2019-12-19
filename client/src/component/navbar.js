import React, { Component } from 'react'
import bull from "../images/bull-01.png";
import Popup from "reactjs-popup";
import Logincomponent from "../component/login.component";
import Registercomponent from "../component/register.component";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            open: false,
        }
    }


    showRegisterComponent = () => {
        this.setState({ login: false })
    }

    render() {
        return (
            <div>

                <div className="navBar">
                    <div className="topNav">
                        <div className="topNavHeader">{<span>Welcome &nbsp;{this.props.user ? this.props.user.username : (!this.props.user ?
                            <Popup trigger={<button> Login</button>} position="bottom center">
                                <div>{this.state.login ? <Logincomponent showRegisterComponent={this.showRegisterComponent} setUserDetails={this.props.setUserDetails} /> : <Registercomponent setUserDetails={this.props.setUserDetails} />}</div>
                            </Popup> : <button> Logout</button>)}</span>}</div>
                    </div>
                    <div className="content">

                        <div className="left">
                            <img src={bull} alt="" className="logo" />
                        </div>

                        <p className="navText">Home</p>
                        <p className="navText">Pre Market Movers</p>
                        <Link to="/news"><p className="navText">Stock Screener</p></Link>
                        <Link to="/watchlist"><p className="navText">My Watchlist</p>
                        </Link>
                    </div>
                </div>
                {/* <div className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget" />
        <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com" rel="noopener" target="_blank"><span className="blue-text">Ticker Tape</span></a> by TradingView</div>
      </div> */}
            </div >
        )
    } x
}
