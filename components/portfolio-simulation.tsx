"use client"

import { useEffect, useRef, useState } from "react"
import { Chart, registerables } from "chart.js"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

Chart.register(...registerables)

interface PortfolioSimulationProps {
  expectedReturn: number
  risk: number
}

export function PortfolioSimulation({ expectedReturn, risk }: PortfolioSimulationProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [timeHorizon, setTimeHorizon] = useState("10")
  const [simulationCount, setSimulationCount] = useState("3")

  useEffect(() => {
    if (!chartRef.current) return

    // Destruir o gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Parâmetros da simulação
    const years = Number.parseInt(timeHorizon)
    const numSimulations = Number.parseInt(simulationCount)
    const initialValue = 100000 // R$ 100.000 inicial

    // Gerar simulações Monte Carlo
    const simulations = []
    for (let sim = 0; sim < numSimulations; sim++) {
      const values = [initialValue]
      let currentValue = initialValue

      for (let year = 1; year <= years; year++) {
        // Gerar retorno aleatório baseado na distribuição normal
        const randomReturn = generateNormalRandom(expectedReturn, risk)
        currentValue = currentValue * (1 + randomReturn)
        values.push(currentValue)
      }

      simulations.push(values)
    }

    // Preparar dados para o gráfico
    const labels = Array.from({ length: years + 1 }, (_, i) => i.toString())
    const datasets = simulations.map((simulation, index) => ({
      label: `Simulação ${index + 1}`,
      data: simulation,
      borderColor: `hsl(${index * 120}, 70%, 50%)`,
      backgroundColor: `hsla(${index * 120}, 70%, 50%, 0.1)`,
      borderWidth: 2,
      fill: false,
      tension: 0.1,
    }))

    // Adicionar linha de valor esperado
    const expectedValues = Array.from({ length: years + 1 }, (_, i) => initialValue * Math.pow(1 + expectedReturn, i))

    datasets.push({
      label: "Valor Esperado",
      data: expectedValues,
      borderColor: "rgba(0, 0, 0, 0.8)",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      borderWidth: 3,
      borderDash: [5, 5],
      fill: false,
      tension: 0.1,
    })

    // Criar o gráfico
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw as number
                  return `${context.dataset.label}: R$ ${value.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Anos",
              },
            },
            y: {
              title: {
                display: true,
                text: "Valor da Carteira (R$)",
              },
              ticks: {
                callback: (value) => `R$ ${Number(value).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`,
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
  }, [expectedReturn, risk, timeHorizon, simulationCount])

  // Função para gerar números aleatórios com distribuição normal
  function generateNormalRandom(mean: number, stdDev: number): number {
    let u = 0,
      v = 0
    while (u === 0) u = Math.random() // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random()

    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    return z * stdDev + mean
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="timeHorizon">Horizonte de Tempo (anos)</Label>
          <Select value={timeHorizon} onValueChange={setTimeHorizon}>
            <SelectTrigger id="timeHorizon">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 anos</SelectItem>
              <SelectItem value="10">10 anos</SelectItem>
              <SelectItem value="15">15 anos</SelectItem>
              <SelectItem value="20">20 anos</SelectItem>
              <SelectItem value="30">30 anos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="simulationCount">Número de Simulações</Label>
          <Select value={simulationCount} onValueChange={setSimulationCount}>
            <SelectTrigger id="simulationCount">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 simulação</SelectItem>
              <SelectItem value="3">3 simulações</SelectItem>
              <SelectItem value="5">5 simulações</SelectItem>
              <SelectItem value="10">10 simulações</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-80">
        <canvas ref={chartRef} />
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>
          <strong>Nota:</strong> Esta simulação é baseada em dados históricos e não garante resultados futuros. Os
          valores são meramente ilustrativos e não constituem recomendação de investimento.
        </p>
      </div>
    </div>
  )
}
