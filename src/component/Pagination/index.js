import React, { useState, useEffect } from 'react'
import { TablePagination } from '@material-ui/core'

export const initState = () => {
  const [pageData, setPageData] = useState({
    page: 0,
    rowsPerPage: 10,
  })
  return {
    pageData, setPageData,
  }
}

export const Pagination = (
    {
      pageData,
      setPageData,
      count,
      refresh = () => {},
    }) => {
  const setData = data => setPageData({
    ...pageData,
    ...data
  })
  useEffect(() => {
    refresh()
  }, [pageData])

  return (
      <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={count}
          rowsPerPage={pageData.rowsPerPage || 10}
          page={pageData.page || 0}
          onChangePage={(e, page) => {
            setData({
              page,
            })
          }}
          onChangeRowsPerPage={e => {
            setData({
              rowsPerPage: e.target.value
            })
          }}
      />
  )
}
