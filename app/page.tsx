'use client'

import { useState } from 'react'
import { InvestorProfileForm } from '@/components/InvestorProfileForm'
import { PortfolioOptimizer } from '@/components/PortfolioOptimizer'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, Brain, LineChart, Shield, Bot, TrendingUp } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
  const [riskTolerance, setRiskTolerance] = useState<number | null>(null)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Investimentos Inteligentes com <span className="text-blue-600">Machine Learning</span>
                </h1>
                <p className="text-lg text-gray-700">
                  Descubra seu perfil de risco e obtenha recomendações personalizadas de alocação de ativos baseadas na
                  Teoria de Markowitz e algoritmos avançados de aprendizado de máquina.
                </p>
                <div className="pt-4">
                  <Link href="/robo-assistente">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Robô Assistente <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/robo_img2.png"
                  alt="Robô assistente de investimentos com IA"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Como Funciona</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Nossa plataforma combina tecnologia de ponta com princípios sólidos de finanças para oferecer
                recomendações personalizadas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all">
                <CardHeader>
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Análise de Perfil</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Nosso algoritmo de machine learning analisa seus dados socioeconômicos para determinar sua
                    verdadeira tolerância ao risco.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all">
                <CardHeader>
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <LineChart className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Otimização de Markowitz</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Utilizamos a teoria moderna do portfólio para encontrar a alocação ideal de ativos que maximiza
                    retornos para seu nível de risco.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all">
                <CardHeader>
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Simulação de Cenários</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Visualize o desempenho projetado da sua carteira em diferentes cenários de mercado para tomar
                    decisões mais informadas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Robô Assistente */}
        <section className="py-20 px-4 bg-blue-600 text-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                  <Bot className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold">Robô Assistente de Investimentos</h2>
              </div>
              <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                Experimente nossa tecnologia mais avançada: um modelo de machine learning treinado com dados reais do
                Federal Reserve que analisa seu perfil e cria carteiras otimizadas do S&P 500.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Modelo Treinado</h3>
                <p className="text-blue-100">
                  Baseado na Survey of Consumer Finances do Federal Reserve com mais de 19.000 investidores reais
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">S&P 500</h3>
                <p className="text-blue-100">
                  Alocação otimizada entre as principais ações do mercado americano com dados históricos reais
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Performance Real</h3>
                <p className="text-blue-100">
                  Visualize a evolução da sua carteira com simulações baseadas em dados históricos de mercado
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link href="/robo-assistente">
                <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                  Experimentar Robô Assistente <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Por que usar nossa plataforma?</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Combinamos ciência de dados e finanças quantitativas para oferecer uma experiência superior.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex gap-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Baseado em Ciência</h3>
                  <p className="text-gray-600">
                    Nossa metodologia é fundamentada em pesquisas acadêmicas e dados reais de comportamento de
                    investidores durante períodos de crise.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Personalização Avançada</h3>
                  <p className="text-gray-600">
                    Ao contrário de questionários tradicionais, nosso algoritmo infere sua tolerância ao risco com base
                    em dados objetivos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Transparência Total</h3>
                  <p className="text-gray-600">
                    Visualize claramente como suas características pessoais influenciam seu perfil de risco e como isso
                    se traduz em alocação de ativos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Decisões Informadas</h3>
                  <p className="text-gray-600">
                    Tome decisões financeiras alinhadas ao seu verdadeiro perfil, evitando tanto a aversão excessiva
                    quanto a exposição imprudente ao risco.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-blue-600 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para otimizar seus investimentos?</h2>
            <p className="text-lg mb-8 text-blue-100">
              Descubra seu perfil de risco e receba recomendações personalizadas de alocação de ativos em minutos.
            </p>
            <Link href="/perfil">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                Começar agora <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <main className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <InvestorProfileForm onSubmit={setRiskTolerance} />
            </div>
            <div>
              {riskTolerance !== null && (
                <PortfolioOptimizer riskTolerance={riskTolerance} />
              )}
            </div>
          </div>
        </main>
      </main>

      <Footer />
    </div>
  )
}
