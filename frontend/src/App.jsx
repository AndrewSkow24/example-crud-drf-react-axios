import { use, useEffect, useState } from "react";
import ProductApi from "./services/api.js";
import "./App.css";
import productAPI from "./services/api.js";

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [editngId, setEditingId] = useState(null);

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

  // обработчик изменения формы
  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  // создать продкут
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await productAPI.createProduct(formData);
      fetchProducts();
      setFormData({
        name: "",
        price: "",
        description: "",
      });
    } catch (error) {
      console.log("Ошибка создания:", error);
    }
  };

  // начать редактирование
  const startEdit = (product) => {
    startEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
    });
  };

  // обновить продукт

  // удалить

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
