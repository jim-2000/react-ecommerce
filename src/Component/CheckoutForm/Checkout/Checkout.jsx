import React,{useState,useEffect} from 'react'
import { commerce } from '../../../lib/commerce'
import { 
    Paper, Stepper, Step, StepLabel,
    Typography, CircularProgress,
    Divider, Button,CssBaseline
 } from '@material-ui/core'
import useStyles from './style'
import PaymentForm from '../PaymentForm';
import AddressForm from '../Address';
import { Link,useHistory } from 'react-router-dom';
const steps = [ 'Shipping address', 'Payment details'];

//>>>>>>>>>>>
const Checkout = ({ cart, order,onCaptureCheckout,error }) => {
    const classes = useStyles()
    const [shippingData, setshippingData] = useState({})
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const history = useHistory()
    const [isFinished, setFinished] = useState(false)

useEffect(()=> {
    const generateToken = async () => {
        try{
            const token = await commerce.checkout.generateToken(cart.id,{ type: 'cart' })
            setCheckoutToken(token)
            console.log(token)
        }catch(error){
            history.pushState('/')

        }
    }
    generateToken();
},[cart]);

const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
const BackStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

const next =(data)=> {
    setshippingData(data)
    nextStep()
}
const timeout = () => {
    setTimeout(()=> {
        setFinished(true)
    },300)
}


    const Confirmation = ()=> order.customer  ?  (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname} </Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle1">Order ref: {order.customer_reference}</Typography>
                <br />
                <Button component={Link} to="/" variant="outlined" type="button" >Back to Home</Button>
            </div>
        </>
    ) : isFinished ? (
        <>
          <div>
                <Typography variant="h5">Thank you for your purchase </Typography>
                <Divider className={classes.divider} />
                
                <br />
                <Button component={Link} to="/" variant="outlined" type="button" >Back to Home</Button>
            </div>
        </>
    ): (
        <div className={classes.spinner}>
            <CircularProgress about="contineo" />
        </div>
    )

if(error){
    <>
    <Typography variant="h5">Error : {error}</Typography>
    <Button component={Link} to="/"
    variant="outlined" type="button"
    >Back to Home</Button>

    </>
}

    const Form = () => activeStep === 0 ? <AddressForm 
    checkoutToken={checkoutToken} next={next} /> :
     <PaymentForm
     timeout={timeout}
      shippingData={shippingData} BackStep={BackStep}
      onCaptureCheckout={onCaptureCheckout} checkoutToken={checkoutToken} 
      nextStep={nextStep}
      />



    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return (
        <>
        <CssBaseline />
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step)=>(
                        <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                { activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
            </Paper>
        </main>
       
        </>
    )
}

export default Checkout;