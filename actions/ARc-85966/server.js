function(properties, context) {

const ThirdwebSDK = require('@thirdweb-dev/sdk');
const ethers = require('ethers');  
const fetch = require ('node-fetch');

var sdk = new ThirdwebSDK.ThirdwebSDK(new ethers.Wallet(context.keys['private_key'], ethers.getDefaultProvider(properties.default_provider)));
    
    const contract = sdk.getEdition(properties.nft_contract_address);
    const toAddress = properties.to_address;
    const tokenId = properties.token_id; // The token ID of the NFT you want to send
    const amount = properties.quantity; // How many copies of the NFTs to transfer

   let resultName = context.async(async callback => {
   try {
       
    const finalResult = await contract.transfer(toAddress, tokenId, amount);
                
    const listingIdString = JSON.stringify(finalResult);
    
       callback(null, finalResult);
 
   }
   catch (err) {
 
    callback(err);
 
   }
  });
 
 
  return {
   payload: JSON.stringify(resultName)
  }

}