import React from 'react';
import { withCookies } from 'react-cookie'
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    onUsernameChanged = (e) => {
        this.setState({ username: e.target.value })
    }

    onPasswordChanged = (e) => {
        this.setState({ password: e.target.value })
    }

    login = () => {
        const { cookies } = this.props;
        const { username, password } = this.state;
        const endpoint = process.env.ENDPOINT || '';

        fetch(`${endpoint}\login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            cookies.set('token', data.token, {
                secure: true,
                httpOnly: true,
                sameSite: true
            })

            //access the token stored in cookies: cookies.get('token')
        })
        .catch(err => {
            console.log('err ', err)
        })
    }

    render() {
        return (
            <div className="loginForm" >

                <div className="username">
                    <label>Username</label>
                    <input type="text"
                        value={this.state.username}
                        onChange={this.onUsernameChanged}
                    />
                </div>

                <div className="password">
                    <label>Password</label>
                    <input type="password"
                        value={this.state.password}
                        onChange={this.onPasswordChanged}
                    />
                </div>

                <button className="submitButton" type="submit" onClick={this.login}>Login</button>
            
            </div>
        );
    }
}
            
export default withCookies(App);