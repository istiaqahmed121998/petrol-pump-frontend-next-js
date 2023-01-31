// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import LinearProgress from '@mui/material/LinearProgress'
import moment from 'moment'
// ** Custom Components Imports
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const series = [{ data: [37, 76, 65, 41, 99, 53, 70] }]

const data = [
  {
    progress: 64,
    stats: '$545.69',
    title: 'Earnings',
    avatarIcon: 'tabler:currency-dollar'
  },
  {
    progress: 59,
    title: 'Profit',
    stats: '$256.34',
    avatarColor: 'info',
    progressColor: 'info',
    avatarIcon: 'tabler:chart-pie-2'
  },
  {
    progress: 22,
    stats: '$74.19',
    title: 'Expense',
    avatarColor: 'error',
    progressColor: 'error',
    avatarIcon: 'tabler:brand-paypal'
  }
]

const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    paddingTop: '0 !important'
  }
}))

const AnalyticsEarningReports = props => {
  // ** Hook
  const theme = useTheme()
  const { month, totalFuelInvest, totalFuelExpense, totalFuelEarn, totalFuelProfit } = props
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '42%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    colors: [
      hexToRGBA(theme.palette.primary.main, 0.16),
      hexToRGBA(theme.palette.primary.main, 0.16),
      hexToRGBA(theme.palette.primary.main, 0.16),
      hexToRGBA(theme.palette.primary.main, 0.16),
      hexToRGBA(theme.palette.primary.main, 1),
      hexToRGBA(theme.palette.primary.main, 0.16),
      hexToRGBA(theme.palette.primary.main, 0.16)
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      show: false,
      padding: {
        top: -28,
        left: -9,
        right: -10,
        bottom: -12
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      labels: {
        style: {
          fontSize: '14px',
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily
        }
      }
    },
    yaxis: { show: false }
  }

  return (
    <Card>
      <CardHeader
        sx={{ pb: 0 }}
        title='Earning Reports '
        subheader={'Earnings Overview '+moment(new Date(month.getFullYear(), month.getMonth(), 1)).format('LL')+ ' - '+moment(new Date(month.getFullYear(), month.getMonth() + 1, 0)).format('LL')}
        subheaderTypographyProps={{ sx: { mt: '0 !important' } }}
        action={
          <OptionsMenu
            options={['Last Week', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
          />
        }
      />
      <CardContent>
        <Box sx={{ mt: 6, borderRadius: 1, p: theme.spacing(4, 5), border: `1px solid ${theme.palette.divider}` }}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={3}>
              <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  // color={item.avatarColor}
                  sx={{ mr: 2, width: 26, height: 26 }}
                >
                  <Icon fontSize='1.125rem' icon='tabler:currency-dollar' />
                </CustomAvatar>
                <Typography sx={{ fontWeight: 500 }}>FUEL INVEST</Typography>
              </Box>
              <Typography variant='h5' sx={{ mb: 2.5 }}>
               {totalFuelInvest} ৳
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={'error'}
                  sx={{ mr: 2, width: 26, height: 26 }}
                >
                  <Icon fontSize='1.125rem' icon='tabler:currency-dollar' />
                </CustomAvatar>
                <Typography sx={{ fontWeight: 500 }}>Expense</Typography>
              </Box>
              <Typography variant='h5' sx={{ mb: 2.5 }}>
               {totalFuelExpense} ৳
              </Typography>

            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={'info'}
                  sx={{ mr: 2, width: 26, height: 26 }}
                >
                  <Icon fontSize='1.125rem' icon='tabler:currency-dollar' />
                </CustomAvatar>
                <Typography sx={{ fontWeight: 500 }}>FUEL Earn</Typography>
              </Box>
              <Typography variant='h5' sx={{ mb: 2.5 }}>
               {totalFuelEarn} ৳
              </Typography>

            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={"success"}
                  sx={{ mr: 2, width: 26, height: 26 }}
                >
                  <Icon fontSize='1.125rem' icon='tabler:currency-dollar' />
                </CustomAvatar>
                <Typography sx={{ fontWeight: 500 }}>Net Profit</Typography>
              </Box>
              <Typography variant='h5' sx={{ mb: 2.5 }}>
               {totalFuelProfit} ৳
              </Typography>

            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AnalyticsEarningReports
