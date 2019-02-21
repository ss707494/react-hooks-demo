import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Router, Route, Switch, Redirect } from "react-router-dom"
import { client } from '@/common/apolloCLient'
import history from '@/common/history'
import Routes from '@/views'
import { CreateMessageObj } from '@/component/Message'

export default () =>
    (
        <ApolloProvider className="App"
                        client={client}
        >
          <Router history={history}>
            <Switch>
              <Redirect exact
                     from="/"
                     to="/home"
              />
              <Route path="/about"
                     component={About}
              />
              {Routes.map(({ props }) => props.layout ?
                  <props.layout><Route {...props} key={props.path}/></props.layout> :
                  <Route {...props} key={props.path}/>
              )}
              <Route component={NoMatch}/>
            </Switch>
          </Router>
          <CreateMessageObj/>
        </ApolloProvider>
    )

const About = () => (
    <div>
      <h2>About</h2>
    </div>
)

const NoMatch = () => (
    <div>
      <h2>404</h2>
    </div>
);
