import React, { useEffect } from 'react'
import { S } from './style'
import { detailImg } from '@/gql/note.graphql'
import { queryGraphql } from '@/component/ApolloQuery'

export const NoteDetail = props => {
  const { match } = props
  const [getNote, note] = queryGraphql(detailImg)

  useEffect(() => {
    getNote({ id: match.params.id })
  }, [])
  return (
      <S.NoteDetail>
        {
          note.detailImg &&
          <img src={note.detailImg.contentImg.src}
               alt=""/>
        }
      </S.NoteDetail>
  )
}

export default NoteDetail
