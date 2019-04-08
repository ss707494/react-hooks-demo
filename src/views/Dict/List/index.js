import { BasicTable } from '@/component/BasicTable'
import { format } from 'date-fns'
import { allDict, updateDict, deleteOneDict, allDataDict } from '@/gql/dict.graphql'

const editType = [{
  name: 'name'
}, {
  name: 'code'
}, {
  name: 'type'
}, {
  name: 'message'
}, {
  name: 'date',
  type: 'DatePicker'
}]
const columns = [{
  name: 'name'
}, {
  name: 'code',
  sort: true,
}, {
  name: 'type'
}, {
  name: 'id'
}, {
  name: 'date',
  formatData: data => format(new Date(data), 'yyyy/MM/dd HH:mm')
}, {
  name: 'message'
}]

export const DictList = BasicTable({
  allDataGql: allDataDict,
  queryListGql: allDict,
  deleteGql: deleteOneDict,
  updateGql: updateDict,
  dataListName: 'allDict',
  editType,
  columns,
})

export default DictList
