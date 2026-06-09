export default function MarketplaceTable({
  listings,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Marketplace Listings
      </h2>

      <table className="w-full">

        <thead>

          <tr>

            <th>ID</th>
            <th>Seller</th>
            <th>Units</th>
            <th>Price</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {listings.map((item) => (
            <tr key={item.id}>

              <td>{item.id}</td>

              <td>
                {item.seller.slice(0, 8)}
              </td>

              <td>{item.units}</td>

              <td>{item.price}</td>

              <td>
                {item.active
                  ? "Active"
                  : "Sold"}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}