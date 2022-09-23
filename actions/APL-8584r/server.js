function(properties, context) {
    
 
const response = context.request({
    
method: "post",
    
uri: "https://paper.xyz/api/v1/checkout",
    
headers: {"Accept": "application/json",
          "Authorization": "Bearer 0f17158e-235d-4d17-8da5-2448aa956464",
          "Content-Type": "application/json"},
    
body: {"contractChain": properties.contract_chain,
       "contractType": "THIRDWEB",  
       "requireVerifiedEmail": false,
       "hideNativeMint": false,
       "hidePayWithCard": false,
       "hidePayWithCrypto": false,
       "hideConnectPaperWallet": false,
       "hideConnectExternalWallet": false,
       "brandDarkMode": false,
       "brandButtoneShape": "lg",
       "brandColorScheme": properties.color_scheme,
       "hasPublicLink": true,
       "limitPerTransaction": properties.limit_per_transaction,
       "redirectAfterPayment": false,
       "shouldSendTransferCompletedEmail": true,
       "successCallbackUrl": properties.success_url,
       "contractAddress": properties.contract_address,
       "collectionDescription": properties.collection_description,
       "collectionTitle": properties.collection_name,
       "cancelCallbackUrl": properties.cancel_url,
       "imageUrl": properties.image_url,
       "sellerTwitterHandle": properties.seller_twitter_handle},
    
json: true});   
    
   
return {checkouturl: JSON.stringify(response.body.checkoutUrl).replace('"','').replace('"',''),
        checkout_id: JSON.stringify(response.body.checkoutUrl).replace('"','').replace('"','').replace('https://paper.xyz/checkout/','')};   

}
