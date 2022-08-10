import React from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { Grid, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TextFeild from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';
import { typesArr, categoriesArr } from './../Constants';

const validationSchema = yup.object({
  date: yup
    .string("Select Date")
    .required("Date is required"),
  debitTitle: yup
    .string("Enter title for video")
    .required("Title is required"),
  debitAmount: yup
    .number("Enter title for video")
    .required("Amount is required"),
  debitCategory: yup
    .string("Enter title for video")
    .required("Category is required"),
  creditTitle: yup
    .string("Enter title for video")
    .required("Title is required"),
  creditAmount: yup
    .number("Enter title for video")
    .required("Title is required"),
  creditCategory: yup
    .string("Enter title for video")
    .required("Category is required"),

});

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

function AddGE({ setLoading, setUser, user, setAddingGE }) {

  const classes = useStyle();

  const formik = useFormik({
    initialValues: {
      date: "al;sdk",
      debitTitle: "",
      debitAmount: "",
      debitCategory: "",
      creditTitle: "",
      creditAmount: "",
      creditCategory: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("onsubmit");
      setLoading(true);
      updatePlaylist(values);
    },
  });

  const updatePlaylist = async ({ title, src }) => {
    try {
      const { _id, playlist } = user
      const updatedUser = await axios.patch(`http://localhost:5000/YoutubePlaylist/users/${_id}`, {
        playlist: [...playlist,
        {
          id: src.match(/[\w\-]{11,}/)[0],
          src: src,
          title: title
        }
        ]
      });
      setUser(updatedUser.data[0]);
      setLoading(false);
      setAddingGE(false);
    } catch (error) {
      alert("unable to connect to server")
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
      <form onClick={e => e.stopPropagation()} onSubmit={formik.handleSubmit} className={classes.form}>
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
                      value={formik.values.debitTitle}
                      onChange={formik.handleChange}
                      error={formik.touched.debitTitle && Boolean(formik.errors.debitTitle)}
                      helperText={formik.touched.debitTitle && formik.errors.debitTitle}
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
                      value={formik.values.debitAmount}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.debitAmount && Boolean(formik.errors.debitAmount)
                      }
                      helperText={formik.touched.debitAmount && formik.errors.debitAmount}
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
                      onChange={formik.handleChange}
                      options={categoriesArr}
                      ListboxProps={{
                        style: { background: '#1f1f1f', color: '#fff' }
                      }}
                      renderInput={(params) =>
                        <TextField
                          variant={'filled'}
                          name="debitCategory"
                          onChange={formik.handleChange}
                          error={formik.touched.debitCategory && Boolean(formik.errors.debitCategory)}
                          helperText={formik.touched.debitCategory && formik.errors.debitCategory}
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
                      value={formik.values.creditTitle}
                      onChange={formik.handleChange}
                      error={formik.touched.creditTitle && Boolean(formik.errors.creditTitle)}
                      helperText={formik.touched.creditTitle && formik.errors.creditTitle}
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
                      value={formik.values.creditAmount}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.creditAmount && Boolean(formik.errors.creditAmount)
                      }
                      helperText={formik.touched.creditAmount && formik.errors.creditAmount}
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
                      onChange={(e, v) => formik.handleChange(v)}
                      options={categoriesArr}
                      ListboxProps={{
                        style: { background: '#1f1f1f', color: '#fff' }
                      }}
                      renderInput={(params) =>
                        <TextField
                          variant={'filled'}
                          name="creditCategory"
                          onChange={formik.handleChange}
                          error={formik.touched.creditCategory && Boolean(formik.errors.creditCategory)}
                          helperText={formik.touched.creditCategory && formik.errors.creditCategory}
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
              type="submit"
              fullWidth
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

export default AddGE;