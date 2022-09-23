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
  
  const listing = {
  assetContractAddress: properties.nft_contract_address,
  tokenId: properties.token_id,
  startTimestamp: new Date(),
  listingDurationInSeconds: properties.sale_duration,
  quantity: 1,
  currencyContractAddress: properties.currency_contract_address,
  buyoutPricePerToken: properties.buy_out_price};

  try {

    const tx = await contract.direct.createListing(listing);
    const receipt = tx.receipt;
    const listingId = tx.id;
    const tokenIdString = JSON.stringify(listingId);
    instance.publishState('listing_id', tokenIdString);
    instance.triggerEvent('nft_listed');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('nft_list_error', errorcode);
    instance.triggerEvent('nft_list_error');
  }

}

run()
    
}
