import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MultiSelect, Option } from "@/components/ui/multi-select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const DEFAULT_TICKERS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META']
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface PortfolioOptimizerProps {
  riskTolerance: number
}

export function PortfolioOptimizer({ riskTolerance }: PortfolioOptimizerProps) {
  const [selectedTickers, setSelectedTickers] = useState<string[]>(DEFAULT_TICKERS)
  const [allocation, setAllocation] = useState<Record<string, number>>({})
  const [performance, setPerformance] = useState<Array<{ date: string; value: number }>>([])

  const handleOptimize = async () => {
    try {
      const response = await fetch(`${API_URL}/optimize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tolerance: riskTolerance,
          tickers: selectedTickers,
        }),
      })

      const data = await response.json()
      
      if (data.allocation && data.performance && data.dates) {
        setAllocation(data.allocation)
        setPerformance(
          data.dates.map((date: string, index: number) => ({
            date,
            value: data.performance[index]
          }))
        )
      } else {
        console.error('Error optimizing portfolio:', data.error)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const allocationData = Object.entries(allocation).map(([ticker, weight]) => ({
    ticker,
    weight: weight * 100
  }))

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Otimização de Carteira</CardTitle>
          <CardDescription>
            Selecione os ativos para sua carteira
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <MultiSelect
            options={DEFAULT_TICKERS.map(ticker => ({ label: ticker, value: ticker }))}
            value={selectedTickers.map(ticker => ({ label: ticker, value: ticker }))}
            onChange={(selected: Option[]) => setSelectedTickers(selected.map(s => s.value))}
            placeholder="Selecione os ativos..."
          />
          <Button onClick={handleOptimize} className="w-full">
            Otimizar Carteira
          </Button>
        </CardContent>
      </Card>

      {Object.keys(allocation).length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Alocação Sugerida</CardTitle>
              <CardDescription>
                Distribuição ótima dos ativos baseada no seu perfil de risco
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={allocationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ticker" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="weight" name="Peso (%)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Desempenho da Carteira</CardTitle>
              <CardDescription>
                Simulação do desempenho histórico da carteira otimizada
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Valor da Carteira" 
                    stroke="#82ca9d" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
} 