import React, { Component } from "react";
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

class App extends Component {
    constructor() {
        super();
        this.state = { data: [] };
        this.subscription = null;
    }

    componentDidMount() {
        const response = ajax('https://jsonplaceholder.typicode.com/users').pipe(
            map(e => e.response)
        );

        this.subscription = response.subscribe(res => {
            this.setState({ data: res });
        });
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    render() {
        return (
            <div>
                <h3>Using RxJS with ReactJS</h3>
                <ul>
                    {this.state.data.map(el => (
                        <li key={el.id}>
                            {el.id}: {el.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default App;
