import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";


import {
  ENERGY_TOKEN,
  METER_REGISTRY,
  MARKETPLACE,
  energyTokenAbi,
  meterRegistryAbi,
  marketplaceAbi,
} from "../utils/contracts";

export default function Home() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("0");

  const [meterNumber, setMeterNumber] = useState("");
  const [energyUnits, setEnergyUnits] = useState("");
  const [energyPrice, setEnergyPrice] = useState("");
  const [buyId, setBuyId] = useState("");

  const [listings, setListings] = useState([]);

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const provider =
        new ethers.BrowserProvider(window.ethereum);

      const accounts =
        await provider.send(
          "eth_requestAccounts",
          []
        );

      const network =
        await provider.getNetwork();

      console.log(
        "Connected Network:",
        network.chainId.toString()
      );

      setAccount(accounts[0]);

      await loadBalance(accounts[0]);
      await loadListings();

    } catch (error) {
      console.error(error);
    }
  }

  async function loadBalance(user) {
    try {
      const provider =
        new ethers.BrowserProvider(window.ethereum);

      const token =
        new ethers.Contract(
          ENERGY_TOKEN,
          energyTokenAbi,
          provider
        );

      const bal =
        await token.balanceOf(user);

      setBalance(
        ethers.formatEther(bal)
      );

    } catch (error) {
      console.error(
        "Balance Error:",
        error
      );
    }
  }

  async function registerMeter() {
    try {
      const provider =
        new ethers.BrowserProvider(window.ethereum);

      const signer =
        await provider.getSigner();

      const registry =
        new ethers.Contract(
          METER_REGISTRY,
          meterRegistryAbi,
          signer
        );

      const tx =
        await registry.registerMeter(
          meterNumber
        );

      await tx.wait();

      alert("Meter Registered");

    } catch (error) {
      console.error(
        "Register Meter Error:",
        error
      );
    }
  }

  async function sellEnergy() {
    try {
      const provider =
        new ethers.BrowserProvider(window.ethereum);

      const signer =
        await provider.getSigner();

      const market =
        new ethers.Contract(
          MARKETPLACE,
          marketplaceAbi,
          signer
        );

      const tx =
        await market.listEnergy(
          energyUnits,
          ethers.parseEther(
            energyPrice
          )
        );

      await tx.wait();

      alert("Energy Listed");

      await loadListings();

    } catch (error) {
      console.error(
        "Sell Energy Error:",
        error
      );
    }
  }

  async function approveMarketplace() {
  try {
    const provider =
      new ethers.BrowserProvider(window.ethereum);

    const signer =
      await provider.getSigner();

    const token =
      new ethers.Contract(
        ENERGY_TOKEN,
        energyTokenAbi,
        signer
      );

    const tx =
      await token.approve(
        MARKETPLACE,
        ethers.parseEther("1000")
      );

    await tx.wait();

    alert("Marketplace Approved");

  } catch (error) {
    console.error(
      "Approve Error:",
      error
    );
  }
}

  async function buyEnergy() {
    try {
      const provider =
        new ethers.BrowserProvider(window.ethereum);

      const signer =
        await provider.getSigner();

      const market =
        new ethers.Contract(
          MARKETPLACE,
          marketplaceAbi,
          signer
        );

      const tx =
        await market.buyEnergy(
          buyId
        );

      await tx.wait();

      alert("Energy Purchased");

      await loadListings();

    } catch (error) {
      console.error(
        "Buy Energy Error:",
        error
      );
    }
  }

    async function loadListings() {
    try {
      const provider =
        new ethers.BrowserProvider(window.ethereum);

      console.log(
        "MARKETPLACE:",
        MARKETPLACE
      );

      const network =
        await provider.getNetwork();

      console.log(
        "CHAIN:",
        network.chainId.toString()
      );

      const code =
        await provider.getCode(
          MARKETPLACE
        );

      console.log(
        "CONTRACT CODE:",
        code
      );

      if (code === "0x") {
        console.error(
          "No contract found at address!"
        );
        return;
      }

      const market =
        new ethers.Contract(
          MARKETPLACE,
          marketplaceAbi,
          provider
        );

      const count =
        await market.listingCounter();

      console.log(
        "LISTING COUNT:",
        count.toString()
      );

      const temp = [];

      for (
        let i = 0;
        i < Number(count);
        i++
      ) {
        const item =
          await market.listings(i);

        temp.push({
          id: item[0].toString(),
          seller: item[1],
          units: item[2].toString(),
          price:
            ethers.formatEther(
              item[3]
            ),
          active: item[4],
        });
      }

      setListings(temp);

    } catch (error) {
      console.error(
        "LOAD LISTINGS ERROR:",
        error
      );
    }
  }

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.ethereum
    ) {
      loadListings();
    }
  }, []);

  return (
  <div className="flex bg-slate-100 min-h-screen">
    <Sidebar />

    <div className="flex-1">
      <Navbar account={account} />

      <div className="p-6">

        <div className="grid md:grid-cols-3 gap-6">

          <StatCard
            title="Token Balance"
            value={balance}
          />

          <StatCard
            title="Listings"
            value={listings.length}
          />

          <StatCard
            title="Wallet"
            value={
              account
                ? "Connected"
                : "Disconnected"
            }
          />

        </div>


    <div className="bg-white mt-6 p-6 rounded-xl shadow">
      <button
        onClick={connectWallet}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Connect MetaMask
      </button>

      <button
        onClick={approveMarketplace}
        className="bg-orange-600 text-white px-6 py-3 rounded ml-4"
      >
        Approve Marketplace
      </button>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mt-6">

      {/* Register Meter */}

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">
          Register Meter
        </h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Meter Number"
          value={meterNumber}
          onChange={(e) =>
            setMeterNumber(e.target.value)
          }
        />

        <button
          onClick={registerMeter}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Register
        </button>

      </div>
        
      {/* Sell Energy */}

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">
          Sell Energy
        </h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Units"
          value={energyUnits}
          onChange={(e) =>
            setEnergyUnits(e.target.value)
          }
        />

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Price ETH"
          value={energyPrice}
          onChange={(e) =>
            setEnergyPrice(e.target.value)
          }
        />

        <button
          onClick={sellEnergy}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          List Energy
        </button>
      </div>

      {/* Buy Energy */}

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">
          Buy Energy
        </h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Listing ID"
          value={buyId}
          onChange={(e) =>
            setBuyId(e.target.value)
          }
        />

        <button
          onClick={buyEnergy}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Buy Energy
        </button>
      </div>

    </div>

    {/* Marketplace Table */}

    <div className="bg-white mt-6 p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Marketplace Listings
      </h2>

      <table className="w-full border-collapse">

        <thead>

          <tr className="bg-slate-100">

            <th className="border p-3">ID</th>
            <th className="border p-3">Seller</th>
            <th className="border p-3">Units</th>
            <th className="border p-3">Price</th>
            <th className="border p-3">Status</th>

          </tr>

        </thead>

        <tbody>

          {listings.map((item) => (
            <tr key={item.id}>

              <td className="border p-3">
                {item.id}
              </td>

              <td className="border p-3">
                {item.seller.slice(0, 8)}...
              </td>

              <td className="border p-3">
                {item.units}
              </td>

              <td className="border p-3">
                {item.price}
              </td>

              <td className="border p-3">
                {item.active ? (
                  <span className="text-green-600 font-bold">
                    Active
                  </span>
                ) : (
                  <span className="text-red-600 font-bold">
                    Sold
                  </span>
                )}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

        </div>

      </div>
    </div>
  );
}