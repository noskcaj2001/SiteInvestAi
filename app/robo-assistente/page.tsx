"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Bot, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function RoboAssistentePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    age: "",
    networth: "",
    income: "",
    education: "",
    married: "",
    kids: "",
    occupation: "",
    riskDisposition: 3,
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Enviar dados para o backend para processamento
      const response = await fetch("/api/predict-risk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        // Armazenar resultado no localStorage para usar na próxima página
        localStorage.setItem("riskPrediction", JSON.stringify(result))
        router.push("/dashboard-robo")
      } else {
        throw new Error("Erro ao processar dados")
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao processar seus dados. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center">
                <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Robô Assistente de Investimentos</h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Nosso modelo de machine learning, treinado com dados do Federal Reserve (Survey of Consumer Finances), irá
              analisar seu perfil e criar uma carteira otimizada baseada no S&P 500.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Dados para Análise de Risco
              </CardTitle>
              <CardDescription>
                Preencha as informações abaixo para que nosso modelo possa estimar sua tolerância ao risco com precisão
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age">Idade (AGE07)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Ex: 35"
                      value={formData.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                      required
                      min="18"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="networth">Patrimônio Líquido - USD (NETWORTH07)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                              <span className="text-xs">?</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Valor total de seus bens (imóveis, investimentos, etc.) menos suas dívidas
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="networth"
                      type="number"
                      placeholder="Ex: 100000"
                      value={formData.networth}
                      onChange={(e) => handleChange("networth", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="income">Renda Anual - USD (INCOME07)</Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="Ex: 60000"
                      value={formData.income}
                      onChange={(e) => handleChange("income", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Escolaridade (EDCL07)</Label>
                    <Select value={formData.education} onValueChange={(value) => handleChange("education", value)}>
                      <SelectTrigger id="education">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sem ensino médio</SelectItem>
                        <SelectItem value="2">Ensino médio</SelectItem>
                        <SelectItem value="3">Alguma faculdade</SelectItem>
                        <SelectItem value="4">Graduação</SelectItem>
                        <SelectItem value="5">Pós-graduação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="married">Estado Civil (MARRIED07)</Label>
                    <Select value={formData.married} onValueChange={(value) => handleChange("married", value)}>
                      <SelectTrigger id="married">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Solteiro(a)</SelectItem>
                        <SelectItem value="1">Casado(a)/União Estável</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kids">Número de Filhos (KIDS07)</Label>
                    <Input
                      id="kids"
                      type="number"
                      placeholder="Ex: 2"
                      value={formData.kids}
                      onChange={(e) => handleChange("kids", e.target.value)}
                      required
                      min="0"
                      max="10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Ocupação (OCCAT107)</Label>
                  <Select value={formData.occupation} onValueChange={(value) => handleChange("occupation", value)}>
                    <SelectTrigger id="occupation">
                      <SelectValue placeholder="Selecione sua ocupação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Gerencial/Profissional</SelectItem>
                      <SelectItem value="2">Técnico/Vendas/Serviços</SelectItem>
                      <SelectItem value="3">Outros/Operacional</SelectItem>
                      <SelectItem value="4">Aposentado</SelectItem>
                      <SelectItem value="5">Desempregado/Não trabalha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">Disposição ao Risco (RISK07)</Label>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>Muito conservador</span>
                      <span>Muito agressivo</span>
                    </div>
                    <Slider
                      value={[formData.riskDisposition]}
                      min={1}
                      max={4}
                      step={1}
                      onValueChange={(value) => handleChange("riskDisposition", value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>1 - Não assumo riscos</span>
                      <span>2 - Risco baixo</span>
                      <span>3 - Risco moderado</span>
                      <span>4 - Risco alto</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processando...
                      </div>
                    ) : (
                      <>
                        Analisar Perfil e Criar Carteira <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Como Funciona</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Análise ML</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Nosso modelo treinado com dados do Federal Reserve analisa seu perfil
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Otimização</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Calculamos a alocação ótima usando dados históricos do S&P 500
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Visualização</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Apresentamos sua carteira com gráficos interativos de performance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
