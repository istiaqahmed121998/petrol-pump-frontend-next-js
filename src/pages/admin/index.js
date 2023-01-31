// ** MUI Import
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import AnalyticsEarningReports from 'src/views/dashboards/analytics/AnalyticsEarningReports'
import ChartjsHorizontalBarChart from 'src/views/charts/chartjs/ChartjsHorizontalBarChart'
// ** Custom Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import moment from 'moment'
import { useEffect, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'
import { subYears, subMonths } from 'date-fns'
// ** Spinner Import
import Spinner from 'src/@core/components/spinner'
import 'chart.js/auto'
// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'
import { axiosInstance } from 'src/lib/axios'

export const getHomeRoute = () => {
  return '/admin'
}

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [year, setYear] = useState(subYears(new Date(), 1))
  const [month, setMonth] = useState(subMonths(new Date(), 1))
  const [totalInvests, setTotalInvests] = useState([])
  const [totalEarns, setTotalEarns] = useState([])
  const [totalProfits, setTotalProfits] = useState([])

  const [totalFuelInvest,setTotalFuelInvest]=useState(0)
  const [totalFuelExpense,setTotalFuelExpense]=useState(0)
  const [totalFuelEarn,setTotalFuelEarn]=useState(0)
  const [totalFuelProfit,setTotalFuelProfit]=useState(0)

  // Vars
  const horizontalBarInfo = '#26c6da'
  const warningColorShade = '#ffbd1f'
  const successColorShade = '#00FF00'
  const dangerColorShade = '#FF0000'
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary
  const details = async () => {
    await axiosInstance
      .get('/details/peyday', {
        params: {
          start: moment(new Date(month.getFullYear(), month.getMonth(), 1)).format('YYYY-MM-DD'),
          end: moment(new Date(month.getFullYear(), month.getMonth() + 1, 0)).format('YYYY-MM-DD')
        }
      })
      .then(res => {
        const data = res.data.data
        const totalFuelInvest = data
          .map(a => parseFloat(a.invest_diesel) + parseFloat(a.invest_octane) + parseFloat(a.invest_mobil))
          .reduce((a, b) => a + b, 0)
        const totalExpense = data.map(a => parseFloat(a.expense)).reduce((a, b) => a + b, 0)
        const totalEarn = data
          .map(a => parseFloat(a.earn_diesel) + parseFloat(a.earn_octane) + parseFloat(a.earn_mobil))
          .reduce((a, b) => a + b, 0)
        const totalProfit = data
          .map(a => parseFloat(a.profit_diesel) + parseFloat(a.profit_octane) + parseFloat(a.profit_mobil) - a.expense)
          .reduce((a, b) => a + b, 0)

          setTotalFuelInvest(Number((totalFuelInvest).toFixed(4)))
          setTotalFuelExpense(Number((totalExpense).toFixed(4)))
          setTotalFuelEarn(Number((totalEarn).toFixed(4)))
          setTotalFuelProfit(Number((totalProfit).toFixed(4)))
      })
  }

  const allDetails = async () => {
    await details()
    await axiosInstance
      .get('/details/permonth', {
        params: {
          year: year.getFullYear()
        }
      })
      .then(res => {
        // setTotal(res.data.data.length)
        // setRows(loadServerRows(page, res.data.data))
        const data = res.data.data
        const totalInvest = data.map(
          a =>
            parseFloat(a.invest_diesel) + parseFloat(a.invest_octane) + parseFloat(a.invest_mobil) + parseFloat(a.exp)
        )
        const totalEarn = data.map(
          a => parseFloat(a.earn_diesel) + parseFloat(a.earn_octane) + parseFloat(a.earn_mobil)
        )
        const totalProfit = data.map(
          a =>
            parseFloat(a.profit_diesel) + parseFloat(a.profit_octane) + parseFloat(a.profit_mobil) - parseFloat(a.exp)
        )
        setTotalInvests(totalInvest)
        setTotalEarns(totalEarn)
        setTotalProfits(totalProfit)
        setIsLoading(false)
      })
  }

 
  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (auth.user) {
      allDetails()   
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoading ? (
        <Spinner sx={{ height: '100%' }} />
      ) : (
        <>
          <ApexChartWrapper>
            <KeenSliderWrapper>
              <Grid container spacing={6}>
                <Grid item xs={12} md={12}>
                  <AnalyticsEarningReports totalFuelInvest={totalFuelInvest} totalFuelExpense={totalFuelExpense} totalFuelEarn={totalFuelEarn} totalFuelProfit={totalFuelProfit} month={month}/>
                </Grid>
                <Grid item xs={12} md={12}>
                  <ChartjsHorizontalBarChart
                    labelColor={labelColor}
                    info={horizontalBarInfo}
                    borderColor={borderColor}
                    legendColor={legendColor}
                    warning={warningColorShade}
                    danger={dangerColorShade}
                    success={successColorShade}
                    earns={totalEarns}
                    invests={totalInvests}
                    profits={totalProfits}
                    year={year}
                  />
                </Grid>
              </Grid>
            </KeenSliderWrapper>
          </ApexChartWrapper>
        </>
      )}
    </>
  )
}

export default Home
