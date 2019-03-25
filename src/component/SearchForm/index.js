import React, { useState } from 'react'
import TextField from "@material-ui/core/TextField"
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns'

export const initState = () => {
  const [formData, setFormData] = useState({})
  return {
    setFormData, formData,
  }
}

export const SearchForm = (
    {
      setFormData,
      formData,
      formColumn,
      onSubmit= () => {},
    }) => {
  return (
      <form onSubmit={onSubmit}>
        {
          formColumn.map(item => {
            const [name] = item
            return (
                <FormControl key={`SearchForm${name}`}>
                  {
                    getFormItem({
                      name,
                      formData,
                      setFormData,
                    })
                  }
                </FormControl>
            );
          })
        }
      </form>
  )
}

const getFormItem = (option) => {
  const { name, type, formData, setFormData, options = [] } = option

  if (type === 'Select') {
    return <>
      <InputLabel shrink={formData[name]}>{name}</InputLabel>
      <Select
          value={formData[name]}
          onChange={e => setFormData({
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
          value={formData[name]}
          onChange={e => {
            return setFormData({
              [name]: e
            })
          }}
      />
    </MuiPickersUtilsProvider>
  }
  return <TextField
      label={name}
      value={formData[name] || ''}
      multiline={option.multiline}
      rows={option.rows}
      onChange={e => setFormData({
        [name]: e.target.value
      })}
  />

}
