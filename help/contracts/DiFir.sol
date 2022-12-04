// SPDX-License-Identifier: unlicensed

pragma solidity >0.7.0 < 0.9.0;

contract FirFactory{

    address[] public deployedFir;

    event firCreated(
        string title,
        string firStory,
        string firLivingAddress,
        string firContactNumber,
        string firVictimName,
        string imgURI,
        address firAddress,
        address indexed owner
        // string indexed category
    );

    function createFir(
        string memory firTitle,
        string memory firStory,
        string memory firLivingAddress,
        string memory firContactNumber,
        
        string memory firVictimName,
        string memory imgURI
        // string memory category
    ) public {
        Fir newFir = new Fir( firTitle, firStory, firLivingAddress, firContactNumber, firVictimName, imgURI);

        deployedFir.push(address(newFir));

        emit firCreated(
            firTitle,
            firStory,
            firLivingAddress,
            firContactNumber,
            firVictimName,
            imgURI,
            address(newFir),
            msg.sender
        );
    }
}

contract Fir{
    string public title;
    string public story;
    string public livingAddress;
    string public contactNumber;
    string public victimName;
    string public image;
    address payable public owner;

    constructor(
        string memory firTitle,
        string memory firStory,
        string memory firLivingAddress,
        string memory firContactNumber,
        string memory firVictimName,
        string memory firImage
    ){
        title = firTitle;
        story = firStory;
        livingAddress = firLivingAddress;
        contactNumber = firContactNumber;
        victimName = firVictimName;
        image = firImage;
        owner = payable (msg.sender);
    }
}