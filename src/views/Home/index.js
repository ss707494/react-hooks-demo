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
    from: '/',
    to: '/calligraphy',
  },
  Type: Redirect
}, {
  props: {
    path: '/home',
    component: Home,
  }
}]
