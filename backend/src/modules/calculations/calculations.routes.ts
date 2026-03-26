import { Router } from "express"
import { calculate } from "./calculations.controller"

const router = Router()

router.post("/", calculate)

export default router