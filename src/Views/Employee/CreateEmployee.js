import React, { useState } from "react";
import "./Employee.css";
const API_URL = process.env.REACT_APP_API_URL;
function CreateEmployee() {
  
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [position, setPosition] = useState("");

  const [successMessage, setsuccessMessage] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !lastname || !position) {
      seterrorMessage("Por favor, completa todos los campos.");
      setsuccessMessage("");
      return;
    }

    const newEmployee = {
      name,
      lastname,
      position,
    };
  
    fetch(`${API_URL}/employee/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al crear el empleado.");
        }
      })
      .then((data) => {
        setsuccessMessage("Empleado creado exitosamente.");
        seterrorMessage("");

        setName("");
        setLastname("");
        setPosition("");
      })
      .catch((error) => {
        seterrorMessage(error.message);
        setsuccessMessage("");
      });
  };

  return (
    <div className="create-employee">
      <h2>Crear Empleado</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Apellido:</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="position">Puesto:</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>

        <button type="submit">Crear Empleado</button>
      </form>
    </div>
  );
}

export default CreateEmployee;
