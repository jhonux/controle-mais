// Arquivo: src/components/skeletons/DashboardSkeleton.tsx (Versão com Spinner)

import { Loader2 } from "lucide-react"; // <<< 1. Importamos o ícone de loader

// Componente base para um card de esqueleto com animação de pulso
function SkeletonCard() {
  return <div className="p-4 bg-gray-200 rounded-lg shadow-md animate-pulse h-28" />;
}

// Componente base para um bloco maior de esqueleto
function SkeletonBlock() {
  return <div className="p-6 bg-gray-200 rounded-lg shadow-md animate-pulse h-80" />;
}

export default function DashboardSkeleton() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      {/* <<< 2. ESQUELETO DO HEADER MODIFICADO >>> */}
      <div className="flex justify-between items-center mb-6">
        {/* Adicionamos o spinner e o texto aqui */}
        <div className="flex items-center gap-3">
          <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
          <div>
            <h1 className="text-xl font-bold text-gray-600">Carregando Dashboard...</h1>
            <p className="text-gray-400 text-sm">Por favor, aguarde.</p>
          </div>
        </div>
        
        {/* Mantemos o esqueleto do botão para consistência do layout */}
        <div className="h-10 bg-gray-300 rounded-lg w-36 hidden md:block animate-pulse"></div>
      </div>

      {/* O resto do esqueleto continua o mesmo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonBlock />
        <SkeletonBlock />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <SkeletonBlock />
        <SkeletonBlock />
      </div>
    </div>
  );
}