import React from 'react';
import { Link } from 'react-router-dom'
import { Container, Typography ,Button, Grid  } from '@material-ui/core'
import useStyles from './Style'
import CartItem from './CartItem/CartItem';
//>>>>>>>>>>>>>
const Cart = ({ cart, handleUpdateQty ,handleRemoveCart,  handleEmptyCart }) => {
    // console.log(cart, "cart is now in Cart")
    //  const isEmpty =;
     const classes = useStyles()

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            you have no items in your shopping cart , start adding some!
            <Link to="/" className={classes.link}>
            Start adding some
            </Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
        <Grid container spacing={3}>
            {
                cart.line_items.map((lineItem) => (
                <Grid item xs={12} sm={4} key={lineItem.id}>
                    <CartItem item={lineItem} handleUpdateQty={handleUpdateQty} handleRemoveCart={handleRemoveCart} handleEmptyCart={handleEmptyCart} />
                </Grid>
                ))
            }            
           
        </Grid>
        <div className={classes.cardDetails} gutterBottom>
            <Typography variant="h4">
                subtotal: {cart.subtotal.formatted_with_symbol}
            </Typography>
            <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
            <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
        </>
    );
    if(!cart.line_items) return 'loading...'


    return (
        <>
            <Container>
                <div className={classes.toolbar} />
                <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
                {
                    !cart.line_items.length ? <EmptyCart /> : <FilledCart />
                }
                
            </Container>
        </>
    )
}
export default Cart;