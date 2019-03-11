import React from 'react'
import MenuList from "@material-ui/core/es/MenuList/MenuList";
import { logout } from '@/common/login'
import { S } from './style'
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Paper from "@material-ui/core/es/Paper/Paper";

export const MenuLayout = ({history, children}) => {

  return (
      <S.MenuLayout>
        <Paper elevation={3}>
          <MenuList>
            <MenuItem component={S.Link} to="/user">
              user
            </MenuItem>
            <MenuItem component={S.Link} to="/testHooks">
              testHooks
            </MenuItem>
            <MenuItem onClick={() => {
              logout()
              history.push('/login')
            }}>
              logout
            </MenuItem>
          </MenuList>
        </Paper>
        <S.MenuMain>
          {children}
        </S.MenuMain>
      </S.MenuLayout>
  )
}

export default {}
