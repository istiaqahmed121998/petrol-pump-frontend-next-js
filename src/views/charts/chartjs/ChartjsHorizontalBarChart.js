// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'

const ChartjsHorizontalBarChart = props => {
  // ** Props
  const { year,earns,profits,invests,info,danger, success, labelColor, borderColor, legendColor } = props

  const options = {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    elements: {
      bar: {
        borderRadius: {
          topRight: 1,
          bottomRight: 1
        }
      }
    },
    layout: {
      padding: { top: -4 }
    },
    scales: {
      x: {
        min: 0,
        grid: {
          drawTicks: false,
          color: borderColor
        },
        ticks: { color: labelColor }
      },
      y: {
        grid: {
          display: false,
          color: borderColor
        },
        ticks: { color: labelColor }
      }
    },
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: { color: legendColor }
      }
    }
  }

  const data = {
    labels: ['JAN', 'FEB', 'MAR ', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [
      {
        maxBarThickness: 15,
        label: 'INVEST + EXPENSE',
        backgroundColor: danger,
        borderColor: 'transparent',
        data: invests
      },
      {
        maxBarThickness: 15,
        backgroundColor: info,
        label: 'EARN',
        borderColor: 'transparent',
        data: earns
      },
      {
        maxBarThickness: 15,
        backgroundColor: success,
        label: 'PROFIT',
        borderColor: 'transparent',
        data: profits
      }
    ]
  }

  return (
    <Card>
      <CardHeader title={'Balance sheet of '+year.getFullYear()} />
      <CardContent>
        <Bar data={data} height={400} options={options} />
      </CardContent>
    </Card>
  )
}

export default ChartjsHorizontalBarChart
