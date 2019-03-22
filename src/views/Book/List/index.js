import { format } from 'date-fns'
import { BasicTable } from '@/component/BasicTable'
import { allBook, updateBook, deleteOneBook } from '@/gql/book.graphql'

const editType = [{
  name: 'name'
}, {
  name: 'message'
}]
const columns = [{
  name: 'name'
}, {
  name: 'id'
}, {
  name: 'message'
}, {
  name: 'createDate',
  formatData: data => format(new Date(data), 'yyyy/MM/dd HH:mm')
}]

export const List = BasicTable({
  queryListGql: allBook,
  deleteGql: deleteOneBook,
  updateGql: updateBook,
  dataListName: 'allBook',
  editType,
  columns,
})

export default List
