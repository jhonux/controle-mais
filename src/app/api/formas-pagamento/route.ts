import { NextResponse } from 'next/server';
import { getFormasPagamento } from '@/lib/data'; 

export async function GET() {
  try {
    const userId = 1;
    const formasPagamento = await getFormasPagamento(userId);
    return NextResponse.json(formasPagamento);

  } catch (error) {
    console.error('[API_FORMAS_PAGAMENTO_GET]', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}