"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, HelpCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PerfilPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Dados demográficos
    idade: "",
    genero: "",
    estadoCivil: "",
    escolaridade: "",
    numDependentes: "",

    // Dados financeiros
    renda: "",
    patrimonio: "",
    dividas: "",
    gastosMensais: "",

    // Experiência e objetivos
    experienciaInvestimentos: "",
    horizonteTempo: "",
    objetivoPrincipal: "",

    // Comportamento
    reacaoPerdas: 3,
    disposicaoRisco: 3,
  })

  const handleChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleNext = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const handlePrevious = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui enviaríamos os dados para processamento
    // e redirecionamos para a página de resultados
    router.push("/resultados")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Avaliação de Perfil de Investidor</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Preencha o formulário abaixo para descobrir seu perfil de risco e receber recomendações personalizadas.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between">
              <div className={`flex-1 h-2 ${step >= 1 ? "bg-blue-600" : "bg-gray-200"}`}></div>
              <div className="w-2"></div>
              <div className={`flex-1 h-2 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
              <div className="w-2"></div>
              <div className={`flex-1 h-2 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
              <div className="w-2"></div>
              <div className={`flex-1 h-2 ${step >= 4 ? "bg-blue-600" : "bg-gray-200"}`}></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
              <div className={step === 1 ? "font-bold text-blue-600 dark:text-blue-400" : ""}>Dados Pessoais</div>
              <div className={step === 2 ? "font-bold text-blue-600 dark:text-blue-400" : ""}>Situação Financeira</div>
              <div className={step === 3 ? "font-bold text-blue-600 dark:text-blue-400" : ""}>Experiência</div>
              <div className={step === 4 ? "font-bold text-blue-600 dark:text-blue-400" : ""}>Comportamento</div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Dados Pessoais"}
                {step === 2 && "Situação Financeira"}
                {step === 3 && "Experiência e Objetivos"}
                {step === 4 && "Comportamento de Risco"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Informações básicas sobre você"}
                {step === 2 && "Detalhes sobre sua situação financeira atual"}
                {step === 3 && "Sua experiência com investimentos e objetivos"}
                {step === 4 && "Como você reage a situações de risco financeiro"}
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="idade">Idade</Label>
                        <Input
                          id="idade"
                          type="number"
                          placeholder="Ex: 35"
                          value={formData.idade}
                          onChange={(e) => handleChange("idade", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="genero">Gênero</Label>
                        <Select value={formData.genero} onValueChange={(value) => handleChange("genero", value)}>
                          <SelectTrigger id="genero">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="feminino">Feminino</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                            <SelectItem value="nao_informar">Prefiro não informar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="estadoCivil">Estado Civil</Label>
                        <Select
                          value={formData.estadoCivil}
                          onValueChange={(value) => handleChange("estadoCivil", value)}
                        >
                          <SelectTrigger id="estadoCivil">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                            <SelectItem value="casado">Casado(a)</SelectItem>
                            <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                            <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                            <SelectItem value="uniao_estavel">União Estável</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="escolaridade">Escolaridade</Label>
                        <Select
                          value={formData.escolaridade}
                          onValueChange={(value) => handleChange("escolaridade", value)}
                        >
                          <SelectTrigger id="escolaridade">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fundamental">Ensino Fundamental</SelectItem>
                            <SelectItem value="medio">Ensino Médio</SelectItem>
                            <SelectItem value="superior">Ensino Superior</SelectItem>
                            <SelectItem value="pos">Pós-graduação</SelectItem>
                            <SelectItem value="mestrado">Mestrado</SelectItem>
                            <SelectItem value="doutorado">Doutorado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="numDependentes">Número de Dependentes</Label>
                      <Input
                        id="numDependentes"
                        type="number"
                        placeholder="Ex: 2"
                        value={formData.numDependentes}
                        onChange={(e) => handleChange("numDependentes", e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Label htmlFor="renda">Renda Mensal (R$)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                                <HelpCircle className="h-4 w-4" />
                                <span className="sr-only">Ajuda</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Informe sua renda mensal bruta, incluindo salários, aluguéis e outras fontes de renda.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="renda"
                        type="number"
                        placeholder="Ex: 5000"
                        value={formData.renda}
                        onChange={(e) => handleChange("renda", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Label htmlFor="patrimonio">Patrimônio Total (R$)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                                <HelpCircle className="h-4 w-4" />
                                <span className="sr-only">Ajuda</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Considere o valor total de seus bens, incluindo imóveis, veículos, investimentos e
                                dinheiro em conta.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="patrimonio"
                        type="number"
                        placeholder="Ex: 500000"
                        value={formData.patrimonio}
                        onChange={(e) => handleChange("patrimonio", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dividas">Dívidas Totais (R$)</Label>
                      <Input
                        id="dividas"
                        type="number"
                        placeholder="Ex: 50000"
                        value={formData.dividas}
                        onChange={(e) => handleChange("dividas", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gastosMensais">Gastos Mensais (R$)</Label>
                      <Input
                        id="gastosMensais"
                        type="number"
                        placeholder="Ex: 3000"
                        value={formData.gastosMensais}
                        onChange={(e) => handleChange("gastosMensais", e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="experienciaInvestimentos">Experiência com Investimentos</Label>
                      <Select
                        value={formData.experienciaInvestimentos}
                        onValueChange={(value) => handleChange("experienciaInvestimentos", value)}
                      >
                        <SelectTrigger id="experienciaInvestimentos">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nenhuma">Nenhuma experiência</SelectItem>
                          <SelectItem value="basica">Conhecimento básico</SelectItem>
                          <SelectItem value="intermediaria">Experiência intermediária</SelectItem>
                          <SelectItem value="avancada">Experiência avançada</SelectItem>
                          <SelectItem value="profissional">Profissional da área</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="horizonteTempo">Horizonte de Tempo para Investimentos</Label>
                      <Select
                        value={formData.horizonteTempo}
                        onValueChange={(value) => handleChange("horizonteTempo", value)}
                      >
                        <SelectTrigger id="horizonteTempo">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="curto">Curto prazo (menos de 2 anos)</SelectItem>
                          <SelectItem value="medio">Médio prazo (2 a 5 anos)</SelectItem>
                          <SelectItem value="longo">Longo prazo (5 a 10 anos)</SelectItem>
                          <SelectItem value="muito_longo">Muito longo prazo (mais de 10 anos)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="objetivoPrincipal">Objetivo Principal</Label>
                      <Select
                        value={formData.objetivoPrincipal}
                        onValueChange={(value) => handleChange("objetivoPrincipal", value)}
                      >
                        <SelectTrigger id="objetivoPrincipal">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="preservacao">Preservação do capital</SelectItem>
                          <SelectItem value="renda">Geração de renda</SelectItem>
                          <SelectItem value="crescimento_moderado">Crescimento moderado</SelectItem>
                          <SelectItem value="crescimento_agressivo">Crescimento agressivo</SelectItem>
                          <SelectItem value="aposentadoria">Aposentadoria</SelectItem>
                          <SelectItem value="educacao">Educação</SelectItem>
                          <SelectItem value="imovel">Compra de imóvel</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base">
                          Como você reagiria se seus investimentos perdessem 20% do valor em um mês?
                        </Label>
                        <div className="mt-6 space-y-4">
                          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>Venderia tudo</span>
                            <span>Não me importaria</span>
                          </div>
                          <Slider
                            value={[formData.reacaoPerdas]}
                            min={1}
                            max={5}
                            step={1}
                            onValueChange={(value) => handleChange("reacaoPerdas", value[0])}
                          />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <Label className="text-base">
                          Qual sua disposição para assumir riscos em troca de retornos potencialmente maiores?
                        </Label>
                        <div className="mt-6 space-y-4">
                          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>Muito baixa</span>
                            <span>Muito alta</span>
                          </div>
                          <Slider
                            value={[formData.disposicaoRisco]}
                            min={1}
                            max={5}
                            step={1}
                            onValueChange={(value) => handleChange("disposicaoRisco", value[0])}
                          />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={handlePrevious} disabled={step === 1}>
                  Voltar
                </Button>

                {step < 4 ? (
                  <Button type="button" onClick={handleNext}>
                    Próximo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit">
                    Analisar Perfil <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
