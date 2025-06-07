'use client'

import { Home, PlusSquare, BarChart2, Tag, CreditCard, LogOut } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/nova-transacao', label: 'Nova Transação', icon: PlusSquare },
    { href: '/relatorios', label: 'Relatórios', icon: BarChart2 },
    { href: '/categorias', label: 'Categorias', icon: Tag },
    { href: '/formas-pagamento', label: 'Formas de Pagamento', icon: CreditCard },
  ];

  return (
    <aside className="hidden md:flex side-bar h-screen w-64 bg-[#1F2937] text-white flex flex-col justify-between fixed min-h-screen">
      <div>
        <div className="flex items-center gap-2 px-6 py-6">
          <div className=" rounded-lg p-2">
              <Image
                src="/images/logo.png" // coloque logo.png na pasta /public
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
        </div>

        <nav className="px-4 mt-4">
          <p className="text-xs text-gray-400 uppercase mb-3">Menu Principal</p>
          <ul className="space-y-2">
            {menuItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-gray-700',
                    pathname === href && 'bg-gray-700'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="px-4 mb-4">
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg w-full">
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
