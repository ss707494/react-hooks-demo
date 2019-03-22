import { BasicTable } from '@/component/BasicTable'
import { allDict, updateDict, deleteOneDict } from '@/gql/dict.graphql'

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
  name: 'code'
}, {
  name: 'type'
}, {
  name: 'id'
}, {
  name: 'date',
  formatData: data => !data ? '' : new Date(data).toString()
}, {
  name: 'message'
}]

export const DictList = BasicTable({
  queryListGql: allDict,
  deleteGql: deleteOneDict,
  updateGql: updateDict,
  dataListName: 'allDict',
  editType,
  columns,
})

export default DictList
