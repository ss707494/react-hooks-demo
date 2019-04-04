import React, { useState } from 'react'
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import FormControl from '@material-ui/core/FormControl'
import { mutationGraphql } from '@/component/ApolloQuery'
import { getFormItem } from '@/component/Form'

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

