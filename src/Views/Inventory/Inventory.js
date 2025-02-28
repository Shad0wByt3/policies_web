import React, { useEffect, useState } from "react";
import "./Inventory.css";
import RowProduct from "../../Components/Inventory/RowProduct";

const API_URL = process.env.REACT_APP_API_URL;

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`${API_URL}/inventory/list`);
        if (response.ok) {
          const responseData = await response.json();
          const items = responseData.data.items;
          setInventory(items);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="list-product">
      <h2>Lista de productos</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {inventory.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((product) => (
              <RowProduct key={product.sku} product={product} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
}

export default Inventory;
