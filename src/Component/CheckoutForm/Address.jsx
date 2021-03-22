import React,{useState} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './CustomTextField'
import { commerce } from '../../lib/commerce'
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const AddressForm = () => {
const methods = useForm()
const [shippingCountry, setShippingCountry] = useState([])
const [Country, setCountry] = useState('')
const [SubDivition, setSubDivition] = useState('')
const [shippingSubDivition, setshippingSubDivition] = useState([])
const [shippingOptions, setshippingOption] = useState('')
const [Options, setOptions] = useState([])
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            <FormProvider {...methods}>
                <form onSubmit={""}>
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
                            <Select value={} fullWidth onChange>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping SubDivition</InputLabel>
                            <Select value={} fullWidth onChange>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={} fullWidth onChange>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
