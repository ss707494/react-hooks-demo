import React from 'react'
import TextField from "@material-ui/core/TextField"
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns'

export const getFormItem = (option) => {
  const { name, type, editData, setEditData, options = [] } = option
  const setEdit = (data) => setEditData({ ...editData, ...data })

  if (type === 'Select') {
    return <>
      <InputLabel shrink={!!editData[name]}>{name}</InputLabel>
      <Select
          value={editData[name] || ''}
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
