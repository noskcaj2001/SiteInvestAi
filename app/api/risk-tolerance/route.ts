import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import pickle from 'pickle'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { age, education, married, kids, occupation, income, risk, netWorth } = body

    // Load the model
    const modelPath = path.join(process.cwd(), 'IA_CODE', 'finalized_model.sav')
    const modelBuffer = await fs.readFile(modelPath)
    const model = pickle.loads(modelBuffer)

    // Prepare input
    const X_input = [[age, education, married, kids, occupation, income, risk, netWorth]]
    
    // Make prediction
    const prediction = model.predict(X_input)
    
    return NextResponse.json({ 
      tolerance: Math.round(prediction[0] * 100) / 100 
    })

  } catch (error) {
    console.error('Error in risk tolerance prediction:', error)
    return NextResponse.json(
      { error: 'Failed to predict risk tolerance' },
      { status: 500 }
    )
  }
} 