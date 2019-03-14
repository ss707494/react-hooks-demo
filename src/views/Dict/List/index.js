import React from 'react'
import { Mutation } from 'react-apollo'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { WrapperQuery } from '@/component/ApolloQuery'
import Button from "@material-ui/core/es/Button/Button"
import Dialog from "@material-ui/core/es/Dialog/Dialog"
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle"
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions"
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent"
import TextField from "@material-ui/core/es/TextField/TextField"
import { updateDict, allDict } from '@/gql/dict.graphql'
import { useCustomContext } from '@/common/context'
import { S } from './style'

const { useState } = React

export const UserList = p => {
  const [{ showMessage }] = useCustomContext()
  const [showEdit, setShowEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const setEdit = (data) => setEditData({ ...editData, ...data })
  const editClick = (item) => () => {
    setEditData(item)
    setShowEdit(true)
  }
  const test = (item) => async () => {
    // console.log(item)
    showMessage({ message: '请重新登录' })
    // const res = await client.query({
    //   query: oneUser,
    //   variables: {
    //     id: item.id
    //   }
    // })
    // console.log(res)
  }
  const editType = ['name', 'code', 'type', 'message']
  const columns = [{
    name: 'name'
  }, {
    name: 'code'
  }, {
    name: 'type'
  }, {
    name: 'id'
  }, {
    name: 'message'
  }]
  return WrapperQuery(allDict)((data, refetch) => <>
    <S.TableSection>
      <header>
        <Button variant="outlined"
                onClick={editClick({})}
        >add</Button>
      </header>
      <Table>
        <TableHead>
          <TableRow>
            {
              columns.map(({ name }) => <TableCell key={`tableHead${name}`}>{name}</TableCell>)
            }
            <TableCell>action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.allDict.map((item) => (
                <TableRow key={item.id}>
                  {
                    columns.map(({ name }) => <TableCell key={`tableBody${name}`}>{item[name]}</TableCell>)
                  }
                  <TableCell>
                    <Button variant="outlined"
                            onClick={editClick(item)}
                    >edit</Button>
                    <Button variant="outlined"
                            onClick={test(item)}
                    >test</Button>
                  </TableCell>
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </S.TableSection>
    <Dialog open={showEdit}
            onClose={() => setShowEdit(false)}
    >
      <DialogTitle>EDIT</DialogTitle>
      <DialogContent>
        {
          editType.map(name => (
              <TextField key={`edit${name}`}
                         label={name}
                         fullWidth
                         value={editData[name] || ''}
                         onChange={e => setEdit({
                           [name]: e.target.value
                         })}
              />
          ))
        }
      </DialogContent>
      <DialogActions>
        <Mutation mutation={updateDict}
                  onCompleted={() => {
                    setShowEdit(false)
                    refetch()
                  }}
        >
          {(updateUser, { loading }) => (
              <Button onClick={() => {
                updateUser({
                  variables: {
                    dict: editData
                  }
                })
              }}
              >{loading ? 'loading' : 'save'}</Button>
          )}
        </Mutation>
        <Button onClick={() => setShowEdit(false)}
        >cancel</Button>
      </DialogActions>
    </Dialog>
  </>)
}

export default UserList
