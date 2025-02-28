import React from "react";
import { useNavigate } from "react-router-dom";
import "./RowProduct.css";
const API_URL = process.env.REACT_APP_API_URL;

function RowProduct({ product }) {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/inventory/update/${product.sku}`);
  };

  const handleDelete = () => {
    if (
      window.confirm(`¿Estás seguro de que deseas eliminar ${product.name}?`)
    ) {
      fetch(`${API_URL}/inventory/delete/${product.sku}`, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json().then((data) => {
            if (response.ok) {
              window.location.reload();
            } else {
              const error = new Error("Error al eliminar el producto.");
              error.data = data;
              throw error;
            }
          });
        })
        .catch((error) => {
          console.error(error);
          if (error.data && error.data.data && error.data.data.mensaje) {
            alert(error.data.data.mensaje);
          } else {
            alert("Hubo un error al eliminar el producto.");
          }
        });
    }
  };

  return (
    <tr>
      <td>{product.sku}</td>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td>
        <button onClick={handleUpdate}>Actualizar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </td>
    </tr>
  );
}

export default RowProduct;
