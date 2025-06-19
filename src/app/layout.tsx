import "./globals.css";
import Image from "next/image";
import Sidebar from "@/components/layout/SideBar";
import MobileSidebar from "@/components/layout/MobileSidebar";
import { Toaster } from "sonner";

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
      <body>
        <Sidebar />


        <div className="flex flex-col min-h-screen md:ml-64">
          

          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
            <div className="md:hidden">
              <MobileSidebar />
            </div>
            <div className="hidden flex-1 md:block"></div>

            <div className="flex items-center">
              <Image
                src="/images/avatar.svg"
                alt="Avatar"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
            </div>
          </header>


          <main className="flex-1 p-1 md:p-6 lg:p-3 bg-gray-100">
            {children}
          </main>


          <footer className="text-black text-xs text-center p-2 bg-gray-100">
            Este aplicativo é fictício e não possui qualquer vínculo com instituição financeira real.
          </footer>
        </div>

        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}