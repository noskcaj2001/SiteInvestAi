"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { RiskToleranceChart } from "@/components/risk-tolerance-chart"
import { AssetAllocationChart } from "@/components/asset-allocation-chart"
import { PortfolioSimulation } from "@/components/portfolio-simulation"
import { calculateRiskTolerance, getOptimalPortfolio } from "@/lib/investment-model"

export default function ResultadosPage() {
  const [loading, setLoading] = useState(true)
  const [riskTolerance, setRiskTolerance] = useState(0)
  const [portfolio, setPortfolio] = useState<{
    assets: string[]
    weights: number[]
    expectedReturn: number
    risk: number
  }>({
    assets: [],
    weights: [],
    expectedReturn: 0,
    risk: 0,
  })

  // Simulando o carregamento e processamento dos dados
  useEffect(() => {
    // Em um cenário real, esses dados viriam do formulário anterior
    // e seriam processados pelo modelo de ML
    const mockUserData = {
      idade: 35,
      genero: "masculino",
      estadoCivil: "casado",
      escolaridade: "superior",
      numDependentes: 2,
      renda: 8000,
      patrimonio: 300000,
      dividas: 50000,
      gastosMensais: 5000,
      experienciaInvestimentos: "intermediaria",
      horizonteTempo: "longo",
      objetivoPrincipal: "crescimento_moderado",
      reacaoPerdas: 3,
      disposicaoRisco: 4,
    }

    setTimeout(() => {
      // Calcular a tolerância ao risco usando o modelo de ML
      const calculatedRiskTolerance = calculateRiskTolerance(mockUserData)
      setRiskTolerance(calculatedRiskTolerance)

      // Obter a alocação ótima de ativos usando o modelo de Markowitz
      const optimalPortfolio = getOptimalPortfolio(calculatedRiskTolerance)
      setPortfolio(optimalPortfolio)

      setLoading(false)
    }, 2000)
  }, [])

  const getRiskProfile = (score: number) => {
    if (score < 0.2) return "Muito Conservador"
    if (score < 0.4) return "Conservador"
    if (score < 0.6) return "Moderado"
    if (score < 0.8) return "Arrojado"
    return "Agressivo"
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Analisando seu perfil e calculando a alocação ideal...
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Seu Perfil de Investidor</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Baseado nos dados fornecidos, analisamos seu perfil e criamos recomendações personalizadas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Perfil de Risco</CardTitle>
                    <CardDescription>Sua tolerância ao risco</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {getRiskProfile(riskTolerance)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Score: {(riskTolerance * 100).toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Retorno Esperado</CardTitle>
                    <CardDescription>Estimativa anual</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {(portfolio.expectedReturn * 100).toFixed(2)}%
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Baseado em dados históricos</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Risco da Carteira</CardTitle>
                    <CardDescription>Volatilidade anual</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {(portfolio.risk * 100).toFixed(2)}%
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Desvio padrão dos retornos</div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="alocacao" className="mb-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="alocacao">Alocação de Ativos</TabsTrigger>
                  <TabsTrigger value="perfil">Análise do Perfil</TabsTrigger>
                  <TabsTrigger value="simulacao">Simulação</TabsTrigger>
                </TabsList>

                <TabsContent value="alocacao" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Alocação Recomendada</CardTitle>
                        <CardDescription>Distribuição ótima de ativos baseada no seu perfil de risco</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="h-80">
                          <AssetAllocationChart assets={portfolio.assets} weights={portfolio.weights} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Detalhamento da Carteira</CardTitle>
                        <CardDescription>Composição detalhada dos ativos recomendados</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {portfolio.assets.map((asset, index) => (
                            <div key={asset} className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div
                                  className="w-3 h-3 rounded-full bg-blue-600 mr-3"
                                  style={{
                                    backgroundColor: `hsl(${index * 40}, 70%, 50%)`,
                                  }}
                                ></div>
                                <span>{asset}</span>
                              </div>
                              <div className="font-medium">{(portfolio.weights[index] * 100).toFixed(2)}%</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="perfil" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Análise da Tolerância ao Risco</CardTitle>
                        <CardDescription>Fatores que influenciaram sua classificação</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="h-80">
                          <RiskToleranceChart />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Interpretação do Perfil</CardTitle>
                        <CardDescription>O que seu perfil de risco significa para seus investimentos</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 text-gray-700 dark:text-gray-300">
                          <p>
                            Seu perfil de risco <strong>{getRiskProfile(riskTolerance)}</strong> indica que você tem uma
                            {riskTolerance < 0.4 ? " baixa" : riskTolerance < 0.7 ? " moderada" : " alta"} tolerância ao
                            risco.
                          </p>

                          <p>
                            {riskTolerance < 0.4
                              ? "Você prioriza a segurança e a preservação do capital, mesmo que isso signifique retornos mais modestos."
                              : riskTolerance < 0.7
                                ? "Você busca um equilíbrio entre segurança e crescimento, aceitando alguma volatilidade em troca de retornos potencialmente maiores."
                                : "Você está disposto a aceitar maior volatilidade e riscos em busca de retornos mais expressivos no longo prazo."}
                          </p>

                          <p>Fatores que mais influenciaram seu perfil:</p>

                          <ul className="list-disc pl-5 space-y-2">
                            <li>Horizonte de tempo de investimento</li>
                            <li>Experiência prévia com investimentos</li>
                            <li>Situação financeira atual</li>
                            <li>Reação a perdas potenciais</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="simulacao" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Simulação de Desempenho</CardTitle>
                      <CardDescription>
                        Projeção do desempenho da carteira recomendada ao longo do tempo
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="h-96">
                        <PortfolioSimulation expectedReturn={portfolio.expectedReturn} risk={portfolio.risk} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex flex-col md:flex-row justify-center gap-4 mt-12">
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Baixar Relatório Completo
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Compartilhar Resultados
                </Button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
