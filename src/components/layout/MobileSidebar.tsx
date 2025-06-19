
'use client';

import { useState } from 'react';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, PlusSquare, Tag, CreditCard, PanelLeftClose } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/nova-transacao', label: 'Nova Transação', icon: PlusSquare },
  { href: '/categorias', label: 'Categorias', icon: Tag },
  { href: '/formas-pagamento', label: 'Formas de Pagamento', icon: CreditCard },
];

export default function MobileSidebar() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background p-2 md:hidden">
      <div className="flex justify-end items-center">

        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[300px] bg-gray-800 text-white border-r-gray-800 p-0">
            <div className="flex flex-col h-full">

              <div className="flex items-center justify-between px-4 py-6 border-b border-gray-800">
                <div className=" rounded-lg p-1">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="w-10 h-9"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Controle +</h1>
                  <p className="text-sm text-gray-400">Controle Financeiro</p>
                </div>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700">
                    <PanelLeftClose className="h-5 w-5" />
                    <span className="sr-only">Fechar menu</span>
                  </Button>
                </SheetClose>
              </div>

              <nav className="flex-grow p-4">
                <p className="text-xs text-gray-400 uppercase mb-3">Menu Principal</p>
                <ul className="space-y-1">
                  {menuItems.map(({ href, label, icon: Icon }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setSheetOpen(false)}
                        className={clsx(
                          'flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 transition-all  hover:text-white',
                          {
                            'bg-gray-800 text-white font-semibold': pathname === href,
                          }
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}