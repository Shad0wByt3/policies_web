import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Employee.css";

const API_URL = process.env.REACT_APP_API_URL;

function UpdateEmployee() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [employee, setEmployee] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`${API_URL}/employee/${username}`);
        if (response.ok) {
          const data = await response.json();
          setEmployee(data);
        } else {
          throw new Error("Error al obtener los datos del empleado.");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchEmployee();
  }, [username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si al menos un campo ha sido modificado
    const updatedFields = {};
    ["name", "lastname", "position", "password"].forEach((field) => {
      if (employee[field] && employee[field].trim() !== "") {
        updatedFields[field] = employee[field];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      setErrorMessage("Por favor, ingresa al menos un campo para actualizar.");
      setSuccessMessage("");
      return;
    }

    fetch(`${API_URL}/employee/update/${username}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage("Empleado actualizado exitosamente.");
          setErrorMessage("");

          setTimeout(() => {
            navigate("/employee/list");
          }, 1000);
        } else {
          throw new Error("Error al actualizar el empleado.");
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSuccessMessage("");
      });
  };

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  if (!employee) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="update-employee">
      <h2>Actualizar Empleado</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={employee.name || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Apellido:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            defaultValue={employee.lastname || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={employee.password || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="position">Puesto:</label>
          <input
            type="text"
            id="position"
            name="position"
            defaultValue={employee.position || ""}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Actualizar Empleado</button>
      </form>
    </div>
  );
}

export default UpdateEmployee;
