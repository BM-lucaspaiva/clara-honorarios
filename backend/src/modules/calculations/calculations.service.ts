import {
  createCalculation,
  listCalculations,
  getCalculationById
} from "./calculations.repository"

import { CreateCalculationDTO } from "./calculations.types"

export const create = async (data: CreateCalculationDTO) => {
  // validação básica (você pode evoluir isso depois)
  if (!data.empresa) {
    throw new Error("empresa é obrigatória")
  }

  return createCalculation(data)
}

export const list = async () => {
  return listCalculations()
}

export const getById = async (id: string) => {
  const result = await getCalculationById(id)

  if (!result) {
    throw new Error("Cálculo não encontrado")
  }

  return result
}