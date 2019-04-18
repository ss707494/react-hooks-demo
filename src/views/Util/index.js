import React from 'react'
import loadable from '@loadable/component'
import { Redirect } from 'react-router-dom'

const name = 'util'

export default [{
  props: {
    exact: true,
    from: `/${name}`,
    to: `/${name}/tool`,
  },
  Type: props => <Redirect {...props}/>
}, {
  props: {
    path: `/${name}/tool`,
    component: loadable(() => import('./Tool')),
  },
}]


