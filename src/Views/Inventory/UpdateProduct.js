import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Inventory.css";

const API_URL = process.env.REACT_APP_API_URL;

function UpdateProduct() {
  const navigate = useNavigate();
  const { sku } = useParams();
  const [product, setProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/inventory/product/${sku}`);
        if (response.ok) {
          const responseData = await response.json();
          const items = responseData.data.items;

          if (items && items.length > 0) {
            setProduct(items[0]);
          } else {
            throw new Error("Producto no encontrado.");
          }
        } else {
          throw new Error("Error al obtener los datos del producto.");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchProduct();
  }, [sku]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFields = {};
    ["name", "quantity"].forEach((field) => {
      if (product[field] && product[field].toString().trim() !== "") {
        updatedFields[field] =
          field === "quantity" ? Number(product[field]) : product[field];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      setErrorMessage("Por favor, ingresa al menos un campo para actualizar.");
      setSuccessMessage("");
      return;
    }

    fetch(`${API_URL}/inventory/update/${sku}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    })
      .then((response) => {
        return response.json().then((data) => {
          if (response.ok) {
            setSuccessMessage("Producto actualizado exitosamente.");
            setErrorMessage("");

            setTimeout(() => {
              navigate("/inventory/list");
            }, 1000);
          } else {
            const errorMsg =
              data?.data?.mensaje || "Error al actualizar el producto.";
            throw new Error(errorMsg);
          }
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSuccessMessage("");
      });
  };

  if (!product) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="update-product">
      <h2>Actualizar Producto</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre del producto:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Cantidad:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity || ""}
            onChange={handleInputChange}
            min="0"
          />
        </div>

        <button type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
