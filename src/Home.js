import React, { useState, useEffect } from "react";
import "./Home.css"; // Importando o CSS externo

const Home = () => {
  const [name, setName] = useState("");
  const [block, setBlock] = useState("");
  const [description, setDescription] = useState("");
  const [blocks, setBlocks] = useState(null);
  const [URL, setURL] = useState("");

  const getData = async () => {
    try {
      const response = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1nKRquKGNROYY7YM9-MJYOcOIe3yCvwqdcMg0zajSLn8/values/Blocos?key=AIzaSyCvyDEdFullpTwOauz94iQdpMM3wZSoSpE"
      );
      const data = await response.json();

      console.log("Dados da planilha:", data);

      if (data.values) {
        const blockList = data.values.slice(1).map((row) => row[1]);
        setBlocks(blockList);
      } else {
        setBlocks([]);
        console.error("Nenhum dado encontrado na planilha.");
      }
    } catch (error) {
      setBlocks([]);
      console.error("Erro ao buscar dados da planilha:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Nome: ${name}, URL: ${URL}, Bloco: ${block}, Descrição: ${description}`
    );
  };

  const isFormValid = name && URL && block && description;

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="URL"
          value={URL}
          onChange={(e) => setURL(e.target.value)}
          className="input"
        />

        <select
          value={block}
          onChange={(e) => setBlock(e.target.value)}
          className="input"
          disabled={!blocks}
        >
          <option value="">Selecione um bloco</option>
          {blocks && blocks.length > 0 ? (
            blocks.map((blockName, index) => (
              <option key={index} value={blockName}>
                {blockName}
              </option>
            ))
          ) : blocks === null ? null : (
            <option disabled>Nenhum bloco encontrado</option>
          )}
        </select>

        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />

        <button
          type="submit"
          className={isFormValid ? "buttonEnabled" : "buttonDisabled"}
          disabled={!isFormValid}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Home;
