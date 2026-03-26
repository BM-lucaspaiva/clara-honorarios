import { Request, Response } from "express"
import { calcularHonorarios } from "./calculations.service"

export async function calculate(req: Request, res: Response) {
  const data = req.body

  const result = calcularHonorarios(data)

  return res.json(result)
}