// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { axiosInstance } from 'src/lib/axios'

const yesNoDialog = props => {
  // ** Props
  const { open, setOpen, id, deleteUrl,setIsDeleted } = props

  // ** States
  const handleClose = () => {setOpen(false);setIsDeleted(false)}


  const handleConfirmation = value => {
    if(value==="yes" && id>=1){
      axiosInstance.delete(`${deleteUrl}/${id}`).then((res)=>{
        if(res.status==200){
          setIsDeleted(true)
          toast.success("Deleted Successfully")
        }
      })
      .catch(err=>{console.log(err)})
    }
    handleClose()
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              '& svg': { mb: 8, color: 'warning.main' }
            }}
          >
            <Icon icon='tabler:alert-circle' fontSize='5.5rem' />
            <Typography variant='h4' sx={{ mb: 5, color: 'text.secondary' }}>
              Are you sure?
            </Typography>
            <Typography>You won't be able to revert!</Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleConfirmation('yes')}>
            Yes, Delete it!
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default yesNoDialog
