import React, { useEffect } from 'react'
import get from 'lodash/get'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import { queryGraphql, mutationGraphql } from '@/component/ApolloQuery'
import Button from "@material-ui/core/es/Button/Button"
import { useCustomContext } from '@/common/context'
import { EditDialog, initState } from '@/component/EditDialog'
import { SearchForm, initState as initSearchFormState } from '@/component/SearchForm'
import { Pagination, initState as initPageData } from '@/component/Pagination'
import { S } from './style'
import { TableSortLabel } from "@material-ui/core";

export const BasicTable = (option) => p => {
  const [con] = useCustomContext()
  const [getData, { [option.dataListName]: dataList = [], total = 0 }] = queryGraphql(option.queryListGql)
  // const [getAllData] = queryGraphql(option.allDataGql)
  const [deleteOne] = mutationGraphql(option.deleteGql)
  const searchFormState = initSearchFormState()
  const pageState = initPageData()
  const [sortData, setSortData] = React.useState({})
  const getListData = (param = {}) => getData({
    data: {
      ...searchFormState.formData,
      sortData,
      ...pageState.pageData,
      ...param,
    },
  })
  useEffect(() => {
    getListData()
  }, [])
  const editDialogState = initState()
  const { editClick } = editDialogState
  const editType = option.editType
  const columns = option.columns
  const handleSearch = () => {
    pageState.setPageData({
      page: 0,
    })
    getListData({
      page: 0,
    })
  }
  return <>
    <S.TableSection>
      <S.Header>
        <Button variant="outlined"
                onClick={editClick({})}
        >add</Button>
        {/*<Button variant="outlined"*/}
        {/*        onClick={() => getAllData()}*/}
        {/*>export</Button>*/}
        {/*<Button variant="outlined"*/}
        {/*        onClick={() => getAllData()}*/}
        {/*>import</Button>*/}
        {
          option.formColumn && <>
            <SearchForm
                formColumn={option.formColumn}
                onSubmit={handleSearch}
                {...searchFormState} />
            <Button onClick={handleSearch}>search</Button>
          </>
        }
      </S.Header>
      <Table>
        <TableHead>
          <TableRow>
            {
              columns.map(({ name, sort }) => <TableCell
                  key={`tableHead${name}`}
              >
                {!sort ? (name)
                    : (
                        <Tooltip
                            title="sort"
                        >
                          <TableSortLabel
                              active={true}
                              direction={sortData[name] === -1 ? 'desc' : 'asc'}
                              onClick={() => {
                                const sortDataTpl = {
                                  ...sortData,
                                  [name]: -(sortData[name] || 1)
                                }
                                setSortData(sortDataTpl)
                                getListData({
                                  sortData: sortDataTpl
                                })
                              }}
                          >
                            {name}
                          </TableSortLabel>
                        </Tooltip>
                    )
                }
              </TableCell>)
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
                                  getListData()
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
      <Pagination
          {...pageState}
          count={~~total}
          refresh={getListData}
      />
    </S.TableSection>
    <EditDialog refetch={getListData}
                editType={editType}
                updateSchema={option.updateGql}
                dealEditData={option.dealEditData}
                {...editDialogState}
    />
  </>
}

export default BasicTable
