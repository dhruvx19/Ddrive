import logo from './logo.svg';
import {useEffect,useState} from "react";
import {ethers} from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json"
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import './App.css';

function App() {
  const [account,setAccount]=useState('');
 const [contract,setContract]=useState(null);
 const [provider,setProvider]=useState(null);
 const [modalOpen,setModalOpen]=useState(false);

 useEffect(()=>{
  const wallet = ()=>{
    const provider = new ethers.BrowserProvider(window.ethereum);
    const wallet =async ()=>{
     
     if(provider){
      await provider.send("eth_requestAccounts",[]);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address);
      setAccount(address);
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contract = new ethers.Contract(
        contractAddress,
        Upload.abi,
        signer);

        console.log(contract);
        setContract(contract);
        setProvider(signer);

     }else{
      alert("Metamask is not installed");
     }

    }
  }
  provider && wallet()
 },[])

  return (
    <div className="App"> 
    <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display> 
      
    </div>
  );
}

export default App;
