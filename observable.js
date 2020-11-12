class Observable {
    constructor() {
        this.observers = []
    }
    subscribe(observer) {
        this.observers.push(observer)
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => {
            return obs != observer
        })
    }
    publish(data) {
        this.observers.forEach(observer => {
            observer.update(data)
        })
    }
}

class State extends Observable {
    constructor(state = {}) {
        super()
        this.state = state
        this.publish(state)
    }
    
    setState(propName, newData) {
        Object.defineProperty(this.state, propName, {value: newData, configurable: true})
        this.publish(this)
    }
    getState() {
        return this.state
    }
}

export { Observable, State}