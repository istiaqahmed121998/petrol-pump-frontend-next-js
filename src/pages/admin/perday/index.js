import { useEffect, useState, useCallback } from 'react'
// ** MUI Imports

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

import CardHeader from '@mui/material/CardHeader'
import CircularProgress from '@mui/material/CircularProgress'
import moment from 'moment'
import { DataGrid } from '@mui/x-data-grid'

import CustomServerSideToolbar from 'src/@core/layouts/components/extra-components/CustomServerSideToolbar'
import CustomFooterTotalPerDayComponent from 'src/@core/layouts/components/extra-components/CustomFooterTotalPerDayComponent'

import { subDays } from 'date-fns'

import { axiosInstance } from 'src/lib/axios'

const perDayFuel = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [startDateRange, setStartDateRange] = useState(subDays(new Date(), 30))
  const [endDateRange, setEndDateRange] = useState(new Date())
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState('DESC')
  const [pageSize, setPageSize] = useState(100)
  const [rows, setRows] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [sortColumn, setSortColumn] = useState('fuel_date')
  const [totalInvest, setTotalInvest] = useState(0)
  const [totalEarn, setTotalEarn] = useState(0)
  const [totalProfit, setTotalProfit] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)
  const columns = [
    {
      flex: 1,
      minWidth: 110,
      field: 'fuel_date',
      headerName: 'Date',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.fuel_date}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 130,
      field: 'earn_diesel',
      headerName: 'Diesel Earn',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.earn_diesel}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 130,
      field: 'invest_diesel',
      headerName: 'Diesel Invest',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.invest_diesel}
        </Typography>
      )
    },

    {
      flex: 1,
      minWidth: 130,
      field: 'profit_diesel',
      headerName: 'Diesel Profit',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.profit_diesel}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 140,
      field: 'earn_octane',
      headerName: 'Octane Earn',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.earn_octane}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 140,
      field: 'invest_octane',
      headerName: 'Octane Invest',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.invest_octane}
        </Typography>
      )
    },

    {
      flex: 1,
      minWidth: 140,
      field: 'profit_octane',
      headerName: 'Octane Profit',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.profit_octane}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 140,
      field: 'earn_mobil',
      headerName: 'Mobil Earn',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.earn_mobil}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 140,
      field: 'invest_mobil',
      headerName: 'Mobil Invest',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.invest_mobil}
        </Typography>
      )
    },

    {
      flex: 1,
      minWidth: 140,
      field: 'profit_mobil',
      headerName: 'Mobil Profit',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.profit_mobil}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 120,
      field: 'earn',
      headerName: 'earn',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.earn}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 120,
      field: 'invest',
      headerName: 'invest',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.invest}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 120,
      field: 'fuel_profit',
      headerName: 'Fuel Profit',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {Number((params.row.earn - params.row.invest).toFixed(4))}
        </Typography>
      )
    },

    {
      flex: 1,
      minWidth: 120,
      field: 'expense',
      headerName: 'expense',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.expense}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 120,
      field: 'profit',
      headerName: 'Net Profit',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.profit}
        </Typography>
      )
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
        .get('/details/peyday', {
          params: {
            q,
            sort,
            column,
            start: moment(start).format('YYYY-MM-DD'),
            end: !end ? moment(new Date()).format('YYYY-MM-DD') : moment(end).format('YYYY-MM-DD')
          }
        })
        .then(res => {
          console.log(res.data)
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
  }, [fetchTableData, searchValue, sort, sortColumn, endDateRange])

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
        <CardHeader title='Per Day Sells' />
        {isLoading ? (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <div style={{ height: 700, overflow: 'auto' }}>
            <DataGrid
              autoHeight
              pagination
              rows={rows}
              rowCount={total}
              columns={columns}
              pageSize={pageSize}
              getRowId={row => row.fuel_date}
              sortingMode='server'
              paginationMode='server'
              onSortModelChange={handleSortModel}
              rowsPerPageOptions={[100]}
              onPageChange={newPage => setPage(newPage)}
              components={{ Toolbar: CustomServerSideToolbar, Footer: CustomFooterTotalPerDayComponent }}
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
                footer: { totalEarn, totalExpense, totalInvest, totalProfit }
              }}
              onStateChange={state => {
                const visibleRows = state.filter.visibleRowsLookup
                let visibleItems = []
                for (const [id, value] of Object.entries(visibleRows)) {
                  if (value === true) {
                    visibleItems.push(id)
                  }
                }
                const res = rows.filter(item => visibleItems.includes(item.fuel_date))
                console.log(res)
                const totalInvest = res
                  .map(item => item.invest)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                const totalEarn = res
                  .map(item => item.earn)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                const totalExpense = res
                  .map(item => item.expense)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                const totalProfit = res
                  .map(item => item.profit)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                setTotalEarn(totalEarn)
                setTotalProfit(totalProfit)
                setTotalExpense(totalExpense)
                setTotalInvest(totalInvest)
              }}
            />
          </div>
        )}
      </Card>
    </>
  )
}

export default perDayFuel
