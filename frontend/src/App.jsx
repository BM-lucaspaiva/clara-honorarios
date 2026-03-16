import { BrowserRouter, Route, Routes } from "react-router-dom"

import Calculo from "./pages/Calculo"
import Dashboard from "./pages/Dashboard"
import Historico from "./pages/Historico"
import Login from "./pages/Login"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<Historico />} path="/historico" />
        <Route element={<Calculo />} path="/calculo" />
        <Route element={<Calculo />} path="/" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
