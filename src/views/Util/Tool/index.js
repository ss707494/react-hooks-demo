import React from 'react'
import styled from 'styled-components'
import { gql } from 'apollo-boost'
import { queryGraphql } from '@/component/ApolloQuery'
import { TextField, Button, Paper } from "@material-ui/core";

const S = {}
S.Tool = styled(Paper)`
  padding: 20px;
`

export const Tool = props => {
  const [pass, setPass] = React.useState('')
  const [
    getData, data,
  ] = queryGraphql(gql`
    query ($pass: String!) {
      getPassCode(pass: $pass)
    }
  `)
  React.useEffect(() => {
  }, [])

  return (
      <S.Tool>
        <section>
          <TextField
              label="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
          >
          </TextField>
          <span>{data.getPassCode}</span>
          <Button onClick={() => getData({ pass })}
          >GET</Button>
        </section>
      </S.Tool>
  )
}

export default Tool
