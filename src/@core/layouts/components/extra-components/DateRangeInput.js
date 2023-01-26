import { forwardRef } from "react"

export default function DateRangeInput = forwardRef((props, ref) => {
  const startDate = format(props.start, 'MM/dd/yyyy')
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
  const value = `${startDate}${endDate !== null ? endDate : ''}`

  return <TextField inputRef={ref} label={props.label || ''} {...props} value={value} />
})
