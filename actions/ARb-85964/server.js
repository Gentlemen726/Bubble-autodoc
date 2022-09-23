function(properties, context) {

const ThirdwebSDK = require('@thirdweb-dev/sdk');
const ethers = require('ethers');  
const fetch = require ('node-fetch');

var sdk = new ThirdwebSDK.ThirdwebSDK(new ethers.Wallet(context.keys['private_key'], ethers.getDefaultProvider(properties.default_provider)));
    
  const contract = sdk.getEdition(properties.nft_contract_address);

  const metadata = {
  name: properties.name,
  description: properties.description,
  image: properties.image
  };

  const metadataWithSupply = {
  metadata,
  supply: properties.total_supply 
  };

  const toAddress = properties.to_address;
    

   let resultName = context.async(async callback => {
   try {
       
    const finalResult = await contract.mintTo(toAddress, metadataWithSupply);
    
    const receipt = finalResult.receipt; // the transaction receipt
    
    const tokenId = finalResult.id; // the id of the NFT minted
                
    const tokenIdString = JSON.stringify(tokenId);
       
    const trimmed = tokenIdString.replace('{"type":"BigNumber","hex":"','').replace('"}','')
    
    const final = parseInt(trimmed, 16);
       
    console.log ("Token ID: "+final);
    
       callback(null, final);
 
   }
   catch (err) {
 
    callback(err);
 
   }
  });
 
 
  return {
   payload: JSON.stringify(resultName)
  }

}