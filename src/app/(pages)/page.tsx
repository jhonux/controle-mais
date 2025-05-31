import  Chart  from "./_components/chart";
import Tables from "./_components/tables";
import Link from 'next/link';

export default function Dash () {
  return (
  <main>
    <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="mt-4 text-lg">This is the dashboard page.</p>
        <Link
          href="/nova-transacao"
          className="text-white py-2 px-5 rounded-md font-semibold flex items-center justify-center w-fit gap-2"
          style={{ backgroundColor: '#008B8C' }}
        >
          INSERIR NOVA TRANSAÇÃO
        </Link>
    </div>
    <div className="mt-8 flex flex-col lg:flex-row">
      <div className="flex-1 mb-8 lg:mb-0 lg:mr-8"> 
          <Chart />
      </div>
      <div className="flex-1">
        <Tables />
      </div>

    </div>
  </main>
  );
}