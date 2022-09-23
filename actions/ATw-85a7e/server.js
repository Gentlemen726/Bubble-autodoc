function(properties, context) {


const ThirdwebSDK = require('@thirdweb-dev/sdk');
const ethers = require('ethers');  
const fetch = require ('node-fetch');

var sdk = new ThirdwebSDK.ThirdwebSDK(new ethers.Wallet(context.keys['private_key'], ethers.getDefaultProvider(properties.default_provider)));

const token = sdk.getToken(properties.token_address);
    
let resultName = context.async(async callback => {
   
    try {
       
    const tx = await token.transfer(properties.to_address, properties.amount);    
    
    const txstring = JSON.stringify(tx.receipt.transactionHash).replace('"','').replace('"','');
    
    callback(null, txstring);
        
    
 
   }
   catch (err) {
 
    callback(err);
 
   }
    
  });
 
 
  return {
   payload: resultName
  }


}