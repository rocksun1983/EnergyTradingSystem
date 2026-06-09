export default function TransactionTable({
  transactions,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Transaction History
      </h2>

      <table className="w-full">

        <thead>
          <tr>
            <th>Hash</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {transactions.map((tx) => (
            <tr key={tx.hash}>

              <td>
                {tx.hash.slice(0, 10)}
              </td>

              <td>{tx.type}</td>

              <td>{tx.status}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}