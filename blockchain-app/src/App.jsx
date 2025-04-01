import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "./BlockchainDatabaseABI.json"; // Replace with actual ABI
import "./App.css";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3s"; // Replace with your deployed address

function App() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [retrievedValue, setRetrievedValue] = useState("");

  async function connectWallet() {
    if (!window.ethereum) return alert("Please install MetaMask.");
    
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      alert("Wallet Connected!");
    } catch (error) {
      console.error(error);
    }
  }

  async function storeData() {
    if (!window.ethereum) return alert("Wallet not connected!");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const tx = await contract.storeData(key, value);
      await tx.wait();
      alert("Data Stored Successfully!");
    } catch (error) {
      console.error(error);
    }
  }

  async function retrieveData() {
    if (!window.ethereum) return alert("Wallet not connected!");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    try {
      const result = await contract.retrieveData(key);
      setRetrievedValue(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <h1>Blockchain Database</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
  
      <input type="text" placeholder="Key" onChange={(e) => setKey(e.target.value)} />
      <input type="text" placeholder="Value" onChange={(e) => setValue(e.target.value)} />
      <button onClick={storeData}>Store Data</button>
  
      <button onClick={retrieveData}>Retrieve Data</button>
      <p>Stored Value: {retrievedValue}</p>
    </div>
  );
}  

export default App;
