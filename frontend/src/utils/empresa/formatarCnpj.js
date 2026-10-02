export function digitosDoCnpj(valor) {
  return String(valor ?? "").replace(/\D/g, "").slice(0, 14)
}

export function formatarCnpj(valor) {
  const digitos = digitosDoCnpj(valor)
  if (digitos.length !== 14) return digitos

  return digitos.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
}
