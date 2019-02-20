import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { client } from '@/common/apolloCLient'
import './App.css'
import { Greeting } from './hooks/demo1'
import { ApolloQuery } from './apollo/demo'

class App extends Component {
  render() {
    return (
        <ApolloProvider className="App" client={client}>
          <Router>
            <div>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
              <hr />
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
            </div>
          </Router>
          <header className="App-header">
            <Greeting client={client}/>
            <ApolloQuery/>
          </header>
        </ApolloProvider>
    );
  }
}

const Home = () => (
    <div>
      <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
      <h2>About</h2>
    </div>
);

export default App;
