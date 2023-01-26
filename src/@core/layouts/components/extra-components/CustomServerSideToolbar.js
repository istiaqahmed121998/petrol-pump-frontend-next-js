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
const CustomInput = forwardRef((props, ref) => {
    const startDate = format(props.start, 'MM/dd/yyyy')
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <TextField inputRef={ref} label={props.label || ''} {...props} value={value} />
  })
const CustomServerSideToolbar = props => {
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
            selectsRange
            monthsShown={2}
            endDate={props.endDateRange}
            selected={props.startDateRange}
            startDate={props.startDateRange}
            shouldCloseOnSelect={false}
            id='date-range-picker-months'
            onChange={props.handleOnChangeRange}
            popperPlacement={'bottom-start'}
            customInput={
              <CustomInput label='Multiple Months' end={props.endDateRange} start={props.startDateRange} />
            }
          />
        </Grid>
      </DatePickerWrapper>
      <TextField
        size='small'
        value={props.value}
        onChange={props.onChange}
        placeholder='Search…'
        InputProps={{
          startAdornment: (
            <Box sx={{ mr: 2, display: 'flex' }}>
              <Icon icon='tabler:search' fontSize={20} />
            </Box>
          ),
          endAdornment: (
            <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
              <Icon icon='tabler:x' fontSize={20} />
            </IconButton>
          )
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto'
          },
          '& .MuiInputBase-root > svg': {
            mr: 2
          }
        }}
      />
    </Box>
  )
}
export default CustomServerSideToolbar