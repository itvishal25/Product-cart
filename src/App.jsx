// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProductForm from "./components/ProductPage";
import ProductList from "./components/ProductListPage";
import CartList from "./components/CartList";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ProductForm />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/cartlist" element={<CartList />} />
          </Routes>
        </div> 
      </Router>
    </Provider>
  );
}

export default App;
