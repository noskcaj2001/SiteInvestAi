from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pandas as pd
import pickle
import uvicorn
import cvxopt as opt
from cvxopt import blas, solvers
import os
solvers.options['show_progress'] = False

app = FastAPI()

# Configure CORS with environment variable
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:3000')
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
with open('finalized_model.sav', 'rb') as file:
    model = pickle.load(file)

# Load stock data
def load_stock_data():
    ativos = pd.read_csv('SP500Data.csv', index_col=0)
    fracoes_faltantes = ativos.isnull().mean().sort_values(ascending=False)
    lista_remover = sorted(list(fracoes_faltantes[fracoes_faltantes > 0.3].index))
    ativos.drop(labels=lista_remover, axis=1, inplace=True)
    ativos = ativos.fillna(method='ffill')
    return ativos

ativos = load_stock_data()

class InvestorData(BaseModel):
    age: int
    education: int
    married: int
    kids: int
    occupation: int
    income: float
    risk: int
    netWorth: float

class PortfolioRequest(BaseModel):
    tolerance: float
    tickers: list[str]

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/predict")
async def predict_risk_tolerance(data: InvestorData):
    try:
        X_input = [[
            data.age, data.education, data.married, 
            data.kids, data.occupation, data.income,
            data.risk, data.netWorth
        ]]
        prediction = model.predict(X_input)
        return {"tolerance": float(prediction[0])}
    except Exception as e:
        return {"error": str(e)}

@app.post("/optimize")
async def optimize_portfolio(data: PortfolioRequest):
    try:
        ativos_selecionados = ativos.loc[:, data.tickers]
        vetor_retorno = np.array(ativos_selecionados.pct_change().dropna(axis=0)).T
        n = len(vetor_retorno)
        mus = 1 - data.tolerance

        # Convert to cvxopt matrices
        S = opt.matrix(np.cov(vetor_retorno))
        pbar = opt.matrix(np.mean(vetor_retorno, axis=1))
        G = -opt.matrix(np.eye(n))
        h = opt.matrix(0.0, (n ,1))
        A = opt.matrix(1.0, (1, n))
        b = opt.matrix(1.0)

        # Calculate efficient frontier weights using quadratic programming
        portfolios = solvers.qp(mus*S, -pbar, G, h, A, b)
        w = np.array(portfolios['x']).flatten()

        # Calculate portfolio performance
        retornos_finais = (np.array(ativos_selecionados) * w)
        soma_retornos = np.sum(retornos_finais, axis=1)
        retorno_soma_pd = pd.DataFrame(soma_retornos, index=ativos.index)
        retorno_soma_pd = retorno_soma_pd - retorno_soma_pd.iloc[0,:] + 100

        return {
            "allocation": {ticker: float(weight) for ticker, weight in zip(data.tickers, w)},
            "performance": retorno_soma_pd[0].tolist(),
            "dates": retorno_soma_pd.index.tolist()
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    port = int(os.getenv('PORT', 8000))
    uvicorn.run(app, host="0.0.0.0", port=port) 