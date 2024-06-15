import { useState } from 'react';
import { Addressable, ethers } from 'ethers';
import abi from './abi.json';

export const WalletCard = () => {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const address = '0xA2119EC01313AF5c4c1225698bA670437DbBac46' as
    | string
    | Addressable;

  const getAddress = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let provider: any;
    if (window.ethereum == null) {
      console.log('MetaMask not installed; using read-only defaults');
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      setSigner(await provider?.getSigner());
    }
  };

  const getSymb = async () => {
    const contract = new ethers.Contract(address, abi, signer);
    const sym = await contract.symbol();
    console.log(sym);
  };

  console.log(signer);
  return (
    <div>
      {signer !== null ? <div>{signer.address}</div> : <div>dfsfd</div>}
      <button onClick={getAddress}>get address</button>
      <button onClick={getSymb}>symbol</button>
    </div>
  );
};
