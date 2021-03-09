import React from 'react'
import { Link } from "react-router-dom";
import GoogleLogin from 'react-google-login'
import {
  TextField,
  Paper,
  InputAdornment,
  CssBaseline,
  Typography,
  Button,
  Grid,
  Container,
  makeStyles,
} from "@material-ui/core";
import bk from "../Background/bk.png";
import LockIcon from "@material-ui/icons/Lock";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CallIcon from "@material-ui/icons/Call";
import useForm from "../hooks/SignupHooks";
import validate from "../validation/SignupValidation";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },

  paper: {
    margin: theme.spacing(1, 5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  sub: {
    padding: theme.spacing(2),
  },

  logo: {
    padding: theme.spacing(1, 0, 2, 3),
    // display: 'flex',
    // flexDirection: 'column',
    alignItems: "left",
    fontSize: "35px",
    fontFamily: "Abril Fatface",
    // fontFamily:theme.typography.fontFamily('')
  },

  image: {
    backgroundImage: `url(${bk})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(2, 0, 2),
    alignItems: "center",
  },
  google:{
    padding:theme.spacing(1),
  }
}));

export default function Signup(props) {
  const classes = useStyles();
  const { inputs, handleInputChange, handleSubmit, errors } = useForm(
    {
      props: props,
      name: "",
      email: "",
      password: "",
      mobile: "",
    },
    validate
  );

  const logo = () => {
    return (
      <React.Fragment>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs>
            <Typography className={classes.logo} variant="h3">
              Currency Converter
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.sub}
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <InputAdornment>
              <CheckCircleIcon color="error" />
            </InputAdornment>
          </Grid>
          <Grid item>
            <Typography variant="h6">Get Started Quickly</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              This is a Web Application which Allows you to Convert One Currency into Other Currencies.<br/>
              For.eg.<br/>
              <b>Rupees()</b>=><b>Dollars($)</b> and Vice-versa and Many More Currencies
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.image}>
      <Container>
        <Grid
          container
          component="main"
          className={classes.root}
          alignItems="center"
        >
          <CssBaseline />
          <Grid item sm={4} md={7}>
            {logo()}
          </Grid>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5" className={classes.paper}>
                <b>Sign Up</b>
              </Typography>
              <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="name"
                  value={inputs.name}
                  onChange={handleInputChange}
                  {...(errors.name && {error:true,helperText:errors.name})}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="mobile"
                  label="Mobile"
                  value={inputs.mobile}
                  onChange={handleInputChange}
                  {...(errors.mobile && {error:true,helperText:errors.mobile})}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CallIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email Address"
                  value={inputs.email}
                  onChange={handleInputChange}
                  {...(errors.email && {error:true,helperText:errors.email})}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Minimum 6 Characters"
                  value={inputs.password}
                  onChange={handleInputChange}
                  {...(errors.password && {error:true,helperText:errors.password})}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              <Grid item>
                Already have an Account? <Link to="/signin">Sign In</Link>
              </Grid>
                <Grid container justify="center" alignItems="center">
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </form>
              <Grid item>
                or
              </Grid>
              <Grid item className={classes.google}>
                <GoogleLogin
                  buttonText="Signup using Google"
                />
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
