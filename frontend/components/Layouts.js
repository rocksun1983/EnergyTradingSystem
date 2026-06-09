export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">

        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold">
            ⚡ Energy Trading
          </h1>

          <p className="text-sm text-slate-400 mt-2">
            Web3 Metering Platform
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">

          <ul className="space-y-2">

            <li>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                📊 Dashboard
              </button>
            </li>

            <li>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800 transition">
                ⚡ Marketplace
              </button>
            </li>

            <li>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800 transition">
                🔌 Meters
              </button>
            </li>

            <li>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800 transition">
                📜 Transactions
              </button>
            </li>

            <li>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800 transition">
                👨‍💼 Admin
              </button>
            </li>

          </ul>

        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 text-sm text-slate-400">
          Energy Trading System
          <br />
          Sepolia Testnet
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>

    </div>
  );
}