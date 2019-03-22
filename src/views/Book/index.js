import React from 'react'
import loadable from '@loadable/component'
import { Redirect } from 'react-router-dom'

const name = 'book'

export default [{
  props: {
    exact: true,
    from: `/${name}`,
    to: `/${name}/list`,
  },
  Type: props => <Redirect {...props}/>
}, {
  props: {
    path: `/${name}/list`,
    component: loadable(() => import('./List')),
  },
}]


