import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/data'; 

export async function GET() {
  try {

    const userId = 1; 
    

    const categorias = await getCategories(userId);
   
    return NextResponse.json(categorias);

  } catch (error) {
    console.error('[API_CATEGORIAS_GET]', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}