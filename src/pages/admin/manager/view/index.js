// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

import { DataGrid } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'
import { axiosInstance } from '../../../../lib/axios'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import { Link } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import YesNoDialog from 'src/views/custom/manager/deleteDialog'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


const ManagerView = () => {
  const columns = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 80,
      headerName: 'ID'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'manager_name',
      headerName: 'Name'
    },
    {
      flex: 0.25,
      minWidth: 230,
      field: 'phone_number',
      headerName: 'Phone'
    },
    {
      flex: 0.25,
      minWidth: 230,
      field: 'shift',
      headerName: 'Shift'
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
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [id,setId] = useState(-1)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const listOfManagers = async () => {
    await axiosInstance
      .get('/manager')
      .then(res => {
        setRows(res.data.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    listOfManagers()
  }, [isDeleted])
  return (
    <>
      {isLoading ? (
        <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <CircularProgress sx={{ mb: 4 }} />
          <Typography>Loading...</Typography>
        </Box>
      ) : (
        <Card>
          <YesNoDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} id={id} deleteUrl={"/manager"}  setIsDeleted={setIsDeleted}/>
          <CardHeader title='Basic' />
          <Box sx={{ height: 500 }}>
            <DataGrid columns={columns} rows={rows} rowsPerPageOptions={[7, 10, 25, 50, 100]} />
          </Box>
        </Card>
      )}
    </>
  )
}

export default ManagerView
