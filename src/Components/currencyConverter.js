/* eslint-disable array-callback-return */
import React,{useState} from 'react'
import { 
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  Modal,
  InputAdornment,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import bk from '../Background/BK1.jpg'
import MoneyIcon from '@material-ui/icons/Money';
import { useAuth } from '../Contexts/AuthContext';

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
    margin: theme.spacing(1),
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
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper1: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color:'#000000'
  },
}));

export default function CurrencyConverter(props) {
  const classes = useStyles();
  const {logout} = useAuth();
  const [open,setOpen]=useState(false);
  const [amount,setAmount]=useState('');
  const result=[];
  const checkedList=[];
  
  const openModal=()=>{
    window.open('https://api.exchangeratesapi.io/latest','_blank')
  }

  const handleClose=()=>{
    setOpen(false);
  }

  const CalculateResult=()=>{
    setOpen(true);
    const base=localStorage.BaseCurrency;
    const rate= JSON.parse(localStorage.baseRates);
    console.log(checkedList);
    console.log(amount);
    checkedList.map((item)=>(
      Object.keys(rate).map((k)=>{
        if(item===k){
          var total=amount*rate[k]; 
          var string=amount+'('+base+')=>'+total+'('+item+')';
          result.push(string);
        }
      })
    ))
    localStorage.setItem('Result',JSON.stringify(result));
    console.log(result);
  }

  const handleChange=(e)=>{
    e.preventDefault()
    const baseCurrency=e.target.value;
    localStorage.setItem('BaseCurrency',baseCurrency);
    var url;
    if(e.target.value==="EUR"){
      url='https://api.exchangeratesapi.io/latest';
    }else{
      url='https://api.exchangeratesapi.io/latest?base='+baseCurrency;
    }
    fetch(url)
    .then(res=>res.json())
    .then((result)=>{
      localStorage.setItem('baseRates',JSON.stringify(result.rates));
    }).catch((error)=>{
      console.log("errors",error);
    })
  }

  const handleInputChange=(e)=>{
    setAmount(e.target.value);
  }

  const handleCheckBox=(e)=>{
    e.preventDefault();
    checkedList.push(e.target.value);
  }

  const Logout =()=>{
    logout();
    props.history.push('/signin');
  }
  return (
    <React.Fragment>
      <div className={classes.image}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              Currency Converter
            </Typography>
            <Button color="inherit" onClick={openModal}>Conversion Rates</Button>
            <Button color="inherit" onClick={Logout}>Logout</Button>
          </Toolbar>
        </AppBar>
        <Grid container direction="column" justify="center" alignItems="center" spacing={3} className={classes.root}>
          <Paper className={classes.paper}>
            <Grid item xs >
              <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid item>
                  <TextField
                    label="Enter Amount"
                    variant="outlined"
                    required
                    autoFocus
                    defaultValue={1}
                    value={amount}
                    onChange={(e)=>handleInputChange(e)}
                  />
                </Grid>
                <Grid item className={classes.select}>
                  <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Currencies"
                    defaultValue='EUR'
                    onChange={(e)=>handleChange(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MoneyIcon/>
                        </InputAdornment>
                      ),
                    }}
                    SelectProps={{
                      native: true,
                    }}
                    // helperText="Please select your currency"
                    variant="outlined"
                  >
                    <option value="EUR">EUR</option>
                    { 
                    // options
                      Object.keys(JSON.parse(localStorage.getItem('rates'))).map((option,index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))
                    }
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center" justify="center">
                <Grid item xs={1} >
                  <FormControlLabel
                    control={<Checkbox
                      name="EUR"
                      color="primary"
                      value="EUR"
                      onChange={(e)=>handleCheckBox(e)}
                    />}
                    label="EUR"/>
                </Grid>
                { 
                  // optionCheckBoxs
                  Object.keys(JSON.parse(localStorage.getItem('rates'))).map((option)=>(
                  <Grid item xs={1} >
                    <FormControlLabel
                      control={<Checkbox
                        name={option}
                        color="primary"
                        value={option}
                        onChange={(e)=>handleCheckBox(e)}
                      />}
                      label={option}/>
                  </Grid>
                ))
              }
              </Grid>
            </Grid>
            <Grid item xs className={classes.submit}>
              <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid item>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={CalculateResult}
                    >Calculate</Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      className={classes.modal}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      <div style={{minHeight:'200px',}} className={classes.paper1}>
                        { 
                        // getResultData
                          JSON.parse(localStorage.getItem('Result')).map((item)=>(
                            <Typography variant="h6">{item}</Typography>
                          ))
                        }
                      </div>
                    </Modal>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </div>
    </React.Fragment>
  )
}
