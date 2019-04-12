import styled from 'styled-components'

export const S = {}

S.NoteList = styled('div')`
 > main {
    display: grid;
    grid-template-columns: repeat(auto-fill, 80px);
    grid-gap: 6px;
    text-align: center;
 }
`
