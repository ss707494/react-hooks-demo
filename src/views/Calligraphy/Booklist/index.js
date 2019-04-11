import React, { useEffect } from 'react'
import { Link } from '@material-ui/core'
import { queryGraphql } from '@/component/ApolloQuery'
import { allBook } from '@/gql/book.graphql'
import { S } from './style'

export const Calligraphy = props => {
  const [getBooks, books] = queryGraphql(allBook)

  useEffect(() => {
    getBooks()
  }, [])
  return (
      <S.Books>
        {
          books.allBook && books.allBook.map(e => (
              <section key={`books${e.id}`}>
                <Link href={`/calligraphy/notelist/${e.id}`}>{e.name}</Link>
              </section>
          ))
        }
      </S.Books>
  )
}

export default Calligraphy
