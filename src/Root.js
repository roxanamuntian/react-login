import React from 'react'
import { CookiesProvider } from 'react-cookie'
import App from './App'

export default class Root extends React.Component {
    render() {
        return (
            <CookiesProvider>
                <App />
            </CookiesProvider>
        )
    }
}

