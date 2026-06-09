export default function AdminCards({
  totalMeters,
  totalListings,
  totalUsers,
}) {
  return (
    <div className="grid grid-cols-3 gap-4">

      <div className="bg-blue-100 p-6 rounded">
        Total Meters
        <div className="text-2xl font-bold">
          {totalMeters}
        </div>
      </div>

      <div className="bg-green-100 p-6 rounded">
        Listings
        <div className="text-2xl font-bold">
          {totalListings}
        </div>
      </div>

      <div className="bg-yellow-100 p-6 rounded">
        Users
        <div className="text-2xl font-bold">
          {totalUsers}
        </div>
      </div>

    </div>
  );
}