export interface Categoria {
  id: string; // Um ID único para cada categoria
  nome: string; // O nome da categoria
}

export const mockCategorias: Categoria[] = [
  { id: 'cat-alimentacao', nome: 'Alimentação' },
  { id: 'cat-transporte', nome: 'Transporte' },
  { id: 'cat-saude', nome: 'Saúde' },
  { id: 'cat-educacao', nome: 'Educação' },
  { id: 'cat-lazer', nome: 'Lazer' },
  { id: 'cat-casa', nome: 'Casa' },
  { id: 'cat-vestuario', nome: 'Vestuário' },
  { id: 'cat-salario', nome: 'Salário' }, // Adicionando uma para receita, se for o caso
  { id: 'cat-outros', nome: 'Outros' },
];

export interface FormaPagamento {
  id: string; // Um ID único para cada forma de pagamento
  nome: string; // O nome da forma de pagamento
}

export const mockPagamentos: FormaPagamento[] = [
  { id: 'pgto-cartao', nome: 'Cartão de Crédito' },
  { id: 'pgto-boleto', nome: 'Boleto Bancário' },
  { id: 'pgto-pix', nome: 'Pix' },
  { id: 'pgto-dinheiro', nome: 'Dinheiro' },
];