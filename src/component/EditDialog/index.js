import React, { useState } from 'react'
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import TextField from "@material-ui/core/TextField"
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns'
import { mutationGraphql } from '@/component/ApolloQuery'

export const initState = () => {
  const [showEdit, setShowEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const editClick = (item) => () => {
    setEditData(item)
    setShowEdit(true)
  }
  return {
    editClick,
    showEdit, setEditData, editData, setShowEdit
  }
}

export const EditDialog = (
    {
      typeName = 'data',
      updateSchema,
      editType,
      refetch,
      showEdit, setEditData,
      editData, setShowEdit,
      dealEditData = data => data
    }) => {
  const setEdit = (data) => setEditData({ ...editData, ...data })
  const [update, , loading] = mutationGraphql(updateSchema)

  return (
      <Dialog open={showEdit}
              onClose={() => setShowEdit(false)}
      >
        <DialogTitle>EDIT</DialogTitle>
        <DialogContent>
          <form>
            {
              editType.map(item => {
                const { name } = item
                return (
                    <FormControl fullWidth
                                 key={`edit${name}`}>
                      {
                        getFormItem({
                          ...item,
                          editData,
                          setEdit,
                          setEditData,
                        })
                      }
                    </FormControl>
                );
              })
            }
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={async () => {
            await update({
              [typeName]: dealEditData(editData)
            })
            setShowEdit(false)
            refetch()
          }}
          >{loading ? 'loading' : 'save'}</Button>
          <Button onClick={() => setShowEdit(false)}
          >cancel</Button>
        </DialogActions>
      </Dialog>
  )
}

const getFormItem = (option) => {
  const { name, type, editData, setEdit, options = [] } = option

  if (type === 'Select') {
    return <>
      <InputLabel shrink={editData[name]}>{name}</InputLabel>
      <Select
          value={editData[name]}
          onChange={e => setEdit({
            [name]: e.target.value
          })}
      >
        {
          options.map(([value, text]) => <MenuItem key={value}
                                                   value={value}>{text}</MenuItem>)
        }
      </Select>
    </>
  }
  if (type === 'DatePicker') {
    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
          label={name}
          value={editData[name]}
          onChange={e => {
            return setEdit({
              [name]: e
            })
          }}
      />
    </MuiPickersUtilsProvider>
  }
  return <TextField
      label={name}
      value={editData[name] || ''}
      multiline={option.multiline}
      rows={option.rows}
      onChange={e => setEdit({
        [name]: e.target.value
      })}
  />

}
