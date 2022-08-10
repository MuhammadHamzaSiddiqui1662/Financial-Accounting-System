import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Container from './Container';
import Footer from './Footer';
import Header from './Header';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { types, categories } from './Constants';
import axios from 'axios';

const Heading = styled.h1({
  fontSize: '30px'
});

const columns = [
  {
    id: 'date',
    label: 'Date',
    minWidth: 50,
    align: 'left',
    width: 150,
    paddingLeft: 40
  },
  {
    id: 'particulars',
    label: 'Particulars',
    minWidth: 100,
    width: 450,
    paddingLeft: 100
  },
  {
    id: 'debit',
    label: 'Debit',
    width: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'credit',
    label: 'Credit',
    width: 100,
    align: 'right',
    paddingRight: 50,
    format: (value) => value.toLocaleString('en-US'),
  }
];

function GeneralEntries({ setAddingGE, setGeneralJournal, generalJournal: rows }) {

  useEffect(() => {
    (async function () {
      try {
        let response = await axios.get(`http://localhost:5000/GeneralJournal`)
        setGeneralJournal(response.data.data)
      } catch (e) {
        console.error(e);
      }
    })();
  }, [])

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    let totalPages = Math.floor(rows.length / rowsPerPage);
    rows.length % rowsPerPage ? setPage(totalPages) : setPage(totalPages - 1)
    console.log(rows.length % rowsPerPage);
  }, [rowsPerPage, rows])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const printDate = date => {
    const d = new Date(date);
    return (
      <span>
        {d.toString()}
      </span>
    )
  }

  return (
    <Container fd='column' h="100vh">
      <Header>Financial Accounting Solution</Header>
      <Container h="85%" bg="#101923" fd='column' jc='flex-start'>
        <Container w='90%' h='13%' jc='space-between'>
          <Heading>General Journal</Heading>
          <Button variant='contained' onClick={() => setAddingGE(true)}>Add Entry</Button>
        </Container>
        <Container w='90%' h='87%'>
          <Paper sx={{ width: '100%', overflow: 'hidden', height: '95%', boxShadow: '0px 0px 30px -22px #fff' }}>
            <TableContainer sx={{ height: '90%', background: '#101923' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          width: column.width,
                          paddingRight: column.paddingRight,
                          paddingLeft: column.paddingLeft,
                          background: '#0F151C',
                          color: '#fff',
                          fontSize: 16
                        }}
                      >
                        <b>{column.label}</b>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length ?
                    rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                            {columns.map((column) => {
                              const columnName = column.id
                              if (columnName == 'date') {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                      color: '#fff',
                                      paddingLeft: column.paddingLeft,
                                      paddingRight: column.paddingRight
                                    }}
                                  >
                                    {printDate(row.date)}
                                  </TableCell>
                                )
                              }
                              else if (columnName == 'particulars') {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                      color: '#fff',
                                      paddingLeft: column.paddingLeft,
                                      paddingRight: column.paddingRight
                                    }}
                                  >
                                    <ul>
                                      {row.accounts.map(acc =>
                                        acc.type == types.debit
                                          ?
                                          <li key={acc.title} style={{ display: 'flex' }}><span>{acc.title}</span><span style={{ width: 50 }}></span></li>
                                          :
                                          <li key={acc.title} style={{ display: 'flex' }}><span style={{ width: 50 }}></span><span>{acc.title}</span></li>
                                      )}
                                    </ul>
                                  </TableCell>
                                )
                              }
                              else if (columnName == 'debit') {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                      color: '#fff',
                                      paddingLeft: column.paddingLeft,
                                      paddingRight: column.paddingRight
                                    }}
                                  >
                                    <ul>
                                      {row.accounts.map(acc =>
                                        acc.type == types.debit
                                          ?
                                          <li key={acc.title} ><span>{acc.amount}</span></li>
                                          :
                                          <li key={acc.title} ><span>-</span></li>
                                      )}
                                    </ul>
                                  </TableCell>
                                )
                              }
                              else if (columnName == 'credit') {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                      color: '#fff',
                                      paddingLeft: column.paddingLeft,
                                      paddingRight: column.paddingRight
                                    }}
                                  >
                                    <ul>
                                      {row.accounts.map(acc =>
                                        acc.type == types.credit
                                          ?
                                          <li key={acc.title}><span>{acc.amount}</span></li>
                                          :
                                          <li key={acc.title}><span>-</span></li>
                                      )}
                                    </ul>
                                  </TableCell>
                                )
                              }
                              else return (<TableCell key={column.id} >Hello</TableCell>)
                              // }
                              // if (value == 'date') {
                              //   return (
                              //     <TableCell key={column.id} align={column.align} style={{ color: '#fff', paddingLeft: column.paddingLeft, paddingRight: column.paddingRight }}>
                              //       {column.format && typeof value === 'number'
                              //         ? column.format(value)
                              //         : value}
                              //     </TableCell>
                              //   );
                              // }
                              // else {
                              //   return (
                              //     <TableCell>
                              //       <ul>
                              //         {row.accounts.map(acc =>
                              //           acc.type == types.debit
                              //             ?
                              //             <li><span>{acc.title}</span><span style={{ width: 100 }}></span></li>
                              //             :
                              //             <li><span style={{ width: 100 }}></span><span>{acc.title}</span></li>
                              //         )}
                              //       </ul>
                              //     </TableCell>
                              //   )
                              // }
                            })}
                          </TableRow>
                        );
                      })
                    :
                    <TableRow>
                      <TableCell style={{ borderBottom: 'none' }}></TableCell>
                      <Container h="200px" color='#fff'>
                        No General Entries Yet
                      </Container>
                    </TableRow>
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              style={{
                height: '10%',
                background: '#0F151C',
                color: '#fff'
              }}
            />
          </Paper>
        </Container>
      </Container>
      <Footer />
    </Container>
  );
}

export default GeneralEntries;