import React, { Component } from 'react'
import { render } from 'react-dom'

import Input from './components/Input'

class App extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Input type="text" placeholder="请输入账号"/>
                <Input type="password" placeholder="请输入密码"/>
            </div>
        )
    }
}

render(<App />, document.getElementById('root'))