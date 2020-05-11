import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

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

function MyTable() {
  const classes = useStyles();
  const [states, setStates] = useState([]);
  const [order, setOrder] = useState(false);
  const [stateOrder, setStateOrder] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/api');
      setStates(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [states]);

  const sortHighLow = (sortType) => {
    if (!order) {
      setStates([...states].sort((a, b) => a[sortType] - b[sortType]));
      setOrder(true);
    } else if (order) {
      setStates([...states].sort((a, b) => b[sortType] - a[sortType]));
      setOrder(false);
    }
  };
  const sortState = () => {
    if (!stateOrder) {
      setStates([...states].sort((a, b) => a.state.localeCompare(b.state)));
      setStateOrder(true);
    } else if (stateOrder) {
      setStates([...states].sort((a, b) => b.state.localeCompare(a.state)));
      setStateOrder(false);
    }
  };

  const arrSum = (sortType) => states.reduce((a, b) => a + b[sortType], 0);

  return (
    <TableContainer component={Paper}>
      {error ? (
        <h1>Error: {error}</h1>
      ) : (
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Button color='secondary' onClick={() => sortState()}>
                  States US ({states.length})
                </Button>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <Button color='primary' onClick={() => sortHighLow('death')}>
                  Deaths total ({arrSum('death')})
                </Button>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <Button
                  color='primary'
                  onClick={() => sortHighLow('hospitalizedCurrently')}
                >
                  Hospitalized currently ({arrSum('hospitalizedCurrently')})
                </Button>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <Button
                  color='primary'
                  onClick={() => sortHighLow('last3Days')}
                >
                  Deaths last 3 days ({arrSum('last3Days')})
                </Button>
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
                <StyledTableCell align='right'>
                  {item.last3Days}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
export default MyTable;
