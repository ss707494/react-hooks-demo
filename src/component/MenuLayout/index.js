import React from 'react'
import MenuList from "@material-ui/core/es/MenuList/MenuList";
import { logout } from '@/common/login'
import { S } from './style'
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Paper from "@material-ui/core/es/Paper/Paper";

const menuData = [
  ['user'],
  ['dict'],
  ['book'],
  ['note'],
  ['testHooks'],
]

export const MenuLayout = ({history, children}) => {

  return (
      <S.MenuLayout>
        <Paper elevation={3}>
          <MenuList>
            {
              menuData.map(([e]) => <MenuItem key={`menuitem${e}`} component={S.Link} to={`/${e}`} >
                {e}
              </MenuItem>)
            }
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
