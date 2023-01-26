import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function CustomFooterTotalExpenseComponent(props) {
  return (
    // <Box sx={{ padding: "10px", display: "flex" }}>Total : {props.totalInvest}</Box>
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='right'>Total Expense</TableCell>
              <TableCell align='right'>{Number((props.totalExpense).toFixed(4))} BDT</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default CustomFooterTotalExpenseComponent
