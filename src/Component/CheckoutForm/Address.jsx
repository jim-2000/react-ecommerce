import React,{useState,useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './CustomTextField'
import { commerce } from '../../lib/commerce'
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const AddressForm = ({checkoutToken}) => {
const methods = useForm()
const [shippingCountry, setShippingCountry] = useState([])
const [Country, setCountry] = useState('')
const [shippingSubDivition, setshippingSubDivition] = useState([])
const [SubDivition, setSubDivition] = useState('')
const [shippingOptions, setshippingOption] = useState('')
const [Options, setOptions] = useState([])
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const countries =  Object.entries(shippingCountry).map(([code, name])=>({id:code, label: name}) )
const subdivisons =  Object.entries(shippingSubDivition).map(([code, name])=>({id:code, label: name}) )
console.log('shipping options',  Options)
const opt = Options.map((sO)=> ({id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))

const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries  } = await commerce.services.localeListCountries(checkoutTokenId);
    setShippingCountry(countries)
    setCountry(Object.keys(countries)[0]);
}
const fetchSubDivition = async (countryCode) => {
    const { subdivisions  } = await commerce.services.localeListSubdivisions(countryCode)
    setshippingSubDivition(subdivisions )
    setSubDivition(Object.keys(subdivisions )[0]);
}
const fetchShippinOption= async (checkoutToken,country, region=null)=> {
    const shipingOpt = await  commerce.checkout.getShippingOptions(checkoutToken, {country, region});
    setOptions(shipingOpt);
    setshippingOption(shipingOpt[0].id);
}

useEffect(()=> {
    fetchShippingCountries(checkoutToken.id)
},[])

useEffect(()=> {
    if(Country) fetchSubDivition(Country)
},[Country])

useEffect(()=> {
    if(SubDivition) fetchShippinOption(checkoutToken.id,Country, SubDivition )
},[SubDivition])

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            <FormProvider {...methods}>
                <form >
                    <Grid container spacing={3}>
                        <FormInput
                        required
                        name="firstName"
                        label="First Name"
                        />
                         <FormInput
                        required
                        name="LastName"
                        label="Last Name"
                        />
                         <FormInput
                        required
                        name="address1"
                        label="Address1"
                        />
                      
                         <FormInput
                        required
                        name="email"
                        label="Email"
                        />
                         <FormInput
                        required
                        name="City"
                        label="city"
                        />
                         <FormInput
                        required
                        name="zip"
                        label="ZIP / Postal code"
                        />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={Country} fullWidth onChange={(e)=> setCountry(e.target.value)}>
                               {
                                   countries.map((item)=>(
                                    <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                
                                </MenuItem>
                                   ))
                               }

                               
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping SubDivition</InputLabel>
                            <Select value={SubDivition} fullWidth onChange={(e)=> setSubDivition(e.target.value)}>
                            {
                                   subdivisons.map((item)=>(
                                    <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                
                                </MenuItem>
                                   ))
                               }
                            </Select>
                        </Grid>
 
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOptions} fullWidth onChange={(e)=> setshippingOption(e.target.value)}>
                            {
                                opt.map((item)=> (
                                    <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                
                                </MenuItem>
                                ))
                            }
                            </Select>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
