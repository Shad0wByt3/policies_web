import React, { useState } from "react";
import "./Inventory.css";
const API_URL = process.env.REACT_APP_API_URL;
function CreateProduct() {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");

  const [successMessage, setsuccessMessage] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !sku || !quantity) {
      seterrorMessage("Por favor, completa todos los campos.");
      setsuccessMessage("");
      return;
    }

    const newProduct = {
      sku,
      name,
      quantity,
    };

    fetch(`${API_URL}/inventory/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        return response.json().then((data) => {
          if (response.ok) {
            // La solicitud fue exitosa
            return data;
          } else {
            // La solicitud falló, lanzamos un error con los datos de la respuesta
            const error = new Error("Error al crear producto.");
            error.data = data;
            throw error;
          }
        });
      })
      .then((data) => {
        // Operaciones en caso de éxito
        setsuccessMessage("Producto creado exitosamente.");
        seterrorMessage("");

        setName("");
        setSku("");
        setQuantity("");
      })
      .catch((error) => {
        // Manejamos el error y mostramos el mensaje apropiado
        if (error.data && error.data.data && error.data.data.mensaje) {
          // Mostramos el mensaje de error devuelto por la API
          seterrorMessage(error.data.data.mensaje);
        } else {
          // Mostramos un mensaje de error genérico
          seterrorMessage(error.message);
        }
        setsuccessMessage("");
      });
  };

  return (
    <div className="create-product">
      <h2>Crear producto</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre del producto:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sku">sku:</label>
          <input
            type="text"
            id="sku"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="position">Cantidad:</label>
          <input
            type="number"
            id="position"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <button type="submit">Crear producto</button>
      </form>
    </div>
  );
}

export default CreateProduct;
