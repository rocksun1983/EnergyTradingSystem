import { useState } from "react";
import { connectWallet } from "../utils/connect";

export default function Home() {
    const [wallet, setWallet] = useState("");

    async function connect() {
        try {
            const signer = await connectWallet();
            const address = await signer.getAddress();
            setWallet(address);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Energy Trading Platform</h1>

            <button onClick={connect}>
                Connect Wallet
            </button>

            <p>Wallet: {wallet}</p>
        </div>
    );
}