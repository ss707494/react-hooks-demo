import React from 'react'
import loadable from '@loadable/component'
import { Redirect } from 'react-router-dom'

export default [{
  props: {
    exact: true,
    from: "/dict",
    to: "/dict/list",
  },
  Type: props => <Redirect {...props}/>
},{
  props: {
    path: '/dict/list',
    component: loadable(() => import('./List')),
  },
}]

