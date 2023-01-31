import { useEffect, useState, useCallback } from 'react'
// ** MUI Imports

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

import CardHeader from '@mui/material/CardHeader'
import CircularProgress from '@mui/material/CircularProgress'

import { DataGrid } from '@mui/x-data-grid'

import CustomYearlyServerSideToolbar from 'src/@core/layouts/components/extra-components/CustomYearlyServerSideToolbar'
import CustomFooterTotalYearlyComponent from 'src/@core/layouts/components/extra-components/CustomFooterTotalYearlyComponent'

import { subYears, subDays } from 'date-fns'

import { axiosInstance } from 'src/lib/axios'

const perDayFuel = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(100)
  const [rows, setRows] = useState([])
  const [year, setYear] = useState(subYears(new Date(), 1))
  const [totalDieselQuantity,setTotalDieselQuantity]=useState(0)
  const [totalDieselEarn,setTotalDieselEarn]=useState(0)
  const [totalDieselInvest,setTotalDieselInvest]=useState(0)
  const [totalDieselProfit,setTotalDieselProfit]=useState(0)

  const [totalOctaneQuantity,setTotalOctaneQuantity]=useState(0)
  const [totalOctaneEarn,setTotalOctaneEarn]=useState(0)
  const [totalOctaneInvest,setTotalOctaneInvest]=useState(0)
  const [totalOctaneProfit,setTotalOctaneProfit]=useState(0)


  const [totalMobilQuantity,setTotalMobilQuantity]=useState(0)
  const [totalMobilEarn,setTotalMobilEarn]=useState(0)
  const [totalMobilInvest,setTotalMobilInvest]=useState(0)
  const [totalMobilProfit,setTotalMobilProfit]=useState(0)

  const [totalEarn,setTotalEarn]=useState(0)
  const [totalInvest,setTotalInvest]=useState(0)
  const [totalExpense,setTotalExpense]=useState(0)
  const [totalFuelProfit,setTotalFuelProfit]=useState(0)
  const [totalNetProfit,setTotalNetProfit]=useState(0)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const columns = [
    {
      flex: 1,
      minWidth: 110,
      field: 'month',
      headerName: 'Month',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {months[parseInt(params.row.month) - 1]}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 130,
      field: 'sell_quantity_diesel',
      headerName: 'Diesel Quantity',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.sell_quantity_diesel}
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
      minWidth: 130,
      field: 'sell_quantity_octane',
      headerName: 'Octane Quantity',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.sell_quantity_octane}
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
      field: 'sell_quantity_mobil',
      headerName: 'Mobil Quantity',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.sell_quantity_mobil}
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
      headerName: 'Earn',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {Number(
            (
              parseFloat(params.row.earn_diesel || '0') +
              parseFloat(params.row.earn_octane || '0') +
              parseFloat(params.row.earn_mobil || '0')
            ).toFixed(4)
          )}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 120,
      field: 'invest',
      headerName: 'Invest',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {Number(
            (
              parseFloat(params.row.invest_diesel || '0') +
              parseFloat(params.row.invest_octane || '0') +
              parseFloat(params.row.invest_mobil || '0')
            ).toFixed(4)
          )}
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
          {Number(
            (
              parseFloat(params.row.profit_diesel || '0') +
              parseFloat(params.row.profit_octane || '0') +
              parseFloat(params.row.profit_mobil || '0')
            ).toFixed(4)
          )}
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
          {params.row.exp}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 120,
      field: 'net_profit',
      headerName: 'Net Profit',
      type: 'number',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {Number(
            (
              parseFloat(params.row.profit_diesel || '0') +
              parseFloat(params.row.profit_octane || '0') +
              parseFloat(params.row.profit_mobil || '0') -
              parseFloat(params.row.exp || '0')
            ).toFixed(4)
          )}
        </Typography>
      )
    }
  ]
  function loadServerRows(currentPage, data) {
    return data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  }

  const fetchTableData = useCallback(
    async year => {
      await axiosInstance
        .get('/details/permonth', {
          params: {
            year: year.getFullYear()
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
    fetchTableData(year)
  }, [fetchTableData, setYear, year])

  const handleOnChangeYear = year => {
    setYear(year)
  }
  return (
    <>
      <Card>
        <CardHeader title='Per Year Sells' />
        {isLoading ? (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <div style={{ height: 900, overflow: 'auto' }}>
            <DataGrid
              autoHeight
              rows={rows}
              rowCount={total}
              columns={columns}
              pageSize={pageSize}
              getRowId={row => row.month}
              sortingMode='server'
              onPageChange={newPage => setPage(newPage)}
              components={{ Toolbar: CustomYearlyServerSideToolbar, Footer: CustomFooterTotalYearlyComponent }}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              componentsProps={{
                baseButton: {
                  variant: 'outlined'
                },
                toolbar: {
                  year: year,
                  handleOnChangeYear: handleOnChangeYear
                },
                footer: { totalDieselQuantity,totalDieselEarn,totalDieselInvest,totalDieselProfit, totalOctaneQuantity,totalOctaneEarn,totalOctaneInvest,totalOctaneProfit,totalMobilQuantity,totalMobilEarn,totalMobilInvest,totalMobilProfit,totalEarn, totalInvest, totalFuelProfit, totalExpense,totalNetProfit }
              }}
              onStateChange={state => {
                const visibleRows = state.filter.visibleRowsLookup
                let visibleItems = []
                for (const [id, value] of Object.entries(visibleRows)) {
                  if (value === true) {
                    visibleItems.push(parseInt(id))
                  }
                }
                const res = rows.filter(item => visibleItems.includes(item.month))
                console.log(res)
                const totalDieselQuantity = res
                  .map(item => item.sell_quantity_diesel)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                  setTotalDieselQuantity(totalDieselQuantity)
                const totalDieselEarn = res
                  .map(item => item.earn_diesel)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                  setTotalDieselEarn(totalDieselEarn)
                const totalDieselInvest = res
                  .map(item => item.invest_diesel)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                  setTotalDieselInvest(totalDieselInvest)

                const totalDieselProfit = res
                  .map(item => item.profit_diesel)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                  setTotalDieselProfit(totalDieselProfit)


                  const totalOctaneQuantity = res
                  .map(item => item.sell_quantity_octane)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                  setTotalOctaneQuantity(totalOctaneQuantity)
                const totalOctaneEarn = res
                  .map(item => item.earn_octane)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                  setTotalOctaneEarn(totalOctaneEarn)
                const totalOctaneInvest = res
                  .map(item => item.invest_octane)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                  setTotalOctaneInvest(totalOctaneInvest)
                const totalOctaneProfit = res
                  .map(item => item.profit_octane)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                  setTotalOctaneProfit(totalOctaneProfit)

                const totalMobilQuantity = res
                  .map(item => item.sell_quantity_mobil)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                  setTotalMobilQuantity(totalMobilQuantity)
                const totalMobilEarn = res
                  .map(item => item.earn_mobil)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                  setTotalMobilEarn(totalMobilEarn)
                const totalMobilInvest = res
                  .map(item => item.invest_mobil)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                  setTotalMobilInvest(totalMobilInvest)
                const totalMobilProfit = res
                  .map(item => item.profit_mobil)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                  setTotalMobilProfit(totalMobilProfit)

                  const totalExpense = res
                  .map(item => item.exp)
                  .reduce((a, b) => parseFloat(a || '0') + parseFloat(b || '0'), 0)
                  setTotalExpense(totalExpense)

                setTotalEarn(totalDieselEarn+totalOctaneEarn+totalMobilEarn)
                setTotalInvest(totalDieselInvest+totalOctaneInvest+totalMobilInvest)
                setTotalFuelProfit(totalDieselProfit+totalOctaneProfit+totalMobilProfit)
                setTotalNetProfit((totalDieselProfit+totalOctaneProfit+totalMobilProfit)-totalExpense)

              }}
            />
          </div>
        )}
      </Card>
    </>
  )
}

export default perDayFuel
