"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const API_URL = "http://backend:3000"; // Docker internal network

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(console.error);
  }, []);

  const addUser = async () => {
    if (!name || !email) return;
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      setUsers([...users, data]);
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-zinc-50 font-sans">
      <h1 className="text-3xl font-bold mb-6">Cadastro de Usuários</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={addUser}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-2">
        {users.map((u) => (
          <li key={u.id} className="border p-2 rounded w-80">
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
