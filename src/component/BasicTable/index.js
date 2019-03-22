import React, { useEffect } from 'react'
import get from 'lodash/get'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { queryGraphql, mutationGraphql } from '@/component/ApolloQuery'
import Button from "@material-ui/core/es/Button/Button"
import { useCustomContext } from '@/common/context'
import { EditDialog, initState } from '@/component/EditDialog'
import { S } from './style'

export const BasicTable = (option) => p => {
  const [con] = useCustomContext()
  const [getData, { [option.dataListName]: dataList = [] }] = queryGraphql(option.queryListGql)
  const [deleteOne] = mutationGraphql(option.deleteGql)
  useEffect(() => {
    getData({
      data: {
        title: '第一章'
      }
    })
  }, [])
  const editDialogState = initState()
  const { editClick } = editDialogState
  const editType = option.editType
  const columns = option.columns
  return <>
    <S.TableSection>
      <header>
        <Button variant="outlined"
                onClick={editClick({})}
        >add</Button>
      </header>
      <Table>
        <TableHead>
          <TableRow>
            {
              columns.map(({ name }) => <TableCell key={`tableHead${name}`}>{name}</TableCell>)
            }
            <TableCell>action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            dataList.map((item) => (
                <TableRow key={item.id}>
                  {
                    columns.map(({ name, path, formatData = data => data }) =>
                        <TableCell key={`tableBody${name}`}>{formatData(get(item, (path ? path : name)))}</TableCell>)
                  }
                  <TableCell>
                    <Button variant="outlined"
                            onClick={editClick(item)}
                    >edit</Button>
                    <Button variant="outlined"
                            onClick={() => {
                              con.showConfirm({
                                message: 'Are you sure',
                                callBack: async res => {
                                  if (!res) return
                                  await deleteOne({
                                    id: item.id
                                  })
                                  getData()
                                }
                              });
                            }}
                    >del</Button>
                  </TableCell>
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </S.TableSection>
    <EditDialog refetch={getData}
                editType={editType}
                updateSchema={option.updateGql}
                dealEditData={option.dealEditData}
                {...editDialogState}
    />
  </>
}

export default BasicTable
