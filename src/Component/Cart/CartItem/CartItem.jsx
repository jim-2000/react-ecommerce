import React from 'react'
import { Typography, Button, Card, 
    CardContent,
    CardMedia,
    CardActions

 } from '@material-ui/core'
 import useStyles from './Styles'
function CartItem({item, handleRemoveCart , handleUpdateQty}) {
    const classes = useStyles()
    return (
        <div>
            <Card>
                <CardMedia image={item.media.source } alt={item.name} className={classes.media} />
                <CardContent className={classes.cardContent}>
                    <Typography variant="h4" >{item.name}</Typography>
                    <Typography variant="h5" >{item.line_total.formatted_with_symbol}</Typography>
                </CardContent>
                <CardActions className={classes.cartActions}>
                    <div className={classes.buttons}>
                            <Button type="button" size="small" onClick={()=> handleUpdateQty(item.id, item.quantity - 1)}>-</Button>
                            <Typography>{item.quantity}</Typography>
                            <Button type="button" size="small" onClick={()=> handleUpdateQty(item.id, item.quantity + 1)}>+</Button>
                    </div>
                    <Button variant="contained" type="button" color="secondary" onClick={()=> handleRemoveCart(item.id)}>Remove</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default CartItem
