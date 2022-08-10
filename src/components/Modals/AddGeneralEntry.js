import { Grid, Typography, Button, Autocomplete, TextField } from '@mui/material';
import TextFeild from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import * as api from './../../api/index'
import React, { useEffect, useState } from 'react';
import { typesArr, categoriesArr } from './../Constants';

const useStyle = makeStyles({
  form: {
    width: '60%',
  },
  container: {
    padding: '20px',
    background: '#0F151C',
    borderRadius: '15px'
  },
  autocomplete: {
    color: '#fff'
  }
})

function AddGeneralEntry({ setLoading, setGeneralJournal, setAddingGE, generalJournal, accounts, tAccounts, setAccounts, setTAccounts }) {

  const classes = useStyle();
  const [date, setDate] = useState(new Date());
  const [debitTitle, setDebitTitle] = useState('');
  const [debitAmount, setDebitAmount] = useState('');
  const [debitCategory, setDebitCategory] = useState('');
  const [creditTitle, setCreditTitle] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [creditCategory, setCreditCategory] = useState('');

  useEffect(() => {
    (async function () {
      try {
        let response = await api.fetchAllTAccounts();
        setTAccounts(response.data.data)
      } catch (e) {
        console.error(e);
      }
    })();
  }, [])

  const ifNew = title => {
    let flag = true;
    if (tAccounts.length == 0) return flag
    tAccounts.forEach(y => {
      if (title === y.title) {
        flag = false;
      }
    })
    return flag;
  }

  const getIndex = (title, list) => {
    list.forEach(y => {
      if (title == y.title) return y
    })
  }

  const getAllTAccounts = async () => {
    try {
      const res = await api.fetchAllTAccounts();
      console.log(res.data.data);
      return res.data.data
    } catch (err) {
      console.log(err)
    }
  }

  const getTAccount = async id => {
    try {
      const res = await api.fetchSpecificTAccount(id);
      console.log(res.data.data);
      return res.data.data
    } catch (err) {
      console.log(err)
    }
  }

  const patchTAccount = async tAcc => {
    try {
      const res = await api.patchTAccount(tAcc);
      console.log(res.data.data);
      return res.data.data;
    } catch (err) {
      console.log(err)
    }
  }

  const postTAccount = async (tAcc) => {
    try {
      const res = await api.postTAccount(tAcc);
      let data = res.data.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err)
    }
  }

  const updateTAccounts = async entry => {
    const newAccs = entry.accounts.filter(x => ifNew(x.title))
    const oldAccs = entry.accounts.filter(x => !ifNew(x.title))
    if (newAccs.length > 0) {
      let arr = []
      newAccs.forEach(acc => {
        const tAcc = {
          title: acc.title,
          debit: acc.type == typesArr[0] ? [acc.amount] : [0],
          credit: acc.type == typesArr[1] ? [acc.amount] : [0],
          date: [entry.date],
          category: acc.category
        }
        arr.push(tAcc)
        postTAccount(tAcc)
      });
      setTAccounts(getAllTAccounts());
    }
    if (oldAccs.length > 0) {
      oldAccs.forEach(acc => {
        const payload = {
          title: acc.title,
          debit: acc.type === typesArr[0] ? acc.amount : 0,
          credit: acc.type === typesArr[1] ? acc.amount : 0,
          date: entry.date,
        }
        patchTAccount(payload)
      });
      setTAccounts(getAllTAccounts());
    }
  }

  const updateGeneralJournal = async entry => {
    const temp = [...generalJournal];
    temp.push(entry);
    setGeneralJournal(temp);
  }

  const postEntry = async (date, debitTitle, debitAmount, debitCategory, creditTitle, creditAmount, creditCategory) => {
    try {
      const res = await axios.post(`http://localhost:5000/GeneralJournal`, {
        entry: {
          date,
          accounts: [
            {
              title: debitTitle,
              type: typesArr[0],
              amount: debitAmount,
              category: debitCategory
            },
            {
              title: creditTitle,
              type: typesArr[1],
              amount: creditAmount,
              category: creditCategory
            }
          ]
        }
      })
      let entry = res.data.data
      await updateGeneralJournal(entry)
      await updateTAccounts(entry)
      setAddingGE(false)
      setLoading(false)
    }
    catch (err) {
      alert(err)
      console.log(err);
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    if (date && debitTitle && debitAmount && debitCategory && creditTitle && creditAmount && creditCategory) {
      setLoading(true);
      postEntry(date, debitTitle, debitAmount, debitCategory, creditTitle, creditAmount, creditCategory)
    }
    else {
      alert('All feilds are mendatory');
    }
  }

  return (
    <div onClick={() => setAddingGE(false)} style={{
      position: 'absolute',
      zIndex: '80',
      width: '100vw',
      height: '100vh',
      background: 'rgb(0,0,0,0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#999999'
    }}>
      <form onClick={e => e.stopPropagation()} onSubmit={handleSubmit} className={classes.form}>
        <Grid className={classes.container} container sm={12} spacing={2}>
          <Grid item sm={12}>
            <Grid container sm={12}>
              <Grid item sm={12} md={6}>
                <Typography variant="h3" component="h3" color='primary'>
                  Add Entry
                </Typography>
              </Grid>
              <Grid item sm={12} md={6}></Grid>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Grid container sm={12} spacing={2}>
              <Grid item sm={12}>
                <Typography variant="h4" component="h4" color='primary'>
                  Debit
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Grid container sm={12} spacing={2}>
                  <Grid item sm={12} md={4}>
                    <TextFeild
                      fullWidth
                      id="filled-basic"
                      variant="filled"
                      name="debitTitle"
                      label="Account's Title"
                      value={debitTitle}
                      onChange={e => setDebitTitle(e.target.value)}
                      // error={formik.touched.debitTitle && Boolean(formik.errors.debitTitle)}
                      // helperText={formik.touched.debitTitle && formik.errors.debitTitle}
                      style={{ background: '#202933' }}
                      InputProps={{
                        style: {
                          color: '#fff',
                        }
                      }}
                      InputLabelProps={{
                        style: {
                          color: '#1976D2'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} md={4}>
                    <TextFeild
                      fullWidth
                      id="filled-basic"
                      variant="filled"
                      name="debitAmount"
                      label="Amount"
                      value={debitAmount}
                      onChange={e => setDebitAmount(e.target.value)}
                      // error={
                      //   formik.touched.debitAmount && Boolean(formik.errors.debitAmount)
                      // }
                      // helperText={formik.touched.debitAmount && formik.errors.debitAmount}
                      style={{ background: '#202933' }}
                      InputProps={{
                        style: {
                          color: '#fff',
                        }
                      }}
                      InputLabelProps={{
                        style: {
                          color: '#1976D2'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} md={4}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      name="debitCategory"
                      value={debitCategory}
                      onChange={(event, value) => setDebitCategory(value)}
                      inputValue={debitCategory}
                      onInputChange={(event, value) => {
                        setDebitCategory(value)
                      }}
                      options={categoriesArr}
                      ListboxProps={{
                        style: { background: '#1f1f1f', color: '#fff' }
                      }}
                      renderInput={(params) =>
                        <TextField
                          variant={'filled'}
                          name="debitCategory"
                          // onChange={e=> setDebitCategory(e.target.value)}
                          // error={formik.touched.debitCategory && Boolean(formik.errors.debitCategory)}
                          // helperText={formik.touched.debitCategory && formik.errors.debitCategory}
                          style={{ background: '#202933' }}
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            style: {
                              color: '#fff'
                            }
                          }}
                          InputLabelProps={{
                            style: {
                              color: '#1976D2'
                            }
                          }}
                          label="Category"
                        />}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Grid container sm={12} spacing={2}>
              <Grid item sm={12}>
                <Typography variant="h4" component="h4" color='primary'>
                  Credit
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Grid container sm={12} spacing={2}>
                  <Grid item sm={12} md={4}>
                    <TextFeild
                      fullWidth
                      id="filled-basic"
                      variant="filled"
                      name="creditTitle"
                      label="Account's Title"
                      value={creditTitle}
                      onChange={e => setCreditTitle(e.target.value)}
                      // error={formik.touched.creditTitle && Boolean(formik.errors.creditTitle)}
                      // helperText={formik.touched.creditTitle && formik.errors.creditTitle}
                      style={{ background: '#202933' }}
                      InputProps={{
                        style: {
                          color: '#fff',
                        }
                      }}
                      InputLabelProps={{
                        style: {
                          color: '#1976D2'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} md={4}>
                    <TextFeild
                      fullWidth
                      id="filled-basic"
                      variant="filled"
                      name="creditAmount"
                      label="Amount"
                      value={creditAmount}
                      onChange={e => setCreditAmount(e.target.value)}
                      // error={
                      //   formik.touched.creditAmount && Boolean(formik.errors.creditAmount)
                      // }
                      // helperText={formik.touched.creditAmount && formik.errors.creditAmount}
                      style={{ background: '#202933' }}
                      InputProps={{
                        style: {
                          color: '#fff',
                        }
                      }}
                      InputLabelProps={{
                        style: {
                          color: '#1976D2'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} md={4}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      name="creditCategory"
                      value={creditCategory}
                      onChange={(event, value) => setCreditCategory(value)}
                      inputValue={creditCategory}
                      onInputChange={(event, value) => {
                        setCreditCategory(value)
                      }}
                      options={categoriesArr}
                      ListboxProps={{
                        style: { background: '#1f1f1f', color: '#fff' }
                      }}
                      renderInput={(params) =>
                        <TextField
                          variant={'filled'}
                          name="creditCategory"
                          // onChange={formik.handleChange}
                          // error={formik.touched.creditCategory && Boolean(formik.errors.creditCategory)}
                          // helperText={formik.touched.creditCategory && formik.errors.creditCategory}
                          style={{ background: '#202933' }}
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            style: {
                              color: '#fff'
                            }
                          }}
                          InputLabelProps={{
                            style: {
                              color: '#1976D2'
                            }
                          }}
                          label="Category"
                        />}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} spacing={2} style={{
            marginRight: 30
          }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              style={{
                height: '50px',
                marginTop: 30
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AddGeneralEntry;