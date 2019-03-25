import React from 'react'

import { format } from 'date-fns'
import { BasicTable } from '@/component/BasicTable'
import { queryGraphql } from '@/component/ApolloQuery'
import { omit } from '@/common/utils'
import { allNote, updateNote, deleteOneNote} from '@/gql/note.graphql'
import { allBook } from '@/gql/book.graphql'


export const DictList = p => {
  const [getAllBook, allBookList] = queryGraphql(allBook)
  React.useEffect(() => {
    getAllBook()
  }, [])
  const options = !allBookList.allBook ? [] : allBookList.allBook.map(e => ([e.id, e.name]))
  const editType = [{
    name: 'name'
  }, {
    name: 'title'
  }, {
    name: 'code'
  }, {
    name: 'type'
  }, {
    name: 'bookId',
    type: 'Select',
    options,
  }, {
    name: 'content',
    multiline: true,
    rows: 4,
  }, {
    name: 'message'
  }]
  const columns = [{
    name: 'name'
  }, {
    name: 'title'
  }, {
    name: 'code'
  }, {
    name: 'type'
  }, {
    name: 'bookName',
    path: 'book.name'
  }, {
    name: 'id'
  }, {
    name: 'message'
  }, {
    name: 'createDate',
    formatData: data => format(new Date(data), 'yyyy/MM/dd HH:mm')
  }]
  const formColumn = [[
      'title'
  ]]
  return BasicTable({
    queryListGql: allNote,
    deleteGql: deleteOneNote,
    updateGql: updateNote,
    dataListName: 'allNote',
    editType,
    columns,
    dealEditData: data => omit(data, 'book'),
    formColumn,
  })(p);
}

export default DictList
