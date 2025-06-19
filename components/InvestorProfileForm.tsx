import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface InvestorProfileFormProps {
  onSubmit: (tolerance: number) => void
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export function InvestorProfileForm({ onSubmit }: InvestorProfileFormProps) {
  const [formData, setFormData] = useState({
    age: 25,
    education: 2,
    married: 1,
    kids: 0,
    occupation: 3,
    income: 100000,
    risk: 3,
    netWorth: 10000
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (data.tolerance) {
        onSubmit(data.tolerance)
      } else {
        console.error('Error predicting risk tolerance:', data.error)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Perfil do Investidor</CardTitle>
        <CardDescription>
          Preencha suas informações para calcular sua tolerância ao risco
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="age">Idade</Label>
            <Slider
              id="age"
              min={18}
              max={90}
              step={1}
              value={[formData.age]}
              onValueChange={(value) => setFormData({ ...formData, age: value[0] })}
            />
            <div className="text-sm text-muted-foreground">{formData.age} anos</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">Nível de Educação (1-4)</Label>
            <Slider
              id="education"
              min={1}
              max={4}
              step={1}
              value={[formData.education]}
              onValueChange={(value) => setFormData({ ...formData, education: value[0] })}
            />
            <div className="text-sm text-muted-foreground">Nível {formData.education}</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="married">Estado Civil</Label>
            <Slider
              id="married"
              min={0}
              max={1}
              step={1}
              value={[formData.married]}
              onValueChange={(value) => setFormData({ ...formData, married: value[0] })}
            />
            <div className="text-sm text-muted-foreground">
              {formData.married === 1 ? 'Casado(a)' : 'Solteiro(a)'}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="kids">Número de Filhos</Label>
            <Slider
              id="kids"
              min={0}
              max={10}
              step={1}
              value={[formData.kids]}
              onValueChange={(value) => setFormData({ ...formData, kids: value[0] })}
            />
            <div className="text-sm text-muted-foreground">{formData.kids} filho(s)</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation">Ocupação (1-7)</Label>
            <Slider
              id="occupation"
              min={1}
              max={7}
              step={1}
              value={[formData.occupation]}
              onValueChange={(value) => setFormData({ ...formData, occupation: value[0] })}
            />
            <div className="text-sm text-muted-foreground">Categoria {formData.occupation}</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="income">Renda Anual</Label>
            <Input
              id="income"
              type="number"
              value={formData.income}
              onChange={(e) => setFormData({ ...formData, income: parseFloat(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="risk">Disposição para Risco (1-4)</Label>
            <Slider
              id="risk"
              min={1}
              max={4}
              step={1}
              value={[formData.risk]}
              onValueChange={(value) => setFormData({ ...formData, risk: value[0] })}
            />
            <div className="text-sm text-muted-foreground">Nível {formData.risk}</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="netWorth">Patrimônio Líquido</Label>
            <Input
              id="netWorth"
              type="number"
              value={formData.netWorth}
              onChange={(e) => setFormData({ ...formData, netWorth: parseFloat(e.target.value) })}
            />
          </div>

          <Button type="submit" className="w-full">
            Calcular Tolerância ao Risco
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 