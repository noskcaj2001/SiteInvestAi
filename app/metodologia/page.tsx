import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Database, Cpu, TrendingUp } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function MetodologiaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Metodologia Científica</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Conheça a fundamentação científica por trás do nosso sistema de recomendação de investimentos.
            </p>
          </div>

          <Tabs defaultValue="dados" className="mb-12">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dados">Fonte de Dados</TabsTrigger>
              <TabsTrigger value="target">Variável Target</TabsTrigger>
              <TabsTrigger value="modelos">Modelos ML</TabsTrigger>
              <TabsTrigger value="markowitz">Teoria de Markowitz</TabsTrigger>
            </TabsList>

            <TabsContent value="dados" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center">
                      <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle>Survey of Consumer Finances (SCF)</CardTitle>
                      <CardDescription>Dados do Federal Reserve dos EUA</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">19.285</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Observações</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Variáveis</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Períodos (2007-2009)</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Características dos Dados</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                        <span>Dados coletados antes (2007) e depois (2009) da crise financeira</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                        <span>Representam diferentes perfis socioeconômicos de investidores americanos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                        <span>Incluem informações detalhadas sobre patrimônio, renda, educação e comportamento</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                        <span>Permitem análise do comportamento real durante períodos de volatilidade</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="target" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900 rounded-full w-12 h-12 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <CardTitle>Construção da Variável Target</CardTitle>
                      <CardDescription>Tolerância ao Risco Objetiva</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Processo de Construção</h3>

                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium mb-2">1. Separação dos Ativos</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Badge variant="destructive" className="mb-2">
                              Ativos de Risco
                            </Badge>
                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                              <li>• Ações</li>
                              <li>• Fundos mútuos</li>
                              <li>• Imóveis de investimento</li>
                              <li>• Títulos corporativos</li>
                              <li>• Commodities</li>
                            </ul>
                          </div>
                          <div>
                            <Badge variant="secondary" className="mb-2">
                              Ativos Livres de Risco
                            </Badge>
                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                              <li>• Contas bancárias</li>
                              <li>• Poupança</li>
                              <li>• Depósitos</li>
                              <li>• Equivalentes de caixa</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium mb-2">2. Cálculo da Razão de Tolerância</h4>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                          <code className="text-sm">
                            Tolerância = Ativos de Risco / (Ativos de Risco + Ativos Livres de Risco)
                          </code>
                        </div>
                      </div>

                      <div className="border-l-4 border-yellow-500 pl-4">
                        <h4 className="font-medium mb-2">3. Normalização pela Crise</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Ajuste baseado na variação do S&P 500 entre 2007 (1478) e 2009 (948) para capturar o
                          comportamento real durante a crise.
                        </p>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-medium mb-2">4. Filtragem de "Investidores Inteligentes"</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Consideramos inteligentes os investidores cuja tolerância ao risco variou menos de 10% entre
                          os dois períodos, garantindo consistência comportamental.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="modelos" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-12 h-12 flex items-center justify-center">
                      <Cpu className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <CardTitle>Modelos de Machine Learning</CardTitle>
                      <CardDescription>Comparação de algoritmos testados</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                          <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Modelo</th>
                          <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Família</th>
                          <th className="border border-gray-300 dark:border-gray-700 p-3 text-center">MSE Médio</th>
                          <th className="border border-gray-300 dark:border-gray-700 p-3 text-center">Desvio Padrão</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 dark:border-gray-700 p-3">Regressão Linear</td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3">Regressão</td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">0.103</td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">0.179</td>
                        </tr>
                        <tr className="bg-green-50 dark:bg-green-900/20">
                          <td className="border border-gray-300 dark:border-gray-700 p-3 font-bold">
                            Lasso Regression
                          </td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3">Regressão</td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3 text-center font-bold text-green-600">
                            0.041
                          </td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">0.109</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 dark:border-gray-700 p-3">SVR</td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3">
                            Algoritmos de Classificação/Regr.
                          </td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">0.128</td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">0.101</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 dark:border-gray-700 p-3">Random Forest</td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3">Árvores de Decisão</td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">0.089</td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">0.095</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Características dos Modelos</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="border border-green-200 dark:border-green-800 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
                          <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                            🏆 Lasso Regression (Vencedor)
                          </h4>
                          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                            <li>• Melhor desempenho geral (MSE: 0.041)</li>
                            <li>• Seleção automática de features</li>
                            <li>• Alta interpretabilidade</li>
                            <li>• Reduz overfitting</li>
                          </ul>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="font-medium mb-2">Random Forest</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Segundo melhor desempenho</li>
                            <li>• Captura não-linearidades</li>
                            <li>• Robusto a outliers</li>
                            <li>• Menor interpretabilidade</li>
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="font-medium mb-2">Support Vector Regression</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Modela relações complexas</li>
                            <li>• Robusto contra outliers</li>
                            <li>• Alto custo computacional</li>
                            <li>• Menor interpretabilidade</li>
                          </ul>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="font-medium mb-2">Regressão Linear</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Modelo base de comparação</li>
                            <li>• Alta interpretabilidade</li>
                            <li>• Baixo custo computacional</li>
                            <li>• Limitado a relações lineares</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="markowitz" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 dark:bg-orange-900 rounded-full w-12 h-12 flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <CardTitle>Teoria de Markowitz</CardTitle>
                      <CardDescription>Otimização da Carteira de Investimentos</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Fundamentos Teóricos</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      A teoria moderna do portfólio, desenvolvida por Harry Markowitz em 1952, propõe a otimização da
                      carteira de investimentos com base na relação entre risco e retorno.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Processo de Aplicação</h3>

                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium mb-2">1. Cálculo da Matriz de Covariância</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Calculamos as correlações entre os ativos selecionados para entender como eles se movem em
                          relação uns aos outros.
                        </p>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium mb-2">2. Estimativa de Retornos Esperados</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Baseamos os retornos esperados em dados históricos e análises fundamentalistas dos ativos
                          disponíveis.
                        </p>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-medium mb-2">3. Função Objetivo</h4>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                          <code className="text-sm">Maximizar: μᵀw - (λ/2)wᵀΣw</code>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Onde μ = retornos esperados, w = pesos dos ativos, λ = parâmetro de aversão ao risco, Σ =
                            matriz de covariância
                          </p>
                        </div>
                      </div>

                      <div className="border-l-4 border-orange-500 pl-4">
                        <h4 className="font-medium mb-2">4. Otimização Quadrática</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Utilizamos programação quadrática (biblioteca cvxopt) para encontrar a alocação ótima que
                          maximiza a utilidade do investidor.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Vantagens da Abordagem</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                          <span>Diversificação ótima baseada em correlações</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                          <span>Maximização do retorno para um dado nível de risco</span>
                        </li>
                      </ul>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                          <span>Fundamentação matemática sólida</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                          <span>Personalização baseada no perfil do investidor</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
