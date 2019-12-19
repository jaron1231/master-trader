import React from 'react';
import AuthService from './Service/AuthService'
import './App.css';
import { Route, Switch } from "react-router-dom";
import StockComponent from "./component/stock.component";
import Navbar from "./component/navbar";
import Newsletter from "./component/newsletter";
import Watchlist from './component/watchlist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: true
    }
    this.authService = new AuthService();
  }

  setUserDetails = (user) => {
    this.setState({ user });
  }

  async componentDidMount() {
    try {
      const user = await this.authService.getLoggedInUser();
      this.setState({ user, isLoading: false });
    } catch{
      this.setState({ user: null, isLoading: false });
    }

  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <div className="App">
        <ToastContainer></ToastContainer>
        <Navbar setUserDetails={this.setUserDetails} user={this.state.user}></Navbar>
        <div className="body">

          {/* <Register setUserDetails={this.setUserDetails}></Register>
        <Login setUserDetails={this.setUserDetails}></Login> */}
          {!isLoading ? <Switch>
            <Route path="/news" component={StockComponent}></Route>
            <Route
              path='/watchlist'
              render={(props) => <Watchlist {...props} user={user} />}
            />
          </Switch> : <h2>Loading...</h2>}

          <Newsletter></Newsletter>
        </div>
      </div>
    );
  }
}
export default App;
