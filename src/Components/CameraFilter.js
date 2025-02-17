import React from "react";

function CameraFilter({ filter, setFilter }) {
  return (
    <div className="camera-filter">
      {["Tudo", "Online", "Offline", "Erro", "Sem sinal"].map((status) => (
        <button
          key={status}
          className={`filter-btn ${filter === status ? "active" : ""}`}
          onClick={() => setFilter(status)}
        >
          {status}
        </button>
      ))}
    </div>
  );
}

export default CameraFilter;
