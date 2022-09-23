function(properties, context) { 
    
const ThirdwebSDK = require('@thirdweb-dev/sdk');
const ethers = require('ethers');  
const fetch = require ('node-fetch');

var sdk = new ThirdwebSDK.ThirdwebSDK(new ethers.Wallet(context.keys['private_key'], ethers.getDefaultProvider(properties.default_provider)));
var contract = sdk.getNFTCollection(properties.nft_contract_address);
    
var nftMetadata = {
name: properties.name,
description: properties.description,
image: properties.image // This can be an image url or file
};
var startTime = new Date();
var endTime = new Date(Date.now() + 60 * 60 * 24 * 1000 * properties.days_valid);
var payload = {
            metadata: nftMetadata,
            to: properties.nft_receiver,
            price: properties.price,
            currencyAddress: properties.currency_address,
            mintStartTime: startTime,
            mintEndTime: endTime,
            royaltyRecipient: properties.royalty_recipient,
            royaltyBps: properties.royalty_percentage,
            primarySaleRecipient: properties.primary_sale_recipient
        };

let resultName = context.async(async callback => {


const finalResult = await contract.signature.generate(payload);
callback(null, finalResult);

})

return {
payload: JSON.stringify(resultName)
}
  
  
    
}