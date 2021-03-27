import React,{useState,useEffect} from 'react'
import { commerce } from '../../../lib/commerce'
import { 
    Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button
 } from '@material-ui/core'
import useStyles from './style'
import PaymentForm from '../PaymentForm';
import AddressForm from '../Address';
const steps = [ 'Shipping address', 'Payment details'];

//>>>>>>>>>>>
const Checkout = ({ cart, order,onCaptureCheckout,error }) => {
    const classes = useStyles()
    const [shippingData, setshippingData] = useState({})
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)

useEffect(()=> {
    const generateToken = async () => {
        try{
            const token = await commerce.checkout.generateToken(cart.id,{ type: 'cart' })
      
            setCheckoutToken(token)
        }catch(error){

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



    const Confirmation = ()=> (
        <div>
            Confirmation
        </div>
    )
    const Form = () => activeStep == 0 ? <AddressForm 
    checkoutToken={checkoutToken} next={next} /> :
     <PaymentForm
      shippingData={shippingData} BackStep={BackStep}
      onCaptureCheckout={onCaptureCheckout} checkoutToken={checkoutToken} 
      nextStep={nextStep}
      />



    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return (
        <>
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
                { activeStep == steps.length ? <Confirmation /> : checkoutToken && <Form /> }
            </Paper>
        </main>
       
        </>
    )
}

export default Checkout;