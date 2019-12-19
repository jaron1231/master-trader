import React, { Component } from 'react'

export default class Newsletter extends Component {
    render() {
        return (
            <div className="newsletter">
                <h1>Sign up For Our Newsletter</h1>
                <p>Get breaking stock news that will make or break your portfolio.</p>
                 <input class="search" type="text" placeholder="Example: jaronimo@hotmail.com"></input>

            </div>
        )
    }
}
