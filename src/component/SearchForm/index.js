import React, { useState } from 'react'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import { getFormItem } from '@/component/Form'

const S = {
  FormControl: styled(FormControl)`
    &&& {
      min-width: 120px;
      margin-left: 20px;
    }
`
}

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
      <form onSubmit={e => {
        e.preventDefault()
        onSubmit()
      }}>
        {
          formColumn.map(item => {
            const [name, type, options] = item
            return (
                <S.FormControl key={`SearchForm${name}`}>
                  {
                    getFormItem({
                      name,
                      type,
                      options,
                      editData: formData,
                      setEditData: setFormData,
                    })
                  }
                </S.FormControl>
            );
          })
        }
      </form>
  )
}
