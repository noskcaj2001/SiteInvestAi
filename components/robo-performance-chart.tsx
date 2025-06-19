"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface PerformanceData {
  month: number
  value: number
  cumulativeReturn: number
}

interface RoboPerformanceChartProps {
  data: PerformanceData[]
}

export function RoboPerformanceChart({ data }: RoboPerformanceChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || !data.length) return

    // Destruir o gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Preparar dados para o gráfico
    const labels = data.map((point) => {
      const years = Math.floor(point.month / 12)
      const months = point.month % 12
      if (point.month === 0) return "Início"
      if (months === 0) return `${years} ano${years > 1 ? "s" : ""}`
      return `${years}a ${months}m`
    })

    // Criar o gráfico
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Valor da Carteira",
              data: data.map((point) => point.value),
              borderColor: "rgba(59, 130, 246, 1)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              borderWidth: 3,
              fill: true,
              tension: 0.1,
              pointBackgroundColor: "rgba(59, 130, 246, 1)",
              pointBorderColor: "white",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
            mode: "index",
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                title: (context) => {
                  const point = data[context[0].dataIndex]
                  const years = Math.floor(point.month / 12)
                  const months = point.month % 12
                  if (point.month === 0) return "Investimento Inicial"
                  return `Após ${years} ano${years !== 1 ? "s" : ""} e ${months} mês${months !== 1 ? "es" : ""}`
                },
                label: (context) => {
                  const value = context.raw as number
                  const point = data[context.dataIndex]
                  return [
                    `Valor: $${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
                    `Retorno: ${(point.cumulativeReturn * 100).toFixed(2)}%`,
                  ]
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Tempo",
              },
              grid: {
                display: false,
              },
            },
            y: {
              title: {
                display: true,
                text: "Valor da Carteira (USD)",
              },
              ticks: {
                callback: (value) => `$${Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
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
  }, [data])

  return <canvas ref={chartRef} />
}
