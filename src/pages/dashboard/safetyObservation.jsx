import React from 'react';
import { Icons } from 'assets';
import { Rating } from '@mui/material';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { customColors } from 'theme/pallete';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import {
  StyledTableRow,
  StyledTableCell,
  StyledSafetyObservation
} from './style';

function createData(rank, user, rating, score) {
  return { rank, user, rating, score };
}

const rows = [
  createData(Icons.rank1, 'Luis Robert', '4', 2980),
  createData(Icons.rank2, 'Luis Robert', '4', 2980),
  createData(Icons.rank3, 'Luis Robert', '4', 2980),
  createData(Icons.rank4, 'Luis Robert', '4', 2980),
  createData(Icons.rank5, 'Luis Robert', '4', 2980)
];

const SafetyObservation = () => {
  return (
    <StyledSafetyObservation>
      <h2>Safety Observation LeaderBoard for May 2024</h2>
      <TableContainer
        component={Paper}
        sx={{
          padding: '0 5px',
          boxShadow: 'none',
          borderRadius: '0',
          background: customColors.white
        }}
      >
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <TableHead sx={{ background: '#F5F5F5' }}>
            <TableRow>
              <StyledTableCell>Rank</StyledTableCell>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Rating</StyledTableCell>
              <StyledTableCell>Score</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.rank}>
                <StyledTableCell>
                  <img src={row.rank} alt='rank' />
                </StyledTableCell>
                <StyledTableCell>{row.user}</StyledTableCell>
                <StyledTableCell>
                  <Rating
                    readOnly
                    value={row.rating}
                    sx={{ fontSize: '1rem', color: '#FFC700' }}
                  />
                </StyledTableCell>
                <StyledTableCell>{row.score}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledSafetyObservation>
  );
};

export default SafetyObservation;
