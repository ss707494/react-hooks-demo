import React, { useEffect } from 'react'
import { Link } from '@material-ui/core'
import { S } from './style'
import { allNote } from '@/gql/note.graphql'
import { queryGraphql } from '@/component/ApolloQuery'

export const Calligraphy = props => {
  const { match } = props
  const [getNotes, notes] = queryGraphql(allNote)

  useEffect(() => {
    getNotes({
      data: { bookId: match.params.id }
    })
  }, [])
  return (
      <S.NoteList>
        <main>
          {
            notes.allNote && notes.allNote.map(e => (
                <Link
                    key={`allnote${e.id}`}
                    href={`/calligraphy/noteDetail/${e.id}`}>{e.title}</Link>
            ))
          }
        </main>
      </S.NoteList>
  )
}

export default Calligraphy
