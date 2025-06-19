"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface Asset {
  symbol: string
  name: string
  weight: number
}

interface RoboPortfolioChartProps {
  assets: Asset[]
}

export function RoboPortfolioChart({ assets }: RoboPortfolioChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || !assets.length) return

    // Destruir o gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Gerar cores para cada ativo
    const backgroundColors = assets.map((_, index) => `hsl(${(index * 360) / assets.length}, 70%, 60%)`)

    // Criar o gráfico
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: assets.map((asset) => asset.symbol),
          datasets: [
            {
              data: assets.map((asset) => asset.weight * 100),
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
                      const asset = assets[i]
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
                  const asset = assets[context.dataIndex]
                  const value = context.raw as number
                  return [`${asset.symbol}: ${value.toFixed(2)}%`, `${asset.name}`]
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
  }, [assets])

  return <canvas ref={chartRef} />
}
