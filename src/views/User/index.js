import { Redirect } from 'react-router-dom'
import { UserList } from './List'

export default [{
  props: {
    exact: true,
    from: "/user",
    to: "/user/list",
  },
  Type: Redirect
},{
  props: {
    path: '/user/list',
    component: UserList,
  },
}]

