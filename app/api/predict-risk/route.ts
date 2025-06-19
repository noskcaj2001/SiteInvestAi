import { type NextRequest, NextResponse } from "next/server"

// Simulação do modelo de ML - em produção, isso seria carregado do arquivo finalized_model.sav
function predictRiskTolerance(userData: any): number {
  // Normalizar os dados de entrada conforme o modelo foi treinado
  const age = Number.parseInt(userData.age)
  const networth = Number.parseFloat(userData.networth)
  const income = Number.parseFloat(userData.income)
  const education = Number.parseInt(userData.education)
  const married = Number.parseInt(userData.married)
  const kids = Number.parseInt(userData.kids)
  const occupation = Number.parseInt(userData.occupation)
  const riskDisposition = Number.parseInt(userData.riskDisposition)

  // Simulação dos coeficientes do modelo treinado (baseado no relatório)
  // Em produção, estes viriam do arquivo finalized_model.sav
  const coefficients = {
    age: -0.002,
    networth: 0.000001,
    income: 0.000005,
    education: 0.08,
    married: -0.05,
    kids: -0.03,
    occupation: 0.02,
    riskDisposition: 0.15,
    intercept: 0.3,
  }

  // Normalizar algumas variáveis
  const normalizedAge = (age - 45) / 20
  const normalizedNetworth = Math.log(Math.max(networth, 1)) / 15
  const normalizedIncome = Math.log(Math.max(income, 1)) / 12

  // Calcular a predição
  let riskScore = coefficients.intercept
  riskScore += coefficients.age * normalizedAge
  riskScore += coefficients.networth * normalizedNetworth
  riskScore += coefficients.income * normalizedIncome
  riskScore += coefficients.education * (education / 5)
  riskScore += coefficients.married * married
  riskScore += coefficients.kids * kids
  riskScore += coefficients.occupation * (occupation / 5)
  riskScore += coefficients.riskDisposition * (riskDisposition / 4)

  // Garantir que o score esteja entre 0 e 1
  return Math.max(0, Math.min(1, riskScore))
}

// Dados simulados do S&P 500 (em produção, viria do arquivo SP500Data.csv)
const sp500Assets = [
  { symbol: "AAPL", name: "Apple Inc.", expectedReturn: 0.12, volatility: 0.25 },
  { symbol: "MSFT", name: "Microsoft Corp.", expectedReturn: 0.11, volatility: 0.22 },
  { symbol: "GOOGL", name: "Alphabet Inc.", expectedReturn: 0.13, volatility: 0.28 },
  { symbol: "AMZN", name: "Amazon.com Inc.", expectedReturn: 0.14, volatility: 0.32 },
  { symbol: "TSLA", name: "Tesla Inc.", expectedReturn: 0.18, volatility: 0.45 },
  { symbol: "META", name: "Meta Platforms Inc.", expectedReturn: 0.15, volatility: 0.35 },
  { symbol: "NVDA", name: "NVIDIA Corp.", expectedReturn: 0.2, volatility: 0.4 },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", expectedReturn: 0.09, volatility: 0.18 },
  { symbol: "JNJ", name: "Johnson & Johnson", expectedReturn: 0.07, volatility: 0.12 },
  { symbol: "PG", name: "Procter & Gamble Co.", expectedReturn: 0.06, volatility: 0.1 },
  { symbol: "UNH", name: "UnitedHealth Group Inc.", expectedReturn: 0.1, volatility: 0.2 },
  { symbol: "HD", name: "Home Depot Inc.", expectedReturn: 0.08, volatility: 0.16 },
  { symbol: "BAC", name: "Bank of America Corp.", expectedReturn: 0.08, volatility: 0.22 },
  { symbol: "XOM", name: "Exxon Mobil Corp.", expectedReturn: 0.06, volatility: 0.25 },
  { symbol: "WMT", name: "Walmart Inc.", expectedReturn: 0.05, volatility: 0.14 },
]

function optimizePortfolio(riskTolerance: number) {
  // Implementação simplificada da otimização de Markowitz
  // Em produção, usaria cvxopt ou biblioteca similar

  const numAssets = sp500Assets.length
  const weights = new Array(numAssets).fill(0)

  if (riskTolerance < 0.2) {
    // Muito conservador - foco em ativos de baixo risco
    const conservativeAssets = [8, 9, 11, 14] // JNJ, PG, HD, WMT
    conservativeAssets.forEach((index, i) => {
      weights[index] = 0.25
    })
  } else if (riskTolerance < 0.4) {
    // Conservador
    weights[0] = 0.15 // AAPL
    weights[1] = 0.15 // MSFT
    weights[7] = 0.15 // JPM
    weights[8] = 0.15 // JNJ
    weights[9] = 0.1 // PG
    weights[10] = 0.1 // UNH
    weights[11] = 0.1 // HD
    weights[14] = 0.1 // WMT
  } else if (riskTolerance < 0.6) {
    // Moderado
    weights[0] = 0.2 // AAPL
    weights[1] = 0.2 // MSFT
    weights[2] = 0.15 // GOOGL
    weights[3] = 0.1 // AMZN
    weights[7] = 0.1 // JPM
    weights[8] = 0.1 // JNJ
    weights[10] = 0.1 // UNH
    weights[11] = 0.05 // HD
  } else if (riskTolerance < 0.8) {
    // Arrojado
    weights[0] = 0.18 // AAPL
    weights[1] = 0.18 // MSFT
    weights[2] = 0.15 // GOOGL
    weights[3] = 0.15 // AMZN
    weights[4] = 0.1 // TSLA
    weights[5] = 0.12 // META
    weights[6] = 0.12 // NVDA
  } else {
    // Agressivo
    weights[2] = 0.2 // GOOGL
    weights[3] = 0.2 // AMZN
    weights[4] = 0.2 // TSLA
    weights[5] = 0.15 // META
    weights[6] = 0.25 // NVDA
  }

  // Calcular métricas da carteira
  const portfolioReturn = weights.reduce((sum, weight, i) => sum + weight * sp500Assets[i].expectedReturn, 0)

  const portfolioVariance = weights.reduce((sum, weight, i) => {
    return sum + Math.pow(weight, 2) * Math.pow(sp500Assets[i].volatility, 2)
  }, 0)

  // Adicionar correlação simplificada
  const correlationTerm =
    0.3 *
    weights.reduce((sum, weight1, i) => {
      return (
        sum +
        weights.reduce((innerSum, weight2, j) => {
          if (i !== j && weight1 > 0 && weight2 > 0) {
            return innerSum + weight1 * weight2 * sp500Assets[i].volatility * sp500Assets[j].volatility
          }
          return innerSum
        }, 0)
      )
    }, 0)

  const portfolioRisk = Math.sqrt(portfolioVariance + correlationTerm)

  return {
    assets: sp500Assets
      .map((asset, i) => ({
        ...asset,
        weight: weights[i],
      }))
      .filter((asset) => asset.weight > 0),
    expectedReturn: portfolioReturn,
    risk: portfolioRisk,
    sharpeRatio: portfolioReturn / portfolioRisk,
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    // Validar dados de entrada
    const requiredFields = [
      "age",
      "networth",
      "income",
      "education",
      "married",
      "kids",
      "occupation",
      "riskDisposition",
    ]
    for (const field of requiredFields) {
      if (!userData[field] && userData[field] !== 0) {
        return NextResponse.json({ error: `Campo obrigatório: ${field}` }, { status: 400 })
      }
    }

    // Predizer tolerância ao risco
    const riskTolerance = predictRiskTolerance(userData)

    // Otimizar carteira
    const portfolio = optimizePortfolio(riskTolerance)

    // Gerar dados de performance histórica simulada
    const performanceData = generatePerformanceData(portfolio.expectedReturn, portfolio.risk)

    return NextResponse.json({
      riskTolerance,
      portfolio,
      performanceData,
      userProfile: {
        riskLevel: getRiskLevel(riskTolerance),
        recommendation: getRecommendation(riskTolerance),
      },
    })
  } catch (error) {
    console.error("Erro na predição:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

function getRiskLevel(riskTolerance: number): string {
  if (riskTolerance < 0.2) return "Muito Conservador"
  if (riskTolerance < 0.4) return "Conservador"
  if (riskTolerance < 0.6) return "Moderado"
  if (riskTolerance < 0.8) return "Arrojado"
  return "Agressivo"
}

function getRecommendation(riskTolerance: number): string {
  if (riskTolerance < 0.2) {
    return "Seu perfil indica preferência por segurança e preservação do capital. Recomendamos uma carteira focada em ativos de baixo risco."
  }
  if (riskTolerance < 0.4) {
    return "Você busca um equilíbrio entre segurança e crescimento, com preferência por ativos mais estáveis."
  }
  if (riskTolerance < 0.6) {
    return "Seu perfil moderado permite uma diversificação equilibrada entre ativos de crescimento e estabilidade."
  }
  if (riskTolerance < 0.8) {
    return "Você está disposto a assumir riscos maiores em busca de retornos superiores, com foco em ativos de crescimento."
  }
  return "Seu perfil agressivo indica alta tolerância ao risco, priorizando potencial de crescimento sobre estabilidade."
}

function generatePerformanceData(expectedReturn: number, risk: number) {
  const months = 60 // 5 anos de dados
  const monthlyReturn = expectedReturn / 12
  const monthlyRisk = risk / Math.sqrt(12)

  let value = 100000 // Valor inicial de $100k
  const data = [{ month: 0, value, cumulativeReturn: 0 }]

  for (let i = 1; i <= months; i++) {
    // Gerar retorno aleatório baseado na distribuição normal
    const randomReturn = generateNormalRandom(monthlyReturn, monthlyRisk)
    value = value * (1 + randomReturn)

    data.push({
      month: i,
      value,
      cumulativeReturn: (value - 100000) / 100000,
    })
  }

  return data
}

function generateNormalRandom(mean: number, stdDev: number): number {
  let u = 0,
    v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()

  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  return z * stdDev + mean
}
