import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RowEmployee.css';
const API_URL = process.env.REACT_APP_API_URL;
function RowEmployee({ employee }) {
  const navigate = useNavigate();


  const handleUpdate = () => {
    navigate(`/employee/update/${employee.username}`);
  };

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${employee.name}?`)) {
      fetch(`${API_URL}/employee/delete/${employee.username}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            window.location.reload();
          } else {
            throw new Error('Error al eliminar el empleado.');
          }
        })
        .catch((error) => {
          console.error(error);
          alert('Hubo un error al eliminar el empleado.');
        });
    }
  };

  return (
    <tr>
      <td>{employee.username}</td>
      <td>{employee.name}</td>
      <td>{employee.lastname}</td>
      <td>{employee.position}</td>
      <td>
        <button onClick={handleUpdate}>Actualizar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </td>
    </tr>
  );
}

export default RowEmployee;
