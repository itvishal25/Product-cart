import { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
  
    const [product, setProduct] = useState({
      productName: '',
      productImage: null,
      description: '',
      quantity: 0,
      unitPrice: 0,
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setProduct((prevProduct) => ({ ...prevProduct, productImage: file }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setLoading(true); // Set loading to true before making the API call
  
      // Create FormData to handle file uploads
      const formData = new FormData();
      formData.append('name', product.productName);
      formData.append('productImage', product.productImage);
      formData.append('description', product.description);
      formData.append('quantity', product.quantity);
      formData.append('unitPrice', product.unitPrice);
  
      try {
        // Make a POST request to your backend endpoint
        const response = await axios.post('http://localhost:4000/products/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('Product added successfully:', response.data);
        // Add additional logic if needed, e.g., redirect to the product list page
        navigate('/productlist');

      } catch (error) {
        console.error('Error adding product:', error);
      } finally {
        setLoading(false); // Set loading to false after API call is complete
      }
    };
  
  return (
    <div className="container mt-4">
      <h2>Create Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="productName"
            value={product.productName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productImage">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter product description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="unitPrice">
          <Form.Label>Unit Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter unit price"
            name="unitPrice"
            value={product.unitPrice}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Create Product'}
        </Button>
      </Form>
    </div>
  );
};

export default ProductPage;
