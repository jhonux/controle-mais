// src/lib/data.ts (Esta parte já está correta)

import 'server-only';

export interface Categoria {
  id: number | string;
  nom_categoria: string;
}

const API_BASE_URL = process.env.API_BASE_URL || 'https://apex.oracle.com/pls/apex/controleplus/controle';

export async function getCategories(userId: string): Promise<Categoria[]> {
  const apiUrl = `${API_BASE_URL}/categoria?P_ID_USUARIO=${userId}`;
  try {
    const response = await fetch(apiUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error('Erro na API');
    
    const data = await response.json();
    const categoriesFromApi = data.items || data;
    
    return categoriesFromApi.map((apiItem: any) => ({
      id: apiItem.id_categoria,
      nome: apiItem.nom_categoria,
    }));
  } catch (error) {
    console.error('Falha ao buscar categorias:', error);
    return [];
  }
}