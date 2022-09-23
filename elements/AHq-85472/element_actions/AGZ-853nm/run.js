function(instance, properties, context) {

  if (window.ethers_Provider) {
  var provider = window.ethers_Provider;
  } else {
  var provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  }
    
  const run = async () => {

  provider.send("eth_requestAccounts", [0])
  const signer = await provider.getSigner(0);
  const sdk = await new ThirdwebSDK.ThirdwebSDK(signer);

  const contract = sdk.getMarketplace(properties.marketplace_contract_address);

  try {

    const tx = await contract.direct.buyoutListing(properties.listing_id, properties.quantity)
    const listingIdString = JSON.stringify(tx);
    instance.publishState('purchase_transaction', listingIdString);
    instance.triggerEvent('nft_purchased');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('nft_purchase_error', errorcode);
    instance.triggerEvent('nft_purchase_error');
  }

}

run()
    
}