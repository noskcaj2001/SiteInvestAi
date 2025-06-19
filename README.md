# Investment Advisor

Um assistente de investimentos que combina machine learning para análise de perfil de risco com otimização de carteira usando a teoria de Markowitz.

## Funcionalidades

- Análise de perfil de risco do investidor usando machine learning
- Otimização de carteira baseada na teoria de Markowitz
- Visualização interativa da alocação sugerida
- Simulação de desempenho histórico da carteira

## Pré-requisitos

- Node.js 18+
- Python 3.8+
- pnpm (ou npm/yarn)

## Instalação Local

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd investment-advisor
```

2. Instale as dependências do frontend:
```bash
pnpm install
```

3. Configure o servidor Python:
```bash
cd IA_CODE
chmod +x setup.sh
./setup.sh
```

## Uso Local

1. Em um terminal, inicie o servidor Python:
```bash
cd IA_CODE
source venv/bin/activate
python api.py
```

2. Em outro terminal, inicie o frontend:
```bash
pnpm dev
```

3. Acesse http://localhost:3000 no seu navegador

## Deploy

### Backend (Railway)

1. Crie uma conta no [Railway](https://railway.app)

2. Instale a CLI do Railway:
```bash
npm i -g @railway/cli
```

3. Faça login:
```bash
railway login
```

4. Crie um novo projeto:
```bash
railway init
```

5. Deploy do backend:
```bash
cd IA_CODE
railway up
```

6. Configure a variável de ambiente `FRONTEND_URL` no Railway com a URL do seu frontend na Vercel

### Frontend (Vercel)

1. Crie uma conta na [Vercel](https://vercel.com)

2. Instale a CLI da Vercel:
```bash
npm i -g vercel
```

3. Faça login:
```bash
vercel login
```

4. Deploy do frontend:
```bash
vercel
```

5. Configure a variável de ambiente `NEXT_PUBLIC_API_URL` na Vercel com a URL do seu backend no Railway

## Como funciona

1. **Análise de Perfil de Risco**
   - O sistema usa um modelo de machine learning treinado com dados do Survey of Consumer Finances
   - Considera fatores como idade, educação, estado civil, filhos, ocupação, renda e patrimônio
   - Calcula uma pontuação de tolerância ao risco entre 0 e 1

2. **Otimização de Carteira**
   - Usa a teoria moderna de carteiras de Markowitz
   - Otimiza a alocação de ativos baseada no perfil de risco do investidor
   - Considera retornos históricos e correlações entre ativos
   - Busca maximizar o retorno esperado para um dado nível de risco

## Estrutura do Projeto

```
.
├── app/                    # Páginas Next.js
├── components/            # Componentes React
├── IA_CODE/              # Código Python
│   ├── api.py           # API FastAPI
│   ├── finalized_model.sav  # Modelo ML treinado
│   └── SP500Data.csv    # Dados históricos
└── public/               # Arquivos estáticos
```

## Tecnologias

- **Frontend**
  - Next.js 14
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - Recharts

- **Backend**
  - FastAPI
  - scikit-learn
  - pandas
  - numpy
  - cvxopt 