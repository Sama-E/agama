import React from 'react'
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import FundCard from './FundCard';


const DisplayCampaigns = ({title, isLoading, campaigns}) => {
  const navigate = useNavigate();

  //Navigate to one campaign details
  //state of campaign is routed through campaign details page
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">

        {/* Loading campaigns */}
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {/* No campaigns */}
        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {/* Loading & Map through single campaigns into FundCard */}
        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
          key={campaign.pId}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns;