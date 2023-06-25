import React, { useState, useEffect } from 'react';
import { useStateContext } from '../contextAPI';


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const{ address, contract, getCampaigns } = useStateContext();

  //Create a function to carry getCampaigns because its a async function
  //Can not call async function into a useEffect
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);

  } 

  useEffect(() => {
    //Ensure contract exists, then call fetchCampaigns
    //fetchCampaigns is vehicle for getCampaigns
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>Home</div>
  )
}

export default Home;