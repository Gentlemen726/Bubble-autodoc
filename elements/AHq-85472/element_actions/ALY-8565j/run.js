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

  const contract = sdk.getNFTDrop(properties.nft_contract_address);

  const address = properties.to_address; 
  const quantity = properties.quantity;

  try {

    const tx = await contract.claimTo(address, quantity)
    const idString = JSON.stringify(tx.id);
    const metaString = JSON.stringify(tx.data);
    instance.publishState('nft_drop_claim_token_id', idString);
    instance.publishState('nft_drop_claimed_metadata', metaString);
    instance.triggerEvent('nft_drop_claimed');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('nft_drop_claim_error', errorcode);
    instance.triggerEvent('nft_drop_claim_error');
  }

}

run()
    
}