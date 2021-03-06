import React,{useEffect} from 'react'
import { Link } from "react-router-dom";
import {
  TextField,
  Paper,
  InputAdornment,
  Typography,
  Button,
  Grid,
  makeStyles,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import bk from "../Background/bk.png";
import validate from '../validation/SigninValidation';
import useForm from '../hooks/SigninHooks';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },

  paper: {
    margin: theme.spacing(1, 5),
    padding: theme.spacing(5),
  },

  logo: {
    alignItems: "left",
    fontSize: "35px",
    fontFamily: "Abril Fatface",
    color: "#000000",
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
    width: "100%", 
    marginTop: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(2, 0, 2),
    alignItems: "center",
  },

  google:{
    margin: theme.spacing(2, 0, 2),
    alignItems: "center",
    color:'#ffffff',
    background:'red',
  }
}));

export default function Signin(props) {
  const classes = useStyles();
  const { inputs, handleInputChange, handleSubmit, handleGoogle, errors } = useForm(
    { props: props, email: "", password: "" },
    validate
  );

  useEffect(() => {
      const Result=['1','2'];
      localStorage.setItem('Result',JSON.stringify(Result));
  }, [])

  const logo = () => {
    return (
      <React.Fragment>
        <div className={classes.logo}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <p>
              <b>Currency Converter</b>
            </p>
          </Grid>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.image}>
      <Grid
        container
        component="main"
        className={classes.root}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>{logo()}</Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <Grid container direction="column" alignItems="center" spacing={1}>
              <Grid item xs>
                <Typography component="h1" variant="h5">
                  <b>Sign In</b>
                </Typography>
              </Grid>
              <Grid item>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email Address"
                    value={inputs.email || ""}
                    autoFocus
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
                    value={inputs.password || ""}
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
                  <Grid item xs>
                    <Grid container justify="space-around" alignItems="center">
                      <Grid item xs>
                        <Link to="#" variant="body2">
                          Forgot password ?    
                        </Link>
                      </Grid>
                      <Grid item xs>
                         Don't have an Account? <Link to="/signup">Sign Up</Link>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container justify="center" alignItems="center">
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                      disableElevation
                      className={classes.submit}
                    >
                      Sign In
                    </Button>
                  </Grid>
                </form>
              </Grid>
              <Grid item >
                or
              </Grid>
              <Grid item xs>
                <Button 
                  className={classes.google}
                  size="large"
                  variant="contained"
                  onClick={handleGoogle}
                  >Signin using Google</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
