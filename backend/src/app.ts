import express from "express"
import cors from "cors"

import calculationsRoutes from "./modules/calculations/calculations.routes"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/calculations", calculationsRoutes)

export default app