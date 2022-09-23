function(properties, context) {
    
   let response = context.request({
    method: "post",
    
       uri: "https://paper.xyz/api/v1/checkout/"+properties.checkout_id+"/one-time-link",
    
       headers: {"Accept": "application/json",
          "Authorization" : "Bearer 0f17158e-235d-4d17-8da5-2448aa956464",
          "Content-Type" : "application/json"},
    
    body: {
        
    "walletAddress": properties.wallet_address,
    "email": properties.email,
    "expiresInMInutes": properties.expires_in_minutes},
       
    json: true
    });  
    
    return {checkouturl: JSON.stringify(response.body.transactionUrl).replace('"','').replace('"','')}


}
