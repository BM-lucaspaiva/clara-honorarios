export interface CalculationData {
  empresaPrestaId?: string
  empresaId?: string

  salarioMin?: number
  percSalarioMin?: number
  impostos?: number
  valorMin?: number
  consultoria?: boolean
  baseValue?: number

  regime?: string
  segmentos?: string[]

  faturamentoMedio?: number
  socios?: number
  funcionarios?: number
  filiais?: number

  percFatur?: number
  percFilial?: number

  balancete?: string
  reuniao?: string

  integracoes?: string[]

  observacoesId?: string

  // futuro
  version?: string
}

export interface CreateCalculationDTO {
  empresa: string
  socio: string
  empresaPresta: string[]
  averageValue: number
  calculationData: CalculationData
}

export interface Calculation extends CreateCalculationDTO {
  id: string
  createdAt: Date
  updatedAt: Date
}