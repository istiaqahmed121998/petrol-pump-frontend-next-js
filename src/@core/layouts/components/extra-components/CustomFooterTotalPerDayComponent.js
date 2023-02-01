import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function CustomFooterTotalPerDayComponent(props) {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='right'>Total Earn</TableCell>
              <TableCell align='right'>{Number((props.totalEarn).toFixed(4))} BDT</TableCell>
              <TableCell align='right'>Total Invest</TableCell>
              <TableCell align='right'>{Number((props.totalInvest).toFixed(4))} BDT</TableCell>
              <TableCell align='right'>Fuel Profit</TableCell>
              <TableCell align='right'>{Number((props.totalEarn-props.totalInvest).toFixed(4))} BDT</TableCell>
              <TableCell align='right'>Total Expense</TableCell>
              <TableCell align='right'>{Number((props.totalExpense).toFixed(4))} BDT</TableCell>
              <TableCell align='right'>Total Net Profit</TableCell>
              <TableCell align='right'>{Number((props.totalProfit).toFixed(4))} BDT</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default CustomFooterTotalPerDayComponent
