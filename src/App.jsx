// App.jsx
import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './APis/Roustes/users.apis';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ id: '', name: '', email: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        setError(error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdating) {
        const updatedUser = await updateUser(formData.id, {
          name: formData.name,
          email: formData.email,
        });
        setUsers(users.map(user => user.id === formData.id ? updatedUser : user));
        setIsUpdating(false);
      } else {
        const newUser = await createUser({
          name: formData.name,
          email: formData.email,
        });
        setUsers([...users, newUser]);
      }
      setFormData({ id: '', name: '', email: '' });
    } catch (error) {
      setError(error);
    }
  };

  const handleUpdateClick = (user) => {
    setFormData(user);
    setIsUpdating(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex h-screen bg-snow-flurry-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
        {error && <p className="text-red-500">Error: {error.message}</p>}
        
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-2">
            <label className="block text-gray-700">Nombre</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="border rounded w-full py-2 px-3" 
              required 
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="border rounded w-full py-2 px-3" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 text-white py-2 px-4 rounded">
            {isUpdating ? 'Actualizar' : 'Crear'}
          </button>
        </form>
        
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  <button 
                    onClick={() => handleUpdateClick(user)} 
                    className="bg-blue-500 text-white py-1 px-3 mr-2 rounded">
                    Actualizar
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(user.id)} 
                    className="bg-red-500 text-white py-1 px-3 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
