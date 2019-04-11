import styled from 'styled-components'
import { IconButton } from "@material-ui/core";

export const S = {}

S.AppbarLayout = styled('div')`
  > header {
    flex-direction: row;
  }
  > main {
    padding: 60px 20px 20px;
  } 
`

S.Back = styled(IconButton)`
&&& {
 margin-left: auto;
}
`

