import React from 'react'
import { S } from './style'
import AppBar from '@material-ui/core/AppBar'
import { ArrowBack, Settings } from '@material-ui/icons'
import { IconButton } from "@material-ui/core";

export const AppbarLayout = (props) => {
  const { history } = props

  return (
      <S.AppbarLayout>
        <AppBar>
          <IconButton
              onClick={() => {history.push('/home')}}
              color="inherit"><Settings/></IconButton>
          <S.Back
              onClick={() => {history.go(-1)}}
              color="inherit"><ArrowBack/></S.Back>
        </AppBar>
        <main>
          {props.children}
        </main>
      </S.AppbarLayout>
  )
}

export default {}
