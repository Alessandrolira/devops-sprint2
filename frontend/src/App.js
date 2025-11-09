import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/users`).then((res) => setUsers(res.data));
  }, []);

  const addUser = () => {
    axios.post(`${API_URL}/users`, { name, email }).then((res) => {
      setUsers([...users, res.data]);
      setName("");
      setEmail("");
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Cadastro de Usuários</h1>
      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addUser}>Adicionar</button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
