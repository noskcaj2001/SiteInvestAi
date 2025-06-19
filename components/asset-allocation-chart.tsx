"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface AssetAllocationChartProps {
  assets: string[]
  weights: number[]
}

export function AssetAllocationChart({ assets, weights }: AssetAllocationChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || !assets.length || !weights.length) return

    // Destruir o gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Gerar cores para cada ativo
    const backgroundColors = assets.map((_, index) => `hsl(${index * 40}, 70%, 50%)`)

    // Criar o gráfico
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: assets,
          datasets: [
            {
              data: weights.map((w) => w * 100),
              backgroundColor: backgroundColors,
              borderColor: "white",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                font: {
                  size: 12,
                },
                generateLabels: (chart) => {
                  const data = chart.data
                  if (data.labels && data.datasets.length) {
                    return data.labels.map((label, i) => {
                      const value = data.datasets[0].data[i] as number
                      return {
                        text: `${label}: ${value.toFixed(1)}%`,
                        fillStyle: backgroundColors[i],
                        strokeStyle: "white",
                        lineWidth: 2,
                        hidden: false,
                        index: i,
                      }
                    })
                  }
                  return []
                },
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || ""
                  const value = context.raw as number
                  return `${label}: ${value.toFixed(2)}%`
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
  }, [assets, weights])

  return <canvas ref={chartRef} />
}
