import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';


const StateContext = createContext();

export const StateContextProvider = ({children}) => {

  //Connect with smart contract
  const { contract } = useContract('0x08B53921Cb3B3BF3F1720C22eA2DDb17b5573029', "token");

  const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign");

  //Wallet Address
  const address = useAddress();
  //Connect to Metamask
  const connect = useMetamask();

  //Publish New Campaign with Smart Contract on Block
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

  //Get all campaigns
  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');
    //Parse/Map campaigns array of arrays
    //Return one parsed campaign object
    //Turn BigNumbers(target, deadline, amountCollected) to human readable format
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));

      return parsedCampaigns;
    }

    //For Profile - Individual Profile Campaigns
    const getUserCampaigns = async () => {
      const allCampaigns = await getCampaigns();

      const filteredCampaigns = allCampaigns.filter((campaign) =>
        campaign.owner === address);

        return filteredCampaigns;
    }

    //Donate 
    const donate = async (pId, amount) => {
      const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount) });
  
      return data;
    }

    //Donations
    const getDonations = async (pId) => {
      const donations = await contract.call('getDonators', [pId]);
      const numberOfDonations = donations[0].length;
  
      const parsedDonations = [];
  
      for(let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString())
        })
      }
  
      return parsedDonations;
    }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign : publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

//Custom hook
export const useStateContext = () => useContext(StateContext);