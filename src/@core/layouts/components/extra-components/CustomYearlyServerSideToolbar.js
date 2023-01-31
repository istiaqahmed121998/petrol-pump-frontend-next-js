import 'cleave.js/dist/addons/cleave-phone.us'
import { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import Box from '@mui/material/Box'
import { GridToolbarExport } from '@mui/x-data-grid'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import format from 'date-fns/format'
import addDays from 'date-fns/addDays'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
const PickersComponent = forwardRef(({ ...props }, ref) => {
  // ** Props
  const { label, readOnly } = props

  return (
    <TextField inputRef={ref} {...props} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />
  )
})
const CustomYearlyServerSideToolbar = props => {
  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: theme => theme.spacing(2, 5, 4, 5)
      }}
    >
      <GridToolbarExport />
      <DatePickerWrapper>
        <Grid item sm={5}>
          <DatePicker
            selected={props.year}
            id='basic-input'
            popperPlacement={'bottom-start'}
            onChange={props.handleOnChangeYear}
            placeholderText='Click to select a date'
            showYearPicker
            dateFormat='yyyy'
            customInput={<PickersComponent label='Basic' />}
          />
        </Grid>
      </DatePickerWrapper>
    </Box>
  )
}
export default CustomYearlyServerSideToolbar
