import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewProducts.css";
import Admin from "./Admin";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
      navigate("/customer");
    } else if (sessionStorage.getItem("userRole") === "ADMIN") {
      navigate("/admin");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
  
        const response = await axios.get("http://localhost:8080/admin/getAllVehicle", config); // Use axios.get with config
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);
  


  const handleEdit = (id) => {
    if (id) {
      navigate(`/admin/editproduct/${id}`);
    } else {
      console.error("Product ID is undefined");
    }
  };
  

  return (
    <Admin>
      <div className="view-products-container">
        <h3>View Vehicles</h3>
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.vehicleName}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.categoryName}</td>
                  <td>{product.description}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewProducts;
