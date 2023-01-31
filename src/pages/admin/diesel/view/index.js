import { useEffect, useState, useCallback } from 'react'
// ** MUI Imports

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Link } from '@mui/material'
import Card from '@mui/material/Card'
import moment from 'moment'
import CardHeader from '@mui/material/CardHeader'
import CircularProgress from '@mui/material/CircularProgress'

import { DataGrid } from '@mui/x-data-grid'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

import CustomServerSideToolbar from 'src/@core/layouts/components/extra-components/CustomServerSideToolbar'
import YesNoDialog from 'src/views/custom/manager/deleteDialog'
// ** Third Party Imports
import 'cleave.js/dist/addons/cleave-phone.us'

import {addDays,subDays} from 'date-fns'


import { axiosInstance } from 'src/lib/axios'

const viewDiesel = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [startDateRange, setStartDateRange] = useState(subDays(new Date(), 30))
  const [endDateRange, setEndDateRange] = useState(new Date())
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState('DESC')
  const [pageSize, setPageSize] = useState(31)
  const [rows, setRows] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [sortColumn, setSortColumn] = useState('date')
  const [isDeleted, setIsDeleted] = useState(false)
  const [id,setId] = useState(-1)
  const columns =  [
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
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.time}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 110,
      field: 'manager',
      headerName: 'Manager',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.Manager.manager_name}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 120,
      field: 'shift',
      headerName: 'Shift',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.shift}
        </Typography>
      )
    },
    {
      flex: 1,
      field: 'prev_stock',
      minWidth: 150,
      headerName: 'Previous Stock',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.prev_stock}
        </Typography>
      )
    },
    {
      flex: 1,
      field: 'new_stock',
      minWidth: 150,
      headerName: 'New stock',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.new_stock}
        </Typography>
      )
    },
  
    {
      flex: 1,
      field: 'total_stock',
      minWidth: 150,
      headerName: 'Total stock',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.new_stock}
        </Typography>
      )
    },
    {
      flex: 1,
      field: 'sell_quantity',
      minWidth: 150,
      headerName: 'Sell Quantity',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.sell_quantity}
        </Typography>
      )
    },
    {
      flex: 1,
      field: 'invest',
      minWidth: 150,
      headerName: 'Investment',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.invest}
        </Typography>
      )
    },
    {
      flex: 1,
      field: 'earn',
      minWidth: 150,
      headerName: 'Earn',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.earn}
        </Typography>
      )
    },
    {
      flex: 1,
      field: 'profit',
      minWidth: 150,
      headerName: 'Profit',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: params.row.profit >= 0 ? 'green' : 'red' }}>
          {params.row.profit}
        </Typography>
      )
    },
    
    {
      flex: 1,
      minWidth: 110,
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='Delete Invoice'>
              <IconButton
                size='small'
                sx={{ color: 'text.secondary' }}
                onClick={() => {
                  setDeleteDialogOpen(true)
                  setId(params.row.id)
                }}
              >
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
      fetchTableData(newModel[0].sort,startDateRange,endDateRange, searchValue, newModel[0].field)
    } else {
      setSort('DESC')
      setSortColumn('date')
    }
  }

  const fetchTableData = useCallback(
    async (sort,start,end, q, column) => {
      await axiosInstance
        .get('/diesel', {
          params: {
            q,
            sort,
            column,
            start: moment(start).format('YYYY-MM-DD'),
            end: !end ? moment(new Date()).format('YYYY-MM-DD') : moment(end).format('YYYY-MM-DD')
          }
        })
        .then(res => {
          setTotal(res.data.total)
          setRows(loadServerRows(page, res.data.data))
          setIsLoading(false)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize]
  )
  useEffect(() => {
    fetchTableData(sort,startDateRange,endDateRange, searchValue, sortColumn)
  }, [fetchTableData, searchValue, sort, sortColumn,isDeleted,endDateRange])


  // ** Hook
  const handleOnChangeRange = dates => {
    const [start, end] = dates
    setStartDateRange(start)
    setEndDateRange(end)
  }
  const handleSearch = value => {
    setSearchValue(value)
    fetchTableData(sort,startDateRange,endDateRange, value, sortColumn)
  }
  return (
    <>
      <Card>
        <CardHeader title='Shift Sells' />
        <YesNoDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} id={id} deleteUrl={"/diesel"}  setIsDeleted={setIsDeleted}/>
        {isLoading ? (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <div style={{ height: 700, overflow: "auto" }}>
          
          <DataGrid
            autoHeight
            pagination
            rows={rows}
            rowCount={total}
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            sortingMode='server'
            paginationMode='server'
            onSortModelChange={handleSortModel}
            rowsPerPageOptions={[ 50,100]}
            onPageChange={newPage => setPage(newPage)}
            components={{ Toolbar: CustomServerSideToolbar }}
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
              }
            }}
          />
          </div>
        )}
      </Card>
    </>
  )
}

export default viewDiesel
