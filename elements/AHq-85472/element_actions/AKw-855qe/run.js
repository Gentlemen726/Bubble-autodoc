function(instance, properties, context) {

if (window.ethers_Provider) {
  var provider = window.ethers_Provider;
  } else {
  var provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  }

  const presaleStartTime = properties.hours_until_presale;
  const publicSaleStartTime = properties.hours_until_public_sale;

  const run = async () => {

  provider.send("eth_requestAccounts", [0])
  const signer = await provider.getSigner(0);
  const sdk = await new ThirdwebSDK.ThirdwebSDK(signer);

  const contract = sdk.getTokenDrop(properties.token_drop_contract);

  /* if properties.presale is false and properties.whitelist is false */
  if (properties.presale === false && properties.whitelist_y_n === false) {
  var claimConditions =
    [
            
            {
                startTime: publicSaleStartTime,
                maxQuantity: properties.public_quantity,
                price: properties.public_sale_price,
                currency: properties.currency
            }
        ]
        
  }
        
  /* if properties.presale is false and properties.whitelist is true */
  if (properties.presale === false && properties.whitelist_y_n === true) {

    const list = properties.whitelist;
    const stringArray = list.get(0, list.length());
    console.log(stringArray);
    
    var claimConditions = 
    [
    
            {
                startTime: publicSaleStartTime,
                maxQuantity: properties.public_quantity,
                price: properties.public_sale_price,
                snapshot: stringArray,
                currency: properties.currency
            }
        ]
        
  }
        
  /* if properties.presale is true and properties.whitelist is false */
  if (properties.presale === true && properties.whitelist_y_n === false) {
  var claimConditions = 
    [
            {
                startTime: presaleStartTime,
                maxQuantity: properties.presale_quantity,
                price: properties.presale_price,
                currency: properties.currency
            },
            {
                startTime: publicSaleStartTime,
                maxQuantity: properties.public_quantity,
                price: properties.public_sale_price,
                currency: properties.currency
            }
        ];
  }
        
  /* if properties.presale is true and properties.whitelist is true */
  if (properties.presale === true && properties.whitelist_y_n === true) {
  
    const list = properties.whitelist;
    const stringArray = list.get(0, list.length());
    console.log(stringArray);
    
    var claimConditions = 
      [
            {
                startTime: presaleStartTime,
                maxQuantity: properties.presale_quantity,
                price: properties.presale_price,
                snapshot: stringArray,
                currency: properties.currency
            },
            {
                startTime: publicSaleStartTime,
                maxQuantity: properties.public_quantity,
                price: properties.public_sale_price,
                currency: properties.currency
            }
        ]
  };

  try {

    const tx = await contract.claimConditions.set(claimConditions)
    const txString = JSON.stringify(tx);
    instance.publishState('token_drop_claim_conditions_set_tx', txString);
    instance.triggerEvent('token_drop_claim_conditions_set');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('token_drop_claim_conditions_error', errorcode);
    instance.triggerEvent('token_drop_claim_conditions_error');
  }

}

run()
}