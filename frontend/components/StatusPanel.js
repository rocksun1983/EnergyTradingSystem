export default function StatusPanel({
  account,
  balance,
}) {
  return (
    <div className="card mb-8">

      <div className="flex gap-3 mb-4">

        <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
          Wallet Connected
        </span>

        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
          Sepolia Network
        </span>

      </div>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-gray-400">
            Wallet
          </p>

          <h3 className="font-bold">
            {account}
          </h3>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-gray-400">
            Network
          </p>

          <h3>
            Ethereum Sepolia
          </h3>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-gray-400">
            Token Balance
          </p>

          <h3>
            {balance}
          </h3>
        </div>

      </div>

    </div>
  );
}