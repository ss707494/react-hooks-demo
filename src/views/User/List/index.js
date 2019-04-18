import { BasicTable } from '@/component/BasicTable'
import { updateUser, allUser, deleteOneUser } from '@/gql/user.graphql'

const editType = [{
  name: 'name'
}, {
  name: 'auth'
}, {
  name: 'message'
}]
const columns = [{
  name: 'name'
}, {
  name: 'auth'
}, {
  name: 'id'
}, {
  name: 'message'
}]

export const UserList = BasicTable({
  queryListGql: allUser,
  deleteGql: deleteOneUser,
  updateGql: updateUser,
  dataListName: 'allUser',
  editType,
  columns,
  btns: [{
    name: 'password',
    handleClick: (item, { history }) => {
      history.push(`/user/changePassword/${item.id}`)
    }
  }],
})

export default UserList
