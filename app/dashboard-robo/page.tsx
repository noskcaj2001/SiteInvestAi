"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, Bot, TrendingUp, PieChart, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { RoboPortfolioChart } from "@/components/robo-portfolio-chart"
import { RoboPerformanceChart } from "@/components/robo-performance-chart"
import { RoboAllocationChart } from "@/components/robo-allocation-chart"

interface Asset {
  symbol: string
  name: string
  expectedReturn: number
  volatility: number
  weight: number
}

interface Portfolio {
  assets: Asset[]
  expectedReturn: number
  risk: number
  sharpeRatio: number
}

interface PredictionResult {
  riskTolerance: number
  portfolio: Portfolio
  performanceData: Array<{
    month: number
    value: number
    cumulativeReturn: number
  }>
  userProfile: {
    riskLevel: string
    recommendation: string
  }
}

export default function DashboardRoboPage() {
  const router = useRouter()
  const [data, setData] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Recuperar dados do localStorage
    const storedData = localStorage.getItem("riskPrediction")
    if (storedData) {
      setData(JSON.parse(storedData))
    } else {
      // Se não há dados, redirecionar para o formulário
      router.push("/robo-assistente")
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400">Carregando dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">Nenhum dado encontrado.</p>
            <Button onClick={() => router.push("/robo-assistente")}>Fazer Nova Análise</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const totalInvestment = 100000 // $100k base
  const finalValue = data.performanceData[data.performanceData.length - 1]?.value || totalInvestment

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center">
                <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard do Robô Assistente</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Análise completa do seu perfil e recomendações de investimento
                </p>
              </div>
            </div>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Perfil de Risco</CardTitle>
                <CardDescription>Predição do modelo ML</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {data.userProfile.riskLevel}
                </div>
                <Badge variant="outline">{(data.riskTolerance * 100).toFixed(1)}% tolerância</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Retorno Esperado</CardTitle>
                <CardDescription>Anual da carteira</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {(data.portfolio.expectedReturn * 100).toFixed(2)}%
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Baseado em dados históricos</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Risco (Volatilidade)</CardTitle>
                <CardDescription>Desvio padrão anual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {(data.portfolio.risk * 100).toFixed(2)}%
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Medida de volatilidade</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Índice Sharpe</CardTitle>
                <CardDescription>Retorno ajustado ao risco</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {data.portfolio.sharpeRatio.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Eficiência da carteira</div>
              </CardContent>
            </Card>
          </div>

          {/* Recomendação */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Recomendação Personalizada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">{data.userProfile.recommendation}</p>
            </CardContent>
          </Card>

          {/* Tabs com Gráficos */}
          <Tabs defaultValue="alocacao" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="alocacao" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                Alocação de Ativos
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Performance Histórica
              </TabsTrigger>
              <TabsTrigger value="detalhes" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Detalhes da Carteira
              </TabsTrigger>
            </TabsList>

            <TabsContent value="alocacao" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição da Carteira</CardTitle>
                    <CardDescription>Alocação otimizada baseada no seu perfil de risco</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="h-80">
                      <RoboPortfolioChart assets={data.portfolio.assets} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Alocação por Ativo</CardTitle>
                    <CardDescription>Percentual investido em cada ação</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="h-80">
                      <RoboAllocationChart assets={data.portfolio.assets} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Simulação de Performance (5 anos)</CardTitle>
                  <CardDescription>
                    Evolução projetada de um investimento de ${totalInvestment.toLocaleString()} baseada em dados
                    históricos
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-96">
                    <RoboPerformanceChart data={data.performanceData} />
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ${totalInvestment.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Investimento Inicial</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ${finalValue.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Valor Final Projetado</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {(((finalValue - totalInvestment) / totalInvestment) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Retorno Total</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="detalhes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detalhamento dos Ativos</CardTitle>
                  <CardDescription>Informações completas sobre cada ativo da carteira recomendada</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                          <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Símbolo</th>
                          <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Nome da Empresa</th>
                          <th className="border border-gray-300 dark:border-gray-700 p-3 text-center">Alocação</th>
                          <th className="border border-gray-300 dark:border-gray-700 p-3 text-center">
                            Retorno Esperado
                          </th>
                          <th className="border border-gray-300 dark:border-gray-700 p-3 text-center">Volatilidade</th>
                          <th className="border border-gray-300 dark:border-gray-700 p-3 text-center">
                            Valor Investido
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.portfolio.assets.map((asset) => (
                          <tr key={asset.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="border border-gray-300 dark:border-gray-700 p-3 font-mono font-bold">
                              {asset.symbol}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 p-3">{asset.name}</td>
                            <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">
                              {(asset.weight * 100).toFixed(2)}%
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 p-3 text-center text-green-600 dark:text-green-400">
                              {(asset.expectedReturn * 100).toFixed(2)}%
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 p-3 text-center text-orange-600 dark:text-orange-400">
                              {(asset.volatility * 100).toFixed(2)}%
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 p-3 text-center font-medium">
                              ${(totalInvestment * asset.weight).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Ações */}
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Baixar Relatório Completo
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Compartilhar Análise
            </Button>
            <Button variant="outline" onClick={() => router.push("/robo-assistente")}>
              Nova Análise
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
