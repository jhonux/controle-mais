import { NextResponse } from 'next/server';
import { getTiposTransacao } from '@/lib/data';

export async function GET() {
  try {
    const userId = 1; 
    const tipos = await getTiposTransacao(userId);
    return NextResponse.json(tipos);

  } catch (error) {
    console.error('[API_TIPOS_TRANSACAO_GET]', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}