// actions.js
export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product,
  });
  
  export const updateCart = (cartItem) => ({
    type: 'UPDATE_CART',
    payload: cartItem,
  });
  
  export const removeCartItem = (cartItemId) => ({
    type: 'REMOVE_CART_ITEM',
    payload: cartItemId,
  });
  
  export const setProducts = (products) => ({
    type: 'SET_PRODUCTS',
    payload: products,
  });
  
  export const setCart = (cartItems) => ({
    type: 'SET_CART',
    payload: cartItems,
  });
  