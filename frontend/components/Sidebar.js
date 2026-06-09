export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        Energy Trading
      </h1>

      <ul className="space-y-4">
        <li className="hover:text-cyan-400 cursor-pointer">
          Dashboard
        </li>

        <li className="hover:text-cyan-400 cursor-pointer">
          Marketplace
        </li>

        <li className="hover:text-cyan-400 cursor-pointer">
          Meters
        </li>

        <li className="hover:text-cyan-400 cursor-pointer">
          Transactions
        </li>

        <li className="hover:text-cyan-400 cursor-pointer">
          Admin
        </li>
      </ul>
    </aside>
  );
}