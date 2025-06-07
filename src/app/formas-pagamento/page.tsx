

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FormasPagamento = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Formas de Pagamento</h1>
          <p className="text-muted-foreground">Gerencie suas formas de pagamento</p>
        </div>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Suas Formas de Pagamento</CardTitle>
            <CardDescription>
              Visualize e gerencie todas as suas formas de pagamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Em desenvolvimento...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormasPagamento;
