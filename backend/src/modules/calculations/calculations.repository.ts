import pool from "../../config/db"
import { Calculation, CreateCalculationDTO } from "./calculations.types"

type CalculationRow = {
  id: string
  empresa: string
  socio: string
  empresaPresta: string[]
  average_value: string | number
  calculation_data: any
  created_at: Date
  updated_at: Date
}

export const createCalculation = async (
  data: CreateCalculationDTO
): Promise<Calculation> => {
  const query = `
    INSERT INTO calculations
    (company_name, partner_name, quoted_companies, average_value, calculation_data)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `

  const values = [
    data.empresa,
    data.socio,
    data.empresaPresta,
    data.averageValue,
    JSON.stringify(data.calculationData),
  ]

  const result = await pool.query<CalculationRow>(query, values)

  const row = result.rows[0]

  if(!row) {
    throw new Error("Erro ao criar cálculo")
  }

  return mapRow(row)
}

export const listCalculations = async (): Promise<Calculation[]> => {
  const result = await pool.query<CalculationRow>(`
    SELECT * FROM calculations
    ORDER BY created_at DESC
  `)

  return result.rows.map(mapRow)
}

export const getCalculationById = async (
  id: string
): Promise<Calculation | null> => {
  const result = await pool.query<CalculationRow>(
    `SELECT * FROM calculations WHERE id = $1`,
    [id]
  )

  const row = result.rows[0]

  if (!row) return null

  return mapRow(row)
}

function mapRow(row: CalculationRow): Calculation {
  return {
    id: row.id,
    empresa: row.empresa,
    socio: row.socio,
    empresaPresta: row.empresaPresta,
    averageValue: Number(row.average_value),
    calculationData: row.calculation_data,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}