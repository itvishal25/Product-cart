import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem, setCart, updateCart } from '../redux/action';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CartListPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/cart/list');
        dispatch(setCart(response.data));
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeCartItem(cartItem._id));
  };

  const handleUpdateQuantity = (cartItem, newQuantity) => {
    dispatch(updateCart({ ...cartItem, quantity: parseInt(newQuantity, 10) || 0 }));
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) =>
        total + item.quantity * (item.productId ? item.productId.unitPrice || 0 : 0),
      0
    );
  };

  return (
    <div className="container mt-4">
      <h2>Cart List</h2>
      {loading ? (
        <p>Loading cart...</p>
      ) : cart.length > 0 ? (
        <>
          {cart
            .filter((item) => item.productId)
            .map((item) => (
              <Card key={item._id} className="mb-3">
                <Card.Body>
                  <Card.Title>{item.productId.name}</Card.Title>
                  {item.productId && (
                    <>
                      {item.productId.image && (
                        <Card.Img src={`http://localhost:4000/uploads/${item.productId.image}`} alt="Product Image" />
                      )}
                      <Card.Text>
                        Unit Price: ${item.productId.unitPrice.toFixed(2)}
                      </Card.Text>
                      <Card.Text>
                        Total Price: ${(item.quantity * item.productId.unitPrice).toFixed(2)}
                      </Card.Text>
                      <Form.Group controlId={`quantity_${item._id}`}>
                        <Form.Label>Quantity:</Form.Label>
                        <Form.Control
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item, e.target.value)}
                        />
                      </Form.Group>
                    </>
                  )}
                  <Button variant="danger" onClick={() => handleRemoveFromCart(item)}>
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            ))}
          <div className="mb-4">
            <strong>Total Price: ${calculateTotalPrice().toFixed(2)}</strong>
          </div>
          <Button variant="primary" onClick={() => alert('Order placed!')}>
            Place Order
          </Button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartListPage;
