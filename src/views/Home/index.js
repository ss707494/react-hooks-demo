import React from 'react'
import { Redirect } from 'react-router-dom'

const Home = () => {
  return (
      <div>home</div>
  )
}

export default [{
  props: {
    exact: true,
    from: "/",
    to: "/user/list",
  },
  Type: Redirect
}, {
  props: {
    path: '/home',
    component: Home,
  }
}]
