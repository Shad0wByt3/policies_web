import React, { useEffect, useState } from "react";
import "./Policy.css";

const API_URL = process.env.REACT_APP_API_URL;

function CreatePolicy() {
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedSku, setSelectedSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${API_URL}/employee/list`);
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        } else {
          throw new Error("Error al obtener la lista de empleados.");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/inventory/list`);
        if (response.ok) {
          const responseData = await response.json();
          const items = responseData.data.items;
          setProducts(items);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchEmployees();
    fetchProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEmployee || !selectedSku || !quantity) {
      setErrorMessage("Por favor, completa todos los campos.");
      setSuccessMessage("");
      return;
    }

    const newPolicy = {
      employee: selectedEmployee,
      sku: Number(selectedSku),
      quantity: parseInt(quantity, 10),
    };

    fetch(`${API_URL}/policie/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPolicy),
    })
      .then((response) => {
        return response.json().then((data) => {
          if (response.ok) {
            setSuccessMessage("Póliza creada exitosamente.");
            setErrorMessage("");
            setSelectedEmployee("");
            setSelectedSku("");
            setQuantity("");
          } else {
            const error = new Error("Error al crear la póliza.");
            error.data = data;
            throw error;
          }
        });
      })
      .catch((error) => {
        if (error.data && error.data.data && error.data.data.mensaje) {
          setErrorMessage(error.data.data.mensaje);
        } else {
          setErrorMessage(error.message);
        }
        setSuccessMessage("");
      });
  };

  return (
    <div className="create-policy">
      <h2>Crear Póliza</h2>
      {successMessage && <p className="mensaje-exito">{successMessage}</p>}
      {errorMessage && <p className="mensaje-error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employee">Empleado:</label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            required
          >
            <option value="">Selecciona un empleado</option>
            {employees.map((employee) => (
              <option key={employee.username} value={employee.username}>
                {employee.name} {employee.lastname}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sku">Producto: </label>
          <select
            id="sku"
            value={selectedSku}
            onChange={(e) => setSelectedSku(e.target.value)}
            required
          >
            <option value="">Selecciona un producto</option>
            {products.map((product) => (
              <option key={product.sku} value={product.sku}>
                {product.name} (SKU: {product.sku})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Cantidad:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </div>

        <button type="submit">Crear Póliza</button>
      </form>
    </div>
  );
}

export default CreatePolicy;
