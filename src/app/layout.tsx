
import Link from "next/link";
import "./globals.css";
import  Sidebar  from "@/components/sidebar/SideBar";


export const metadata = {
  title: 'Controle Financeiro',
  description: 'Dashboard financeiro para gerenciar suas finanças',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
         
         <Sidebar />
        <header className="text-white relative py-4 px-4 flex items-center justify-center header-layout ">      
          <div className="absolute right-4 inset-y-0 flex items-center">
            <img src="/images/avatar.svg" alt="Avatar" className="h-8 w-8 rounded-full "/>
          </div>
        </header>

        <div className="flex min-h-screen">
          <main className="flex-1 md:ml-64 p-6 bg-gray-100">{children}

          </main>
        </div>
          <footer className="text-black text-xs text-center p-2">
            Este aplicativo é fictício e não possui qualquer vínculo com instituição financeira real.
          </footer>
     
      </body>
    </html>
  );
}
