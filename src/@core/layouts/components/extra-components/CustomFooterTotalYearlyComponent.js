import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function CustomFooterTotalYearlyComponent(props) {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table style={{ tableLayout: 'auto' }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='right' style={{ width: '2rem' }}>
                Total
              </TableCell>
              <TableCell align='right'>
                Diesel Quantity
              </TableCell>
              <TableCell align='right' style={{minWidth: '140px'}}>{Number(props.totalDieselQuantity.toFixed(4))} LTR</TableCell>
              <TableCell align='right'>Diesel Earn</TableCell>
              <TableCell align='right' style={{minWidth: '140px'}}>{Number(props.totalDieselEarn.toFixed(4))} ৳</TableCell>
              <TableCell align='right'>Diesel Invest</TableCell>
              <TableCell align='right' style={{minWidth: '140px'}}>{Number(props.totalDieselInvest.toFixed(4))} ৳</TableCell>
              <TableCell align='right'>Diesel Profit</TableCell>
              <TableCell align='right' style={{minWidth: '140px'}}>{Number(props.totalDieselProfit.toFixed(4))} ৳</TableCell>
              <TableCell align='right'>
                Octane Quantity
              </TableCell>
              <TableCell align='right' style={{minWidth: '140px'}}>{Number(props.totalOctaneQuantity.toFixed(4))} LTR</TableCell>
              <TableCell align='right'>Octane Earn</TableCell>
              <TableCell align='right' style={{minWidth: '140px'}}>{Number(props.totalOctaneEarn.toFixed(4))} ৳</TableCell>
              <TableCell align='right'>Octane Invest</TableCell>
              <TableCell align='right' style={{minWidth: '140px'}}>{Number(props.totalOctaneInvest.toFixed(4))} ৳</TableCell>
              <TableCell align='right'>Octane Profit</TableCell>
              <TableCell align='right' style={{minWidth: '140px'}}>{Number(props.totalOctaneProfit.toFixed(4))} ৳</TableCell>

              <TableCell align='right'>
                Mobil Quantity
              </TableCell>
              <TableCell align='right' style={{minWidth: '100px'}}>{Number(props.totalMobilQuantity.toFixed(4))} LTR</TableCell>
              <TableCell align='right'>Mobil Earn</TableCell>
              <TableCell align='right' style={{minWidth: '90px'}}>{Number(props.totalMobilEarn.toFixed(4))} ৳</TableCell>
              <TableCell align='right'>Mobil Invest</TableCell>
              <TableCell align='right' style={{minWidth: '90px'}}>{Number(props.totalMobilInvest.toFixed(4))} ৳</TableCell>
              <TableCell align='right'>Mobil Profit</TableCell>
              <TableCell align='right' style={{minWidth: '90px'}}>{Number(props.totalMobilProfit.toFixed(4))} ৳</TableCell>

              

              <TableCell align='right'>Earn</TableCell>
              <TableCell align='right' style={{minWidth: '140px'}}>{Number(props.totalEarn.toFixed(4))} ৳</TableCell>
              <TableCell align='right'>Invest</TableCell>
              <TableCell align='right' style={{minWidth: '140px'}}>{Number(props.totalInvest.toFixed(4))} ৳</TableCell>
              <TableCell align='right' >Fuel Profit</TableCell>
              <TableCell align='right' style={{minWidth: '140px'}}>{Number(props.totalFuelProfit.toFixed(4))} ৳</TableCell>
              <TableCell align='right'>Total Expense</TableCell>
              <TableCell align='right' style={{minWidth: '140px'}}>{Number(props.totalExpense.toFixed(4))} ৳</TableCell>
              <TableCell align='right'>Net Profit</TableCell>
              <TableCell align='right' style={{minWidth: '140px'}}>{Number(props.totalNetProfit.toFixed(4))} ৳</TableCell>

            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default CustomFooterTotalYearlyComponent
