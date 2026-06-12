export default function DashboardCards({
  balance,
  listings,
}) {
  return (
    <div className="grid md:grid-cols-4 gap-6">

      <div className="card">
        <h4 className="text-gray-400">
          Wallet Balance
        </h4>

        <h2 className="text-3xl font-bold mt-3">
          {balance}
        </h2>
      </div>

      <div className="card">
        <h4 className="text-gray-400">
          Active Listings
        </h4>

        <h2 className="text-3xl font-bold mt-3">
          {listings.length}
        </h2>
      </div>

      <div className="card">
        <h4 className="text-gray-400">
          Network
        </h4>

        <h2 className="text-3xl font-bold mt-3">
          Sepolia
        </h2>
      </div>

      <div className="card">
        <h4 className="text-gray-400">
          Marketplace
        </h4>

        <h2 className="text-3xl font-bold mt-3">
          Active
        </h2>
      </div>

    </div>
  );
}