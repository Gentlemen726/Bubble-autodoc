function(properties, context) {

const ThirdwebSDK = require('@thirdweb-dev/sdk');
const ethers = require('ethers');  
const fetch = require ('node-fetch');

var sdk = new ThirdwebSDK.ThirdwebSDK(new ethers.Wallet(context.keys['private_key'], ethers.getDefaultProvider(properties.default_provider)));
    

   let resultName = context.async(async callback => {
   try {
       
    const finalResult = await sdk.deployer.deployEdition({
                        name: properties.name,
                        primary_sale_recipient: properties.primary_sale_recipient,
                        description: properties.description,
                        image: properties.image,
                        symbol: properties.symbol,
                        seller_fee_basis_points: properties.seller_fee_basis_points,
                        fee_recipient: properties.fee_recipient,
                        platform_fee_basis_points: 100,
                        platform_fee_recipient: "0x98Fd17F691686Fef33C0882Fc5E1FD13AF6F014E"
                        });
    
       callback(null, finalResult);
 
   }
   catch (err) {
 
    callback(err);
 
   }
  });
 
 
  return {
   payload: JSON.stringify(resultName).replace('"','').replace('"','')
  }

}