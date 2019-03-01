import React from 'react'
import { Router, Route, Switch } from "react-router-dom"
import { wrapperApollo } from '@/common/apolloCLient'
import { wrapperContext } from '@/common/context'
import history from '@/common/history'
import { routes } from '@/views'
import { CreateMessageObj } from '@/component/Message'

export default () => wrapperApollo(wrapperContext((
    <>
      <Router history={history}>
        <Switch>
          {routes}
          <Route component={NoMatch}/>
        </Switch>
      </Router>
      < CreateMessageObj/>
    </>
)))

const NoMatch = () => (
    <div>
      <h2>404</h2>
    </div>
);
