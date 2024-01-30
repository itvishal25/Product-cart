import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, addToCart } from '../redux/action';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products/list');
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleAddToCart = async (product) => {
    try {
      // Send a request to the server to add the product to the cart
      await axios.post('http://localhost:4000/cart/add', {
        productId: product._id,
        quantity: 1,
      });

      // Dispatch the addToCart action to update the Redux store
      dispatch(addToCart({ ...product, quantity: 1 }));

      // Optional: Show a notification or redirect to the cart page
      navigate('/cartlist');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Product List</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={`/uploads/${product.image}`}
                alt={product.name}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: ${product.unitPrice.toFixed(2)}</Card.Text>
                <Button variant="primary" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
