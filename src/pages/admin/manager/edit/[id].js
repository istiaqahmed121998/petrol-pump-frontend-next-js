// ** React Imports
import { useEffect, useState } from 'react'
import { axiosInstance } from '../../../../lib/axios'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'

import { useRouter } from 'next/router'
// ** Hooks

const ManagerEdit = () => {
  const router = useRouter()
  const { id } = router.query
  const [isLoading, setIsLoading] = useState(true)
	const [manager,setManager]=useState("")
  const {
    control,
    handleSubmit,
    formState: { errors },
		setValue
  } = useForm()

  useEffect(() => {
		if(!id) {
      return;
    }
    const manager = async () => {
      const check = `/manager/${id}`
      console.log(check)
      await axiosInstance
        .get(check)
        .then(res => {

					console.log(res.data.data.manager_name)
					setValue("manager_name",res.data.data.manager_name)
					setValue("phone_number",res.data.data.phone_number)
					setValue("shift",res.data.data.shift)
					setIsLoading(false)
        })
        .catch(err => {})
    }
    manager()
  }, [id])

  const onSubmit = async data => {
    try {
      const res = await axiosInstance.put(`/manager/${id}`, data)
      if (res.status === 200) {
        toast.success('Successfully Updated Manager')
        setTimeout(() => {
          router.push('/admin/manager/view')
        }, 1000)
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      console.log(error.config)
    }
  }
  return (
    <>
      {isLoading ? (
        <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <CircularProgress sx={{ mb: 4 }} />
          <Typography>Loading...</Typography>
        </Box>
      ) : (
        <Card>
          <CardHeader title='Create Manager' />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='manager_name'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Manager Name'
                          onChange={onChange}
                          placeholder='Komola'
                          error={Boolean(errors.manager_name)}
                          aria-describedby='validation-basic-manager-name'
                        />
                      )}
                    />
                    {errors.manager_name && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-manager-name'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='phone_number'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Phone'
                          onChange={onChange}
                          placeholder='+88017------'
                          error={Boolean(errors.phone)}
                          aria-describedby='validation-basic-phone'
                        />
                      )}
                    />
                    {errors.phone && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-phone'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='shift'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Shift'
                          onChange={onChange}
                          placeholder='-to-'
                          error={Boolean(errors.shift)}
                          aria-describedby='validation-basic-shift'
                        />
                      )}
                    />
                    {errors.shift && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-shift'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button size='large' type='submit' variant='contained'>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default ManagerEdit
