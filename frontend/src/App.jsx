import { use, useEffect, useState } from "react";
import ProductApi from "./services/api.js";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [editng, setEditing] = useState(null);

  // получить все продукты

  const fetchProducts = async () => {
    try {
      const response = await ProductApi.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.log("Ошибка:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="App">
        <h1>CRUD Products</h1>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <div className="product-card">
            <h3>{product.name}</h3>
            <p>Цена: ${product.price}</p>
            <p>{product.description}</p>
            <p>
              <small>
                Создан: {new Date(product.created_at).toLocaleDateString()}
              </small>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
