"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function RiskToleranceChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destruir o gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Dados simulados de importância das features
    const labels = [
      "Idade",
      "Horizonte de Tempo",
      "Experiência",
      "Renda",
      "Patrimônio",
      "Escolaridade",
      "Estado Civil",
      "Dependentes",
    ]

    const importanceValues = [0.18, 0.22, 0.19, 0.12, 0.15, 0.06, 0.04, 0.04]

    // Criar o gráfico
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Importância da Feature",
              data: importanceValues,
              backgroundColor: "rgba(59, 130, 246, 0.7)",
              borderColor: "rgba(59, 130, 246, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => `Importância: ${((context.raw as number) * 100).toFixed(1)}%`,
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              max: 0.3,
              ticks: {
                callback: (value) => `${(Number(value) * 100).toFixed(0)}%`,
              },
            },
            y: {
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
          },
        },
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} />
}
