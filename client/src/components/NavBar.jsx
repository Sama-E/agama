import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { CustomButton } from './';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';


const NavBar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);

  //Wallet address
  const address = "0xadfdsaf";

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#d0d0fd] rounded-[100px]">
        <input type="text" placeholder=" Search for Campaigns" className="flex  w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"/>

        <div className="flex justify-center items-center w-[72px] h-full rounded-[20px] bg-[#4acd8d] cursor-pointer">
          <img src={search} alt="serach" className="w-[15px] h-[15px] object-contain" />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton 
          btnType="button" 
          title={address ? 'Create a campaign' : 'Connect'} styles={address ? 'bg-[#1dc071]' : 'bg[#8c6dfd]'} 
          handleClick={() =>{
            if(address) navigate('create-campaign')
            else 'connect()'
          }} 
        />
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
          </div>
        </Link>
      </div>

    </div>
  )
}

export default NavBar;