import React, { Component } from 'react'
import AuthService from '../Service/AuthService'
import { withRouter } from 'react-router-dom'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.authService = new AuthService();
    }

    setFieldValue = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await this.authService.registerUser(this.state);
            this.props.setUserDetails(user);
            this.props.history.push('/watchlist');

        } catch (e) {
            console.log(e);
        }

    }

    render() {
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <input className="sakka" onChange={this.setFieldValue} name="username" type="text"></input>
                    <input className="sakka" onChange={this.setFieldValue} name="password" type="text"></input>
                    <button className="submitlogin" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Register)
