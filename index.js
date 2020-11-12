import {html, render} from 'https://unpkg.com/lit-html?module';

import {State} from './observable.js'

const appState = new State({user: '', friends: []})

const greetingComponent = (name) => {
    return html`<h1>Hello ${name}</h1>`
}

const listComponent = (list) => {
    if (!list || list.length < 1) return html`<h1>You have no friends 😔</h1>`
    return html`
        <div class="friends-list">
            ${list.map(item => html`<div class="friend">My friend ${item}</div>`)}
        </div>
    `
}
const loginComponent = (handleLogin) => {
    let name = ''

    const handleTextInput = (input) => {
        return name = input
    }

    return html`
        <div class="login">
            <input class="input" placeholder="Login with name" @input=${(e) => handleTextInput(e.target.value)}/>
            <button class="button" @click=${() => handleLogin(name)}>Login</button>
        </div>
    `
}

const homeComponent = (data, state) => {
    let newFriend = ''

    const handleInput = (input) => {
        return newFriend = input
    }
    const handleClick = () => {
        if (newFriend.length < 1) return
        const newFriends = [...data.friends, newFriend]
        state.setState('friends', newFriends)
        newFriend = ''
    }

    const handleLogout = () => {
        state.setState('user', '')
    }
    
    return html`
        <div>
            ${greetingComponent(data.user)}
            ${listComponent(data.friends)}
            <input class="input" @input=${(e) => handleInput(e.target.value)} />
            <button class="button" @click=${() => handleClick()}>Add new friend</button>
            <button class="button logout-button" @click=${() => handleLogout()}>Log Out</button>
        </div>
    `
}

class App {
    constructor(el, state) {
        this.el = el
        this.state = state
        this.state.subscribe(this)
        this.update(this.state)
    }
    
    loginWithName = (name) => {
        return this.state.setState('user', name)
    }
    prepareTemplate(data) {
        return html`
            <div>
                ${data.user ? homeComponent(data, this.state) : loginComponent(this.loginWithName)}
            </div>
        `
    }
    update(state) {
        render(this.prepareTemplate(state.getState()), this.el)
     }
}

const app = new App(document.getElementById('app'), appState)
