export default function MarketplaceTable({
  listings,
  buyEnergy,
}) {
  return (
    <div className="card mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Marketplace Listings
      </h2>

      <table className="w-full">

        <thead>

          <tr className="text-left border-b border-slate-700">

            <th>ID</th>
            <th>Seller</th>
            <th>Units</th>
            <th>Price</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {listings.map(item => (

            <tr
              key={item.id}
              className="border-b border-slate-800"
            >
              <td>{item.id}</td>

              <td>
                {item.seller.slice(0,10)}
              </td>

              <td>{item.units}</td>

              <td>{item.price}</td>

              <td>

                <button
                  onClick={() =>
                    buyEnergy(item.id)
                  }
                  className="bg-green-600 px-4 py-2 rounded-lg"
                >
                  Buy
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}