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
  const [editingId, setEditingId] = useState(null);

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
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
    });
  };

  // обновить продукт
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await ProductApi.updateProduct(editingId, formData);
      fetchProducts();
      setEditingId(null);
      setFormData({
        name: "",
        price: "",
        description: "",
      });
    } catch (error) {
      console.log("Ошибка обновления:", error);
    }
  };

  // удалить
  const handleDelete = async (id) => {
    if (window.confirm("Вы уверены, что хотите удалить этот продукт ?")) {
      try {
        await ProductApi.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error("Ошибка удаления:", error);
      }
    }
  };

  // отмена редактирования
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: "",
      price: "",
      description: "",
    });
  };

  return (
    <div className="App">
      <form onSubmit={editingId ? handleUpdate : handleCreate} className="form">
        <input
          type="text"
          name="name"
          placeholder="Название"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Цена"
          value={formData.price}
          onChange={handleChange}
          required
          step="0.01"
        />
        <textarea
          name="description"
          placeholder="Описание"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit">{editingId ? "Обновить" : "Создать"}</button>
        {editingId && (
          <button type="button" onClick={cancelEdit}>
            Отмена
          </button>
        )}
      </form>

      <div className="App">
        <h1>CRUD Products</h1>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>Цена: ${product.price}</p>
            <p>{product.description}</p>
            <p>
              <small>
                Создан: {new Date(product.created_at).toLocaleDateString()}
              </small>
            </p>

            <div className="actions">
              <button onClick={() => startEdit(product)}>Редактировать</button>
              <button onClick={() => handleDelete(product.id)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
