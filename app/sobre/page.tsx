import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, LineChart, Shield, Users } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SobrePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Sobre o InvestAI</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Democratizando o acesso à inteligência financeira através da combinação de machine learning e teoria
              moderna do portfólio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Nossa Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Tornar a gestão de investimentos mais acessível e personalizada, utilizando tecnologia de ponta para
                  oferecer recomendações baseadas em dados científicos e comportamento real de investidores.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Nossa Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Ser a principal plataforma de recomendação de investimentos baseada em inteligência artificial,
                  ajudando milhões de pessoas a tomar decisões financeiras mais informadas e alinhadas ao seu perfil.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">O Problema que Resolvemos</CardTitle>
              <CardDescription>
                Identificamos três principais desafios no mercado de investimentos individual
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-red-100 dark:bg-red-900 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 dark:text-red-400 font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Falta de Conhecimento Técnico</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Muitos investidores não possuem conhecimento suficiente para compreender os riscos associados a
                    diferentes ativos ou avaliar sua própria tolerância ao risco.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-red-100 dark:bg-red-900 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 dark:text-red-400 font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Complexidade do Mercado</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    A vasta gama de produtos financeiros disponíveis torna o processo de escolha extremamente complexo,
                    especialmente para investidores não profissionais.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-red-100 dark:bg-red-900 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 dark:text-red-400 font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Carteiras Subótimas</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Como consequência, muitos investidores acabam montando carteiras subótimas, seja por aversão
                    excessiva ao risco ou por exposição imprudente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Nossa Solução</CardTitle>
              <CardDescription>Um sistema inteligente que atua em três frentes principais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Estimativa da Tolerância ao Risco</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Utilizamos algoritmos de machine learning para inferir o nível de tolerância ao risco com base em
                    dados socioeconômicos, eliminando a subjetividade dos questionários tradicionais.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <LineChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Otimização da Alocação de Ativos</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Aplicamos a teoria moderna do portfólio (Markowitz) para encontrar a alocação ótima que maximiza
                    retornos para o nível de risco identificado.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Simulação do Desempenho</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Oferecemos simulações do desempenho da carteira ao longo do tempo, proporcionando maior
                    transparência e confiança no processo decisório.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Fundamentação Científica</CardTitle>
              <CardDescription>Nossa metodologia é baseada em pesquisa acadêmica sólida</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Nosso modelo foi desenvolvido com base na <strong>Survey of Consumer Finances (SCF)</strong>
                do Federal Reserve dos EUA, utilizando dados de mais de 19.000 investidores americanos coletados antes e
                depois da crise financeira de 2008.
              </p>

              <p className="text-gray-600 dark:text-gray-400">
                A variável de tolerância ao risco foi construída de forma a refletir o comportamento real dos
                investidores durante períodos de volatilidade, garantindo que nosso modelo capture a verdadeira
                disposição ao risco, não apenas as intenções declaradas.
              </p>

              <p className="text-gray-600 dark:text-gray-400">
                Testamos múltiplos algoritmos de machine learning, incluindo Regressão Linear, Lasso Regression, Support
                Vector Regression e Random Forest, selecionando o modelo com melhor desempenho preditivo.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
