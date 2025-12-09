import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const productAPI = {
  // create
  createProduct: (productData) => api.post("products/", productData),

  // read
  getAllProducts: () => api.get("products/"),
  getProduct: (id) => api.get(`products/${id}/`),

  // update

  updateProduct: (id, productData) => api.put(`products/${id}/`, productData),
  patchProduct: (id, productData) => api.patch(`products/${id}/`, productData),

  // delete
  deleteProduct: (id, productData) => api.delete(`products/${id}/`),
};
export default productAPI;
