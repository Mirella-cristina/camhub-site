import React from "react";

function CameraCard({ camera }) {
  return (
    <div className="camera-card">
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
      <div className="camera-details">
        <h3>{camera.name}</h3>
        <p>Status: {camera.status}</p>
        <p>Última atualização: {camera["last update"]}</p>
      </div>
    </div>
  );
}

export default CameraCard;
