import React from 'react'
import { Redirect } from 'react-router-dom'
import { UserList } from './List'

export default [{
  props: {
    exact: true,
    from: "/user",
    to: "/user/list",
  },
  Type: props => <Redirect {...props}/>
},{
  props: {
    path: '/user/list',
    component: UserList,
  },
}]

