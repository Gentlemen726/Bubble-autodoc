function(properties, context) { 
    
const ThirdwebSDK = require('@thirdweb-dev/sdk');
const ethers = require('ethers');  
const fetch = require ('node-fetch');

var sdk = new ThirdwebSDK.ThirdwebSDK(new ethers.Wallet(context.keys['private_key'], ethers.getDefaultProvider(properties.default_provider)));
var contract = sdk.getToken(properties.token_contract_address);
    
var startTime = new Date();
var endTime = new Date(Date.now() + 60 * 60 * 24 * 1000 * properties.days_valid);
var payload = {
       
            to: properties.token_receiver,
            price: properties.price,
            currencyAddress: properties.currency_address,
            mintStartTime: startTime,
            mintEndTime: endTime,
            primarySaleRecipient: properties.primary_sale_recipient,
            quantity: properties.quantity
        };

let resultName = context.async(async callback => {


const finalResult = await contract.signature.generate(payload);
callback(null, finalResult);

})

return {
payload: JSON.stringify(resultName)
}
  
  
    
}