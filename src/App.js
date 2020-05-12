import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(res => setRepositories(res.data));
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post("/repositories", {
      title: `Repositório ${Date.now()}`,
      owner: "Bruno Pinheiro",
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    const repos = repositories.filter(repo => repo.id !== id);
    await api.delete(`/repositories/${id}`);
    setRepositories(repos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
