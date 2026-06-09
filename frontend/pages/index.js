import { useEffect, useState } from "react";
import { ethers } from "ethers";

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
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1>Energy Trading Dashboard</h1>

      <button onClick={connectWallet}>
        Connect MetaMask
      </button>

      <p>
        Account: {account}
      </p>

      <p>
        Token Balance: {balance}
      </p>

      <hr />

      <h2>Register Meter</h2>

      <input
        placeholder="Meter Number"
        value={meterNumber}
        onChange={(e) =>
          setMeterNumber(
            e.target.value
          )
        }
      />

      <button
        onClick={registerMeter}
      >
        Register
      </button>

      <hr />

      <h2>Sell Energy</h2>

      <input
        placeholder="Units"
        value={energyUnits}
        onChange={(e) =>
          setEnergyUnits(
            e.target.value
          )
        }
      />

      <input
        placeholder="Price"
        value={energyPrice}
        onChange={(e) =>
          setEnergyPrice(
            e.target.value
          )
        }
      />

      <button
        onClick={sellEnergy}
      >
        List Energy
      </button>

      <hr />

      <h2>Buy Energy</h2>

      <input
        placeholder="Listing ID"
        value={buyId}
        onChange={(e) =>
          setBuyId(
            e.target.value
          )
        }
      />

      <button
        onClick={buyEnergy}
      >
        Buy Energy
      </button>

      <hr />

      <h2>Marketplace Listings</h2>

      {listings.map((item) => (
        <div
          key={item.id}
          style={{
            border:
              "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <p>ID: {item.id}</p>
          <p>Seller: {item.seller}</p>
          <p>Units: {item.units}</p>
          <p>Price: {item.price}</p>
          <p>
            Active:
            {item.active
              ? " Yes"
              : " No"}
          </p>
        </div>
      ))}
    </div>
  );
}