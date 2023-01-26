// ** MUI Imports

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Link } from '@mui/material'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
const dataTableColumns = props=>{
    console.log(props)
    [
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
                      props.setDeleteDialogOpen(true)
                      props.setId(params.row.id)
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
} 
export default dataTableColumns
