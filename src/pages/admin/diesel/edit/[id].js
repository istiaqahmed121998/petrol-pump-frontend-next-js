import { forwardRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CircularProgress from '@mui/material/CircularProgress'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'
import Divider from '@mui/material/Divider'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CardActions from '@mui/material/CardActions'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Imports
import Cleave from 'cleave.js/react'
import moment from 'moment'
import 'cleave.js/dist/addons/cleave-phone.us'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import { axiosInstance } from 'src/lib/axios'

const defaultValues = {
  manager: '',
  date: null,
  prev_stock: '',
  new_stock: '',
  total_stock: '',
  sell_quantity: '',
  sell_rate: '',
  buy_rate: '',
  invest: 0,
  earn: 0,
  profit: 0
}
// ** React Imports

const PickersComponent = forwardRef(({ ...props }, ref) => {
  // ** Props
  const { label, readOnly } = props

  return (
    <TextField inputRef={ref} {...props} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />
  )
})

const schema = yup.object().shape({
  manager: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required(),
  date: yup.date().required(),
  prev_stock: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('can not be empty'),
  new_stock: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('can not be empty'),
  total_stock: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('can not be empty'),
  sell_quantity: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('can not be empty'),
  buy_rate: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('can not be empty'),
  sell_rate: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('can not be empty')
})

const editDiesel = () => {
  const router = useRouter()
  const { id } = router.query
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const [managers, setManagers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // ** Hook

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const values = watch()
  useEffect(() => {
    if (!router.isReady) {
      return
    }
    const managers = async () => {
      await axiosInstance
        .get('/manager')
        .then(res => {
          setManagers(res.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
    const diesel = async () => {
      await axiosInstance
        .get(`/diesel/get/${id}`)
        .then(res => {
          setValue('prev_stock', res.data.data.prev_stock)
          setValue('new_stock', res.data.data.new_stock)
          setValue('total_stock', res.data.data.total_stock)
          setValue('date', new Date(res.data.data.date))
          setValue('manager', res.data.data.manager)
          setValue('sell_quantity', res.data.data.sell_quantity)
          setValue('buy_rate', res.data.data.buy_rate)
          setValue('sell_rate', res.data.data.sell_rate)
          managers()
          setIsLoading(false)
        })
        .catch(err => {
          console.log(err)
        })
    }

    diesel()
  }, [router.isReady])

  useEffect(() => {
    const calculate = () => {
      const invest = Number((parseFloat(values.sell_quantity || '0') * parseFloat(values.buy_rate || '0')).toFixed(4))
      const earn = Number((parseFloat(values.sell_quantity || '0') * parseFloat(values.sell_rate || '0')).toFixed(4))
      const profit = Number((earn - invest).toFixed(4))
      if (invest !== values.invest) {
        setValue('invest', invest)
      }
      if (earn !== values.earn) {
        setValue('earn', earn)
      }
      if (profit !== values.profit) {
        setValue('profit', profit)
      }
    }
    calculate()
  }, [values, setValue])

  const onSubmit = async data => {
    let { date } = data
    date = moment(date).format('YYYY-MM-DD')
    data.date = date
    axiosInstance
      .put(`/diesel/${id}`, data)
      .then(res => {
        toast.success('Successfully Updated')
        setTimeout(() => {
          router.push('/admin/diesel/view')
        }, 1000)
      })
      .catch(err => {
        toast.error('Something went wrong')
      })
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
          <CardHeader title='Edit Diesel' />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      1.Date & Shift Info
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControl fullWidth>
                      <Controller
                        name='manager'
                        control={control}
                        rules={{ required: true }}
                        defaultValue={''}
                        render={({ field: { value, onChange } }) => (
                          <FormControl fullWidth>
                            <InputLabel id='form-layouts-separator-select-label'>Manager</InputLabel>
                            <Select
                              label='Manager'
                              value={value}
                              id='form-layouts-separator-select'
                              labelId='form-layouts-separator-select-label'
                              onChange={onChange}
                            >
                              {managers.map(function (item, i) {
                                return (
                                  <MenuItem key={i} value={item.id}>
                                    {item.manager_name}
                                  </MenuItem>
                                )
                              })}
                            </Select>
                          </FormControl>
                        )}
                      />

                      {errors.manager && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-manager'>
                          {errors.manager.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
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

                  <Grid item xs={12}>
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      2. Stock Details
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor='prev_stock' sx={{ mb: 2, fontSize: '.75rem', maxWidth: 'max-content' }}>
                      Previous Stock
                    </InputLabel>
                    <FormControl fullWidth>
                      <Controller
                        name='prev_stock'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CleaveWrapper>
                            <Cleave
                              id='numeral'
                              placeholder=''
                              value={value}
                              onChange={onChange}
                              aria-describedby='validation-schema-prev_stock'
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
                      {errors.prev_stock && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-prev_stock'>
                          {errors.prev_stock.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor='credit-card' sx={{ mb: 2, fontSize: '.75rem', maxWidth: 'max-content' }}>
                      New Stock
                    </InputLabel>
                    <FormControl fullWidth>
                      <Controller
                        name='new_stock'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CleaveWrapper>
                            <Cleave
                              id='numeral'
                              placeholder=''
                              value={value}
                              onChange={onChange}
                              aria-describedby='validation-schema-new_stock'
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
                      {errors.new_stock && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-new_stock'>
                          {errors.new_stock.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor='credit-card' sx={{ mb: 2, fontSize: '.75rem', maxWidth: 'max-content' }}>
                      Total Stock
                    </InputLabel>
                    <FormControl fullWidth>
                      <Controller
                        name='total_stock'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CleaveWrapper>
                            <Cleave
                              id='numeral'
                              placeholder=''
                              value={value}
                              onChange={onChange}
                              aria-describedby='validation-schema-total_stock'
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
                      {errors.total_stock && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-prev_stock'>
                          {errors.total_stock.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ mb: '0 !important' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      3. Purchase & Sell Info
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor='sell_quantity' sx={{ mb: 2, fontSize: '.75rem', maxWidth: 'max-content' }}>
                      Sell Quantity
                    </InputLabel>
                    <FormControl fullWidth>
                      <Controller
                        name='sell_quantity'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CleaveWrapper>
                            <Cleave
                              id='numeral'
                              placeholder=''
                              value={value}
                              onChange={onChange}
                              aria-describedby='validation-schema-sell_quantity'
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
                      {errors.sell_quantity && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-sell_quantity'>
                          {errors.sell_quantity.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor='buy_rate' sx={{ mb: 2, fontSize: '.75rem', maxWidth: 'max-content' }}>
                      Buying Rate
                    </InputLabel>
                    <FormControl fullWidth>
                      <Controller
                        name='buy_rate'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CleaveWrapper>
                            <Cleave
                              id='numeral'
                              placeholder=''
                              value={value}
                              onChange={onChange}
                              aria-describedby='validation-schema-buy_rate'
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
                      {errors.buy_rate && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-buy_rate'>
                          {errors.buy_rate.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor='credit-card' sx={{ mb: 2, fontSize: '.75rem', maxWidth: 'max-content' }}>
                      Selling Rate
                    </InputLabel>
                    <FormControl fullWidth>
                      <Controller
                        name='sell_rate'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CleaveWrapper>
                            <Cleave
                              id='numeral'
                              placeholder=''
                              value={value}
                              onChange={onChange}
                              aria-describedby='validation-schema-sell_rate'
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
                      {errors.sell_rate && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-sell_rate'>
                          {errors.sell_rate.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor='credit-card' sx={{ mb: 2, fontSize: '.75rem', maxWidth: 'max-content' }}>
                      Investment
                    </InputLabel>
                    <FormControl fullWidth>
                      <Controller
                        name='invest'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            id='form-props-read-only-invest'
                            InputProps={{ readOnly: true }}
                            onChange={onChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor='credit-card' sx={{ mb: 2, fontSize: '.75rem', maxWidth: 'max-content' }}>
                      Earn
                    </InputLabel>
                    <FormControl fullWidth>
                      <Controller
                        name='earn'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            id='form-props-read-only-input'
                            InputProps={{ readOnly: true }}
                            onChange={onChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor='credit-card' sx={{ mb: 2, fontSize: '.75rem', maxWidth: 'max-content' }}>
                      Profit
                    </InputLabel>
                    <FormControl fullWidth>
                      <Controller
                        name='profit'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            id='form-props-read-only-input'
                            InputProps={{ readOnly: true }}
                            onChange={onChange}
                          />
                        )}
                      />
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
      )}
    </>
  )
}

export default editDiesel
