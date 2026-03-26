export function normalizeText(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filterHistoryItems(items, search) {
  if (!search.trim()) return items;

  const query = normalizeText(search);

  return items.filter((item) => {
    const company = normalizeText(item.companyName);
    const document = normalizeText(item.companyDocument);
    const partner = normalizeText(item.partnerName);

    return (
      company.includes(query) ||
      document.includes(query) ||
      partner.includes(query)
    );
  });
}

export function formatHistoryDate(dateString) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatCurrency(value = 0) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}