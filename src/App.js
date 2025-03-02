import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("Tudo");

  const getData = async () => {
    try {
      const url = "https://sheets.googleapis.com/v4/spreadsheets/1nKRquKGNROYY7YM9-MJYOcOIe3yCvwqdcMg0zajSLn8/values/A1:Z1000?key=AIzaSyCvyDEdFullpTwOauz94iQdpMM3wZSoSpE";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ao carregar dados: ${response.statusText}`);
      }
      const sheetData = await response.json();

      const [headers, ...rows] = sheetData.values;
      const formattedData = rows.map((row) => {
        const item = {};
        headers.forEach((header, index) => {
          item[header.toLowerCase()] = row[index];
        });
        return item;
      });
      setData(formattedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredData = data.filter((item) => {
    if (filter === "Tudo") return true;
    return item.status === filter;
  });

  return (
    <div class="app">
      <div class="header-logo">
        <img src="/logo.png" alt="Logo" />
      </div>

      {loading ? (
        <p class="loading-message">Carregando...</p>
      ) : error ? (
        <p class="error-message">Erro: {error}</p>
      ) : data.length === 0 ? (
        <p class="no-data-message">Nenhum dado disponível.</p>
      ) : (
        <>
          <div class="camera-filter">
            <button
              class={`filter-btn ${filter === "Tudo" ? "active" : ""}`}
              onClick={() => setFilter("Tudo")}
            >
              Tudo
            </button>
            <button
              class={`filter-btn ${filter === "Online" ? "active" : ""}`}
              onClick={() => setFilter("Online")}
            >
              Online
            </button>
            <button
              class={`filter-btn ${filter === "Offline" ? "active" : ""}`}
              onClick={() => setFilter("Offline")}
            >
              Offline
            </button>
            <button
              class={`filter-btn ${filter === "Erro" ? "active" : ""}`}
              onClick={() => setFilter("Erro")}
            >
              Erro
            </button>
            <button
              class={`filter-btn ${filter === "Sem sinal" ? "active" : ""}`}
              onClick={() => setFilter("Sem sinal")}
            >
              Sem sinal
            </button>
          </div>

          <div class="camera-container">
            {filteredData.map((camera, index) => (
              <div key={index} className="camera-card">
                <div
                  className={`status-dot ${
                    camera.status === "Online"
                      ? "online"
                      : camera.status === "Sem sinal"
                      ? "no-signal"
                      : camera.status === "Offline"
                      ? "offline"
                      : "error"
                  }`}
                ></div>
                <div class="camera-details">
                  <h3>{camera.name}</h3>
                  <p>Status: {camera.status}</p>
                  <p>Última atualização: {camera["last update"]}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <button class="add-camera-btn">+</button>
    </div>
  );
}

export default App;
