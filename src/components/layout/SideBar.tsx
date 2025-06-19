'use client';

import { Home, PlusSquare, Tag, CreditCard } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/nova-transacao', label: 'Nova Transação', icon: PlusSquare },
    { href: '/categorias', label: 'Categorias', icon: Tag },
    { href: '/formas-pagamento', label: 'Formas de Pagamento', icon: CreditCard },
  ];

  return (

    <aside className="hidden md:flex flex-col h-screen w-64 bg-gray-800 text-white border-r border-gray-800 fixed">
      <div>
        <div className="flex items-center gap-2 px-6 py-6">
          <div className=" rounded-lg p-2">
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
        </div>

        <nav className="px-4 mt-4">
          <p className="px-3 py-2 text-xs font-semibold uppercase text-gray-400 tracking-wider">
            Menu Principal
          </p>
          <ul className="space-y-1">
            {menuItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={clsx(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white',
                    {
                      'bg-gray-700 text-white': pathname === href,
                    }
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;