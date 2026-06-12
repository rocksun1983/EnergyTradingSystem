export default function Navbar({
  account,
}) {
  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h2 className="font-bold text-xl">
        Dashboard
      </h2>

      <div className="bg-green-500 text-white px-4 py-2 rounded">
        {account
          ? `${account.slice(
              0,
              6
            )}...${account.slice(-4)}`
          : "Not Connected"}
      </div>
    </div>
  );
}