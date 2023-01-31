import { useEffect, useState, useCallback } from 'react'
// ** MUI Imports

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CustomFooterTotalComponent from 'src/@core/layouts/components/extra-components/CustomFooterTotalComponent'
import CardHeader from '@mui/material/CardHeader'
import CircularProgress from '@mui/material/CircularProgress'

import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import CustomServerSideToolbar from 'src/@core/layouts/components/extra-components/CustomServerSideToolbar'
// ** Third Party Imports
import 'cleave.js/dist/addons/cleave-phone.us'

import { addDays, subDays } from 'date-fns'

import { axiosInstance } from 'src/lib/axios'

const perDayDiesel = () => {
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
  const [totalInvest, setTotalInvest] = useState(0)
  const [totalEarn, setTotalEarn] = useState(0)
  const [totalProfit, setTotalProfit] = useState(0)
  const [totalSellingQuantity, setTotalSellingQuantity] = useState(0)
  const columns = [
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
      field: 'perday_sell_quantity',
      headerName: 'Sell Quantity',
      type:'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.perday_sell_quantity}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 110,
      field: 'perday_invest',
      headerName: 'Investment',
      type:'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.perday_invest}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 120,
      field: 'perday_earn',
      headerName: 'Earn',
      type:'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.perday_earn}
        </Typography>
      )
    },
    {
      flex: 1,
      field: 'profit',
      minWidth: 150,
      headerName: 'Profit',
      type:'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: params.row.perday_profit >= 0 ? 'green' : 'red' }}>
          {params.row.perday_profit}
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
        .get('/diesel/perday', {
          params: {
            q,
            sort,
            column,
            start: moment(start).format('YYYY-MM-DD'),
            end: !end ? moment(new Date()).format('YYYY-MM-DD') : moment(end).format('YYYY-MM-DD')
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
        <CardHeader title='Per Day Diesel Sells' />
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
              components={{ Toolbar: CustomServerSideToolbar, Footer: CustomFooterTotalComponent }}
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
                footer: {totalInvest,totalEarn,totalProfit,totalSellingQuantity}

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
                const totalInvestment = res
                  .map((item) => item.perday_invest)
                  .reduce((a, b) =>    parseFloat((a) || "0")+parseFloat((b) || "0"), 0);
                const totalEarn = res
                  .map((item) => item.perday_earn)
                  .reduce((a, b) =>    parseFloat((a) || "0")+parseFloat((b) || "0"), 0);
                  const totalSellingQuantity = res
                  .map((item) => item.perday_sell_quantity)
                  .reduce((a, b) =>    parseFloat((a) || "0")+parseFloat((b) || "0"), 0);
                setTotalInvest(totalInvestment)
                setTotalEarn(totalEarn)
                setTotalProfit(totalEarn-totalInvestment)
                setTotalSellingQuantity(totalSellingQuantity)

              }}
            />
          </div>
        )}
      </Card>
    </>
  )
}

export default perDayDiesel
