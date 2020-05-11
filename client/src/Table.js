import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 320,
  },
});

const sortState = (states) => {
  states.sort((a, b) => a.state.localeCompare(b.state));
};

const sortHospitalized = (states) => {
  states.sort((a, b) =>
    a.hospitalizedCurrently.localeCompare(b.hospitalizedCurrently)
  );
};
const sortLast3Days = (states) => {
  states.sort((a, b) => a.last3Days - b.last3Days);
};

function MyTable() {
  const classes = useStyles();
  const [states, setStates] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api');
      setStates(data);
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [states]);

  const sortDeath = () => {
    setStates([...states].sort((a, b) => a.death - b.death));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <a onClick={() => sortDeath()}>States (US)</a>
            </StyledTableCell>
            <StyledTableCell align='right'>Deaths (total)</StyledTableCell>
            <StyledTableCell align='right'>
              Hospitalized (currently)
            </StyledTableCell>
            <StyledTableCell align='right'>
              Deaths (last 3 days)
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {states.map((item, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component='th' scope='row'>
                {item.state}
              </StyledTableCell>
              <StyledTableCell align='right'>{item.death}</StyledTableCell>
              <StyledTableCell align='right'>
                {item.hospitalizedCurrently ? item.hospitalizedCurrently : 0}
              </StyledTableCell>
              <StyledTableCell align='right'>{item.last3Days}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default MyTable;
