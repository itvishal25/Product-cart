// reducer.js
const initialState = {
    products: [],
    cart: [],
  };
  
  const updateCartItem = (cart, updatedItem) => {
    return cart.map((item) =>
      item._id === updatedItem._id ? { ...item, quantity: updatedItem.quantity } : item
    );
  };
  
  const removeCartItem = (cart, cartItemId) => {
    return cart.filter((item) => item._id !== cartItemId);
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return { ...state, products: action.payload };
      case 'ADD_TO_CART':
        return { ...state, cart: [...state.cart, action.payload] };
      case 'UPDATE_CART':
        return { ...state, cart: updateCartItem(state.cart, action.payload) };
      case 'SET_CART':
        return { ...state, cart: action.payload };
      case 'REMOVE_CART_ITEM':
        return { ...state, cart: removeCartItem(state.cart, action.payload) };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  