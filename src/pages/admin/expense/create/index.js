import { forwardRef, useEffect } from 'react'
import { axiosInstance } from '../../../../lib/axios'
// ** MUI Imports
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { yupResolver } from '@hookform/resolvers/yup'
import Cleave from 'cleave.js/react'
import DatePicker from 'react-datepicker'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import CardActions from '@mui/material/CardActions'
import { Container } from '@mui/material'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Imports
import toast from 'react-hot-toast'

import moment from 'moment'
import * as yup from 'yup'

const PickersComponent = forwardRef(({ ...props }, ref) => {
  // ** Props
  const { label, readOnly } = props
  return (
    <TextField inputRef={ref} {...props} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />
  )
})
const schema = yup.object().shape({
  date: yup.date().required(),
  time: yup.string().required(),
  reason: yup.string().required(),
  amount: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('can not be empty')
})
const ExpenseCreate = () => {
  const router = useRouter()
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const defaultValues = {
    reason: '',
    amount: '',
    date: null,
    time: ''
  }

  // ** Hooks
  const {
    control,
    handleSubmit,

    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    let { date, time } = data
    date = moment(date).format('YYYY-MM-DD')
    time = moment(new Date(time)).format('LT')
    data.time = time
    try {
      const res = await axiosInstance.post('/expense', data)
      if (res.status === 201) {
        toast.success('Successfully Added Expense')
        setTimeout(() => {
          router.push('/admin/expense/view')
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
    <Container
      style={{
        height: '100vh'
      }}
    >
      <Card
        style={{
          height: '80%'
        }}
      >
        <CardHeader title='Create Expense' />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    1. Expense Timing
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <Controller
                      name='date'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <DatePickerWrapper>
                          <DatePicker
                            todayButton='Today'
                            selected={value}
                            id='picker-date-today-btn'
                            popperPlacement={popperPlacement}
                            customInput={<PickersComponent label='Date' />}
                            onChange={onChange}
                          />
                        </DatePickerWrapper>
                      )}
                    />
                    {errors.date && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-date'>
                        {errors.date.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <Controller
                      name='time'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <DatePickerWrapper>
                          <DatePicker
                            showTimeSelect
                            selected={value}
                            timeIntervals={15}
                            showTimeSelectOnly
                            dateFormat='h:mm aa'
                            id='time-only-picker'
                            popperPlacement={popperPlacement}
                            onChange={onChange}
                            customInput={<PickersComponent label='Time Only' />}
                          />
                        </DatePickerWrapper>
                      )}
                    />
                    {errors.time && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-time'>
                        {errors.time.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    2. Expense Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor='credit-card' sx={{ mb: 2, fontSize: '.75rem', maxWidth: 'max-content' }}>
                    Reason
                  </InputLabel>
                  <FormControl fullWidth>
                    <Controller
                      name='reason'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          multiline
                          value={value}
                          onChange={onChange}
                          rows={2}
                          aria-describedby='validation-schema-reason'
                          id='textarea-outlined-controlled'
                        />
                      )}
                    />
                    {errors.reason && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-new_stock'>
                        {errors.reason.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InputLabel htmlFor='amount' sx={{ mb: 2, fontSize: '.75rem', maxWidth: 'max-content' }}>
                    Amount
                  </InputLabel>
                  <FormControl fullWidth>
                    <Controller
                      name='amount'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CleaveWrapper>
                          <Cleave
                            id='numeral'
                            placeholder=''
                            value={value}
                            onChange={onChange}
                            aria-describedby='validation-schema-amount'
                            options={{
                              numeral: true,
                              numeralDecimalMark: '.',
                              delimiter: '',
                              numeralDecimalScale: 4,
                              numeralPositiveOnly: true
                            }}
                          />
                        </CleaveWrapper>
                      )}
                    />
                    {errors.amount && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-prev_stock'>
                        {errors.amount.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider sx={{ m: '0 !important' }} />
            <CardActions>
              <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                Submit
              </Button>
              <Button type='reset' size='large' color='secondary' variant='outlined'>
                Reset
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default ExpenseCreate
