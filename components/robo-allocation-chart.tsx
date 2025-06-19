"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface Asset {
  symbol: string
  name: string
  weight: number
}

interface RoboAllocationChartProps {
  assets: Asset[]
}

export function RoboAllocationChart({ assets }: RoboAllocationChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || !assets.length) return

    // Destruir o gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Ordenar ativos por peso (maior para menor)
    const sortedAssets = [...assets].sort((a, b) => b.weight - a.weight)

    // Criar o gráfico
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: sortedAssets.map((asset) => asset.symbol),
          datasets: [
            {
              label: "Alocação (%)",
              data: sortedAssets.map((asset) => asset.weight * 100),
              backgroundColor: sortedAssets.map((_, index) => `hsl(${(index * 360) / sortedAssets.length}, 70%, 60%)`),
              borderColor: sortedAssets.map((_, index) => `hsl(${(index * 360) / sortedAssets.length}, 70%, 50%)`),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                title: (context) => {
                  const asset = sortedAssets[context[0].dataIndex]
                  return asset.name
                },
                label: (context) => {
                  const value = context.raw as number
                  return `Alocação: ${value.toFixed(2)}%`
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Ativos",
              },
              ticks: {
                font: {
                  size: 12,
                  weight: "bold",
                },
              },
            },
            y: {
              title: {
                display: true,
                text: "Alocação (%)",
              },
              beginAtZero: true,
              ticks: {
                callback: (value) => `${value}%`,
              },
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
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
