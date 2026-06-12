import Navbar from "./Navbar";

export default function Layout({
  children,
  account,
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar account={account} />

      <main className="max-w-7xl mx-auto p-8">
        {children}
      </main>

    </div>
  );
}