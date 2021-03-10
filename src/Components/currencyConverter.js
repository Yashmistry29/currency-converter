import React,{useState,useEffect} from 'react'
import { 
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
  TextField, 
  IconButton,
} from '@material-ui/core';
import bk from '../Background/BK1.jpg'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow:1,
    height:'100vh',
    opacity:'0.8'
  },
  title: {
    flexGrow: 1,
    fontFamily: "Abril Fatface",
  },
  paper: {
    margin: theme.spacing(1,2),
    padding: theme.spacing(5),
    alignItems: "center",
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
    // opacity:'0.8'
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    alignItems: "center",
  },
  select:{
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }
}));

export default function CurrencyConverter(props) {
  const classes = useStyles();
  const [loaded,setLoaded]=useState(false);
  const [baseCurrency,setBaseCurrency]=useState('')
  const [rateList,setRateList]=useState([{}]);

  useEffect(() => {
    fetch("https://api.exchangeratesapi.io/latest")
    .then(res=>res.json())
    .then((result)=>{
      setLoaded(true);
      setBaseCurrency(result.base)
      localStorage.setItem("rates",JSON.stringify(result.rates));
    }).catch((error)=>{
      console.log("Errors:",error)
    })
  }, [])

  const removeItem =()=>{
    console.log("success")
  }

  const AddCurrency =()=>{
    console.log("Add Currency");
  }

  const CalculateResult =()=>{
    console.log("Result Calculated")
  }

  return (
    <React.Fragment>
      <div className={classes.image}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              Currency Converter
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
        <Grid container xs={12} direction="column" justify="center" alignItems="center" spacing={3} className={classes.root}>
          <Paper className={classes.paper}>
            <Grid item xs>
              <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid item>
                  <IconButton onClick={removeItem}>
                    <RemoveCircleOutlineIcon fontSize="medium" color="primary"/>
                  </IconButton>
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    label="Value"
                    defaultValue={1}
                  />
                </Grid>
                <Grid item className={classes.select}>
                  <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Currencies"
                    // value={currency}
                    // onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                    // helperText="Please select your currency"
                    variant="outlined"
                  >
                    {/* {currencies.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))} */}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid item>
                <IconButton onClick={removeItem}>
                    <RemoveCircleOutlineIcon fontSize="medium" color="primary"/>
                  </IconButton>
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    label="Value"
                    defaultValue={1}
                  />
                </Grid>
                <Grid item className={classes.select}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Currencies"
                  // value={currency}
                  // onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                  // helperText="Please select your currency"
                  variant="outlined"
                >
                  {/* {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))} */}
                </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs className={classes.submit}>
              <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid item>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={AddCurrency}>Add Currency</Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={CalculateResult}
                    >Calculate</Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </div>
    </React.Fragment>
  )
}


            
            
