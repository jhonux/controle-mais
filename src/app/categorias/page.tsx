import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NovaTransacaoPage() {
  return (
    <main className="min-h-screen p-6 bg-gray-100">
     <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
          <p className="text-muted-foreground">Gerencie suas categorias de transações</p>
        </div>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Suas Categorias</CardTitle>
            <CardDescription>
              Visualize e gerencie todas as suas categorias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Em desenvolvimento...
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
