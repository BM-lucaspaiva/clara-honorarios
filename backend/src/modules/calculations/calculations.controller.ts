import { Request, Response } from "express"
import * as service from "./calculations.service"
import { CreateCalculationDTO } from "./calculations.types"

type GetByIdParams = {
  id: string
}

export const create = async (
  req: Request<{}, {}, CreateCalculationDTO>,
  res: Response
) => {
  try {
    const result = await service.create(req.body)
    return res.status(201).json(result)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const list = async (_req: Request, res: Response) => {
  try {
    const result = await service.list()
    return res.json(result)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const getById = async (
  req: Request<GetByIdParams>,
  res: Response
) => {
  try {
    const result = await service.getById(req.params.id)
    return res.json(result)
  } catch (error: any) {
    return res.status(404).json({ error: error.message })
  }
}