import React from 'react'
import { Redirect } from 'react-router-dom'
import { WrapperQuery } from '@/component/ApolloQuery'
import { allUser } from '@/gql/user.graphql'

const Home = () => {
  return WrapperQuery(allUser)(data =>
      data.user.map(({ name, id }) => (
          <div key={id}>
            <p>{id}: {name}</p>
          </div>
      )))
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
