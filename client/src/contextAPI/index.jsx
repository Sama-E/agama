import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
// import { ethers } from 'ethers';


const StateContext = createContext();

export const StateContextProvider = ({children}) => {

  //Connect with smart contract
  const { contract } = useContract('0x08B53921Cb3B3BF3F1720C22eA2DDb17b5573029', "token");

  const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign")

  //Wallet Address
  const address = useAddress();
  //Connect to Metamask
  const connect = useMetamask();

  //Publish Campaign with Smart Contract on Block
  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({args:[
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline
        form.image
      ]})

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign : publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

//Custom hook
export const useStateContext = () => useContext(StateContext);