import React from "react";
// import { Chart as Chartjs, LineElement, PointElement, Tooltip, Legend, RadialLinearScale } from "chart.js";
import { Radar } from "react-chartjs-2";
const RadarChart = ({ rows }) => {
  const formatData = (data = []) => {
    const labels = [];
    const inbox = [];
    const archives = [];
    const erreurs = [];
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      labels.push(data[i].client);
      inbox.push(data[i].inbox);
      archives.push(data[i].archive);
      erreurs.push(data[i].erreur);
    }
    return {
      labels,
      inbox,
      archives,
      erreurs,
    };
  };
  const { labels, inbox, archives, erreurs } = formatData(rows);
  const data = {
    labels,
    datasets: [
      {
        label: "Reçu",
        data: inbox,
        fill: true,
        backgroundColor: "rgba(245, 227, 23, 0.2)",
        borderColor: "rgb(245, 227, 23)",
        pointBackgroundColor: "rgb(245, 227, 23)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(245, 227, 23)",
      },
      {
        label: "Exécutés",
        data: archives,
        fill: true,
        backgroundColor: "#0080005c",
        borderColor: "#008000eb",
        pointBackgroundColor: "#008000eb",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#008000eb",
      },
      {
        label: "Erreurs",
        data: erreurs,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };
  const options = {};
  return (
    <div className="chart-container">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
