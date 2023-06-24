// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Funding {
    //Campaign Object
    struct Campaign{
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    //Map through campaigns
    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    //Create campaign
    function createCampaign(address _owner, string memory _title, string memory _description, 
    uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        //Requirement
        require(campaign.deadline < block.timestamp, 
        "The deadline should be a date in the future." );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    //Donate to Campaign
    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        //campaigns refers to mapping campaigns to find one campaign
        Campaign storage campaign = campaigns[_id];

        //Push address of donator
        campaign.donators.push(msg.sender);
        //Push amount from donator
        campaign.donations.push(amount);

        //Transaction
        (bool sent, ) = payable(campaign.owner).call{value: amount} ("");

        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    //Get Donators of Campaign - parameters (address of donators, number of donations)
    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    //Get Campaigns
    function getCampaigns() public view returns (Campaign[] memory){
        //Var allCampaigns = []
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        //Populate allCampaigns
        for(uint i = 0 ; i < numberOfCampaigns; i++){
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}