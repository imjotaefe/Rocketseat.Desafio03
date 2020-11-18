import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const newRepository = {
      url: "https://github.com/Rocketseat/umbriel",
      title: "Umbriel",
      techs: ["Node", "Express", "TypeScript"]
    }
    const response = await api.post('repositories', newRepository);
    const repository = response.data;
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    if(response.status === 204){
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      const auxRepositories = repositories;
      auxRepositories.splice(repositoryIndex, 1);
      setRepositories([...auxRepositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
