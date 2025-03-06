export const formatCurrency = (value: string) => {
  // Remove tudo que não for número
  const numericValue = value.replace(/\D/g, "");

  // Converte para número e divide por 100 para representar centavos corretamente
  const floatValue = parseFloat(numericValue) / 100;

  // Retorna formatado como moeda brasileira (BRL)
  return floatValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
