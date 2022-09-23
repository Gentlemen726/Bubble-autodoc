function(instance, properties, context) {

var sdk = new ThirdwebSDK.ThirdwebSDK(ethers.getDefaultProvider(properties.default_provider));

const run = async () => {

  var contract = sdk.getMarketplace(properties.marketplace_address);

  try {

    const tx = await contract.getActiveListings(properties.nft_contract_address, properties.nft_token_id)
    console.log (tx);
    const nfts = JSON.stringify(tx);
    instance.publishState('active_listings', nfts);
    instance.triggerEvent('active_listings_ready');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('fetch_active_listings_error', error);
    instance.triggerEvent('fetch_active_listings_error');
  }

}

run()

}