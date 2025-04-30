import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import surveyQuestions from "../data/surveyQuestions";
import "../styles/dashboard.css";
import "../styles/global.css";
import Logo from "../components/Logo";

// Register Chart.js plugin once
Chart.register(ChartDataLabels);

// Helper to aggregate survey responses
const aggregateResponses = (data, questionId) => {
  const counts = {};
  data.forEach(entry => {
    const responses = entry.responses;
    if (!responses || typeof responses !== "object") return;

    const response = responses[questionId];
    if (response) {
      const values = Array.isArray(response) ? response : [response];
      values.forEach(val => {
        counts[val] = (counts[val] || 0) + 1;
      });
    }
  });
  return counts;
};

export default function Dashboard({ user, isAuthenticated, surveyData }) {
  const chartRefs = useRef({});
  const charts = useRef({});
  const [chartType, setChartType] = useState("pie");

  useEffect(() => {
    if (!Array.isArray(surveyData) || surveyData.length === 0) return;

    surveyQuestions.forEach(({ questionId }) => {
      const canvas = chartRefs.current[questionId];
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const data = aggregateResponses(surveyData, questionId);

      // Destroy existing chart instance
      if (charts.current[questionId]) {
        charts.current[questionId].destroy();
      }

      charts.current[questionId] = new Chart(ctx, {
        type: chartType,
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: questionId,
            data: Object.values(data),
            backgroundColor: [
              "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
              "#FF9F40", "#E7E9ED", "#76A21E", "#C71F37", "#00A6B4"
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              formatter: (value, context) => {
                const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${percentage}%`;
              },
              color: "#000",
              font: {
                weight: "bold",
                size: 13
              }
            },
            legend: {
              position: "bottom"
            }
          }
        }
      });
    });
  }, [surveyData, chartType]);

  if (!isAuthenticated) {
    return (
      <>
        <Logo />
        <div className="dashboard-container">
          <h1>Error - 404, Cannot Access this Page!</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Logo />
      <div className="dashboard-controls">
        <label htmlFor="chartType">Chart Type:</label>
        <select
          id="chart-type"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="pie">Pie</option>
          <option value="doughnut">Doughnut</option>
          <option value="bar">Bar</option>
        </select>
      </div>

      <div className="charts-container">
        {surveyQuestions.map(({ questionId, question }) => (
          <div key={questionId} className="chart-block">
            <h3>{question}</h3>
            <canvas
              ref={(el) => (chartRefs.current[questionId] = el)}
              width={400}
              height={400}
            />
          </div>
        ))}
      </div>

      <button className="blue-button">Download</button>
    </>
  );
}



