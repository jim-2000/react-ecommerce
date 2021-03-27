import React,{useState,useEffect} from 'react'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom'
import { 
  Products, Navbar,
  Cart,Checkout,
  NotFound,

} from './Component'
import Footer from './Component/Footer/Footer';

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {  
    setCart(await commerce.cart.retrieve());
  };
  
  const handleAddToCart = async (productId,quantity) => {
    const {cart} = await commerce.cart.add(productId, quantity)
    setCart(cart);   
}
const handleUpdateQty = async (productId, quantity) => {
  const {cart} = await commerce.cart.update(productId,{quantity});
  setCart(cart)
}


const handleRemoveCart = async (productId) => {
  const {cart} = await commerce.cart.remove(productId);
  setCart(cart)
}

const handleEmptyCart = async () => {
  const {cart} = await commerce.cart.empty();
  setCart(cart)
}

const refreshCart = async () => {
  const newCart = await commerce.cart.refresh();
  setCart(newCart)
}

const handleCaptureCheckout = async ( CheckouTokenId, newOrder)=> {
  try {
    const incomingOrder = await commerce.checkout.capture(CheckouTokenId, newOrder)
    setOrder(incomingOrder)
    refreshCart()
  }catch (error){
    setErrorMsg(error.data.error.message)
  }
}

  useEffect(()=> {
    fetchProducts();
    fetchCart()
  },[])

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  return (
    <Router>
    <div>
      <Navbar totalItems={cart.total_items} />
      <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart}
            handleUpdateQty={handleUpdateQty}
            handleRemoveCart={handleRemoveCart}
            handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
              <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout = { handleCaptureCheckout}
              error = {errorMsg}
              />
          </Route>
          <Route component={NotFound} />
      </Switch>
      {/* <Footer /> */}
    </div>
    </Router>
  
   
  );
}

export default App;
