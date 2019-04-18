import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { gql } from 'apollo-boost'
import { FormControl, TextField, Button } from '@material-ui/core'
import { showMessage } from '@/component/Message'
import { client } from '@/common/apolloCLient'

const S = {
  ChangePassword: styled('div')`
    > header {
      > section {
        display: flex;
        > aside {
          width: 80px;
        }
      }
    }
  `,
  Submit: styled(Button)`
    &&& {
      display: block;
    }
  `
}

export const ChangePassword = props => {
  const { match: { params: { id } } } = props

  const [user, setUser] = useState({})
  useEffect(() => {
    (async () => {
      const res = await client.query({
        query: gql`
            query ($id: String!) {
                oneUser(id: $id) {
                    name
                    id
                    auth
                    message
                }
            }
        `,
        variables: { id },
      })
      setUser(res.data.oneUser)
    })()
  }, [])

  const [formData, setFormData] = useState({})
  const changePass = async () => {
    if (!formData.newPass) {
      showMessage({ message: '请输入password' })
      return
    }
    const res = await client.mutate({
      mutation: gql`
        mutation ($data: ChangePassword!) {
          changePassword(data: $data)
        }
      `,
      variables: {
        data: {
          id: user.id,
          ...formData,
        },
      },
    })
    showMessage({ message: res.data.changePassword })
  }

  return (
      <S.ChangePassword>
        <header>
          <section>
            <aside>name:</aside>
            <main>{user.name}</main>
          </section>
          <section>
            <aside>auth:</aside>
            <main>{user.auth}</main>
          </section>
        </header>
        <form>
          <FormControl
          >
            <TextField
                label={'verification'}
                value={formData.verification || ''}
                onChange={e => setFormData({
                  ...formData,
                  verification: e.target.value
                })}
            />
            <TextField
                label={'newPass'}
                value={formData.newPass || ''}
                onChange={e => setFormData({
                  ...formData,
                  newPass: e.target.value
                })}
            />
          </FormControl>
          <S.Submit onClick={changePass}>submit</S.Submit>
        </form>
      </S.ChangePassword>
  )
}

export default ChangePassword
