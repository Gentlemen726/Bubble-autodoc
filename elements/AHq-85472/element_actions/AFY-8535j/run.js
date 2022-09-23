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

  const walletAddress = properties.nft_receiver;
  const contract = sdk.getNFTCollection(properties.nft_contract_address);
  
  const metadata = 
  {name: properties.nft_name,
  description: properties.nft_description,
  image: properties.image_url};

  try {

    const tx = await contract.mintTo(walletAddress, metadata);
    const receipt = tx.receipt;
    const tokenId = tx.id;
    console.log (receipt);
    const tokenIdString = JSON.stringify(tokenId);
    const trimmed = tokenIdString.replace('{"type":"BigNumber","hex":"','').replace('"}','')
    instance.publishState('nft_collection_token_id', parseInt(trimmed, 16));
    instance.triggerEvent('nft_collection_token_minted');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('nft_collection_mint_error', errorcode);
    instance.triggerEvent('nft_collection_mint_error');
  }

}

run()
    
}