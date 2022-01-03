import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Button} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {useDispatch,useSelector} from "react-redux";
import { getRequests} from '../context';
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell >{row.name}</TableCell>
        <TableCell >{row.averageRating}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell >Longitude</TableCell>
                    <TableCell >Latitude</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={row.id}>
                      <TableCell>{JSON.stringify(row.location.longitude)}</TableCell>
                      <TableCell >{JSON.stringify(row.location.latitude)}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    averageRating: PropTypes.number.isRequired,
  }).isRequired,
};



export const RequestsTable = (props)=> {
  const requests = useSelector((state)=> state.user.requests);
  const dispatchR = useDispatch();
  const refreshRequests = () =>{
    getRequests(dispatchR,{})
  } 
  return (  
    <div align="center">
      <h1 data-testid="requests-title">Chargers</h1>
      <TableContainer component={Paper}> 
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Charger ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell align="right" variant="head" size="small">
              <Button   onClick={refreshRequests}>
              Refresh
              </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((row) => (
              <Row key={row.id} row={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}