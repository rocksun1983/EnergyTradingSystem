export default function Navbar({
  account,
  connectWallet,
}) {
  return (
    <div className="flex justify-between items-center mb-8">

      <h2 className="text-3xl font-bold">
        Dashboard
      </h2>

      <button
        onClick={connectWallet}
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        {account
          ? account.slice(0, 6) +
            "..." +
            account.slice(-4)
          : "Connect Wallet"}
      </button>

    </div>
  );
}