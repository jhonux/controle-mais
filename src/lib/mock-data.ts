export interface Categoria {
  id: string; 
  nome: string; 
}

export const mockCategorias: Categoria[] = [
  { id: 'cat-alimentacao', nome: 'Alimentação' },
  { id: 'cat-transporte', nome: 'Transporte' },
  { id: 'cat-saude', nome: 'Saúde' },
  { id: 'cat-educacao', nome: 'Educação' },
  { id: 'cat-lazer', nome: 'Lazer' },
  { id: 'cat-casa', nome: 'Casa' },
  { id: 'cat-vestuario', nome: 'Vestuário' },
  { id: 'cat-salario', nome: 'Salário' }, 
  { id: 'cat-outros', nome: 'Outros' },
];

export interface FormaPagamento {
  id: string;
  nome: string; 
}

export const mockPagamentos: FormaPagamento[] = [
  { id: 'pgto-cartao', nome: 'Cartão de Crédito' },
  { id: 'pgto-boleto', nome: 'Boleto Bancário' },
  { id: 'pgto-pix', nome: 'Pix' },
  { id: 'pgto-dinheiro', nome: 'Dinheiro' },
];