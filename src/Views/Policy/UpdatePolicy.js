import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Policy.css";

const API_URL = process.env.REACT_APP_API_URL;

function UpdatePolicy() {
  const navigate = useNavigate();
  const { id } = useParams(); // Asumo que el ID de la póliza se obtiene de los parámetros de la ruta
  const [policy, setPolicy] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await fetch(`${API_URL}/policie/${id}`);
        if (response.ok) {
          const responseData = await response.json();
          const items = responseData.data.items;

          if (items && items.length > 0) {
            setPolicy(items[0]);
            setSelectedEmployee(items[0].employee);
          } else {
            throw new Error("Póliza no encontrada.");
          }
        } else {
          throw new Error("Error al obtener los datos de la póliza.");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    // Función para obtener la lista de empleados disponibles
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

    fetchPolicy();
    fetchEmployees();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEmployee) {
      setErrorMessage("Por favor, selecciona un empleado.");
      setSuccessMessage("");
      return;
    }

    const updatedPolicy = {
      employee: selectedEmployee,
    };

    let policyId = parseInt(id);
    fetch(`${API_URL}/policie/update/${policyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPolicy),
    })
      .then((response) => {
        return response.json().then((data) => {
          if (response.ok) {
            setSuccessMessage("Póliza actualizada exitosamente.");
            setErrorMessage("");

            setTimeout(() => {
              navigate("/policy/list");
            }, 1000);
          } else {
            const errorMsg =
              data?.data?.mensaje || "Error al actualizar la póliza.";
            throw new Error(errorMsg);
          }
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSuccessMessage("");
      });
  };

  // Manejo de estado de carga y errores
  if (!policy && !errorMessage) {
    return <p>Cargando...</p>;
  }

  if (errorMessage && !policy) {
    return (
      <div className="update-policy">
        <h2>Actualizar Póliza</h2>
        <p className="error-message">{errorMessage}</p>
      </div>
    );
  }

  if (!policy) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="update-policy">
      <h2>Actualizar Póliza</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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

        <button type="submit">Actualizar Póliza</button>
      </form>
    </div>
  );
}

export default UpdatePolicy;
