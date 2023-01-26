import { useEffect, useState, useCallback } from 'react'
// ** MUI Imports

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CustomFooterTotalExpenseComponent from 'src/@core/layouts/components/extra-components/CustomFooterTotalExpenseComponent'
import CardHeader from '@mui/material/CardHeader'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { Link } from '@mui/material'
import YesNoDialog from 'src/views/custom/manager/deleteDialog'
import { DataGrid } from '@mui/x-data-grid'

import CustomServerSideToolbar from 'src/@core/layouts/components/extra-components/CustomServerSideToolbar'
// ** Third Party Imports// 


import { subDays } from 'date-fns'
//** Icon Imports
import Icon from 'src/@core/components/icon'
import { axiosInstance } from 'src/lib/axios'

const perDayOctane = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [startDateRange, setStartDateRange] = useState(subDays(new Date(), 30))
  const [endDateRange, setEndDateRange] = useState(new Date())
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState('DESC')
  const [pageSize, setPageSize] = useState(100)
  const [rows, setRows] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [sortColumn, setSortColumn] = useState('date')
  const [totalExpense, setTotalExpense] = useState(0)
  const [id,setId] = useState(-1)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const columns = [
    {
      flex: 1,
      minWidth: 100,
      field: 'id',
      headerName: 'ID',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.id}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 100,
      field: 'date',
      headerName: 'Date',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.date}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 90,
      field: 'time',
      headerName: 'Time',
      type:'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.time}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 160,
      field: 'reason',
      headerName: 'Reasons',
      type:'string',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.reason}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 120,
      field: 'amount',
      headerName: 'amount',
      type:'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.amount}
        </Typography>
      )
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='Delete Invoice'>
              <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={() =>{ setDeleteDialogOpen(true); setId(params.row.id)}}>
                <Icon icon='tabler:trash' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit'>
              <IconButton
                size='small'
                component={Link}
                sx={{ color: 'text.secondary' }}
                href={`../edit/${params.row.id}`}
              >
                <Icon icon='tabler:edit' />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    }
  ]
  function loadServerRows(currentPage, data) {
    return data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  }

  const handleSortModel = newModel => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)
      fetchTableData(newModel[0].sort, startDateRange, endDateRange, searchValue, newModel[0].field)
    } else {
      setSort('DESC')
      setSortColumn('date')
    }
  }

  const fetchTableData = useCallback(
    async (sort, start, end, q, column) => {
      await axiosInstance
        .get('/expense', {
          params: {
            q,
            sort,
            column,
            start: (start),
            end: !end ? (new Date()) : (end)
          }
        })
        .then(res => {
          setTotal(res.data.data.length)
          setRows(loadServerRows(page, res.data.data))
          setIsLoading(false)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize]
  )
  useEffect(() => {
    fetchTableData(sort, startDateRange, endDateRange, searchValue, sortColumn)
  }, [fetchTableData, searchValue, sort, sortColumn, endDateRange,isDeleted])

  // ** Hook
  const handleOnChangeRange = dates => {
    const [start, end] = dates
    
    setStartDateRange(start)
    setEndDateRange(end)
  }
  const handleSearch = value => {
    setSearchValue(value)
    fetchTableData(sort, startDateRange, endDateRange, value, sortColumn)
  }
  return (
    <>
      <Card>
      <YesNoDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} id={id} deleteUrl={"/expense"}  setIsDeleted={setIsDeleted}/>
        <CardHeader title='Expenses' />
        {isLoading ? (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <div style={{ height: 500, overflow: 'auto' }}>
            <DataGrid
              autoHeight
              pagination
              rows={rows}
              rowCount={total}
              columns={columns}
              pageSize={pageSize}
              getRowId={row => row.date}
              sortingMode='server'
              paginationMode='server'
              onSortModelChange={handleSortModel}
              rowsPerPageOptions={[100]}
              onPageChange={newPage => setPage(newPage)}
              components={{ Toolbar: CustomServerSideToolbar, Footer: CustomFooterTotalExpenseComponent }}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              componentsProps={{
                baseButton: {
                  variant: 'outlined'
                },
                toolbar: {
                  value: searchValue,
                  clearSearch: () => handleSearch(''),
                  onChange: event => handleSearch(event.target.value),
                  startDateRange: startDateRange,
                  endDateRange: endDateRange,
                  handleOnChangeRange: handleOnChangeRange
                },
                footer: {totalExpense}

              }}
              onStateChange={(state) => {
                const visibleRows = state.filter.visibleRowsLookup;
                let visibleItems = [];
                for (const [id, value] of Object.entries(visibleRows)) {
                  if (value === true) {
                    visibleItems.push(id);
                  }
                }
                const res = rows.filter((item) => visibleItems.includes(item.date));
                console.log(res)
                const totalExpense = res
                  .map((item) => item.amount)
                  .reduce((a, b) =>    parseFloat((a) || "0")+parseFloat((b) || "0"), 0);
                console.log(totalExpense)
                setTotalExpense(totalExpense)

              }}
            />
          </div>
        )}
      </Card>
    </>
  )
}

export default perDayOctane
