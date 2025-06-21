'use server';

export interface Categoria {
  id: number | string;
  nome: string;
}

export interface FormaPagamento {
  id: number | string;
  nome: string;
}

export interface TipoTransacao {
  id: number | string;
  nome: string;
}


const API_BASE_URL = process.env.API_BASE_URL || 'https://apex.oracle.com/pls/apex/controleplus/controle';


export async function getCategories(userId: string | number): Promise<Categoria[]> {
  const apiUrl = `${API_BASE_URL}/categoria?P_ID_USUARIO=${userId}`;
  try {
    const response = await fetch(apiUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error('Erro na API ao buscar categorias');
    
    const data = await response.json();
    const categoriesFromApi = data.items || data;

    return categoriesFromApi
      .filter((apiItem: any) => apiItem.nom_categoria) 
      .map((apiItem: any) => ({
        id: apiItem.id_categoria,
        nome: apiItem.nom_categoria, 
      }));
      
  } catch (error) {
    console.error('Falha ao buscar categorias:', error);
    return [];
  }
}

export async function getFormasPagamento(userId: string | number): Promise<FormaPagamento[]> {
  const apiUrl = `${API_BASE_URL}/forma_pagamento?P_ID_USUARIO=${userId}`;
  try {
    const response = await fetch(apiUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error('Erro na API ao buscar formas de pagamento');
    
    const data = await response.json();
    const formasFromApi = data.items || data;

    return formasFromApi
      .filter((apiItem: any) => apiItem.nom_forma_pagamento)
      .map((apiItem: any) => ({
        id: apiItem.id_forma_pagamento,
        nome: apiItem.nom_forma_pagamento, 
      }));
      
  } catch (error) {
    console.error('Falha ao buscar formas de pagamento:', error);
    return [];
  }
}

export async function getTiposTransacao(userId: string | number): Promise<TipoTransacao[]> {
  const apiUrl = `${API_BASE_URL}/tipo_transacao?P_ID_USUARIO=${userId}`;
  try {
    const response = await fetch(apiUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error('Erro na API ao buscar tipos de transação');
    const data = await response.json();
    const tiposFromApi = data.items || data;
    return tiposFromApi
      .filter((apiItem: any) => apiItem.nom_tipo_transacao)
      .map((apiItem: any) => ({
        id: apiItem.id_tipo_transacao,
        nome: apiItem.nom_tipo_transacao,
      }));
  }
  catch (error) {
    console.error('Falha ao buscar tipos de transação:', error);
    return [];
  }
}