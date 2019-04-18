import styled from 'styled-components'
import Link from 'react-router-dom/es/Link'

export const S = {}
S.MenuLayout = styled('div')`
  height: 100vh;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-column-gap: 10px;
  > nav {
    display: flex;
    flex-direction: column;
  }
`

S.MenuMain = styled('div')`
 //margin: 10px;
 //padding: 10px;
`

S.Link = styled(Link)`
  display: block;
`
