function(properties, context) {

const ThirdwebSDK = require('@thirdweb-dev/sdk');
const ethers = require('ethers');  
const fetch = require ('node-fetch');

var sdk = new ThirdwebSDK.ThirdwebSDK(new ethers.Wallet(context.keys['private_key'], ethers.getDefaultProvider(properties.default_provider)));

    
let resultName = context.async(async callback => {
    
    try {
       
    const message = properties.message;

    const signature = await sdk.wallet.sign(message);
    
    callback(null, signature);
        
    }
    catch (err) {
 
    callback(err);
 
    }
        
}); 
    
    
 
  return {
   signature: resultName
  }



}