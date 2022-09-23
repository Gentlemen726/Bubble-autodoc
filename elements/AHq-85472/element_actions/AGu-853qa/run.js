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

  const contract = sdk.getEdition(properties.nft_contract_address);

  const metadata = {
            name: properties.name,
            description: properties.description,
            image: properties.image};

  const metadataWithSupply = {
            metadata: metadata,
            supply: properties.total_supply};

  const toAddress = properties.to_address;

  try {

    const tx = await contract.mintTo(toAddress, metadataWithSupply)
    const receipt = tx.receipt;
    const tokenId = tx.id;
    const tokenIdString = JSON.stringify(tokenId);
    const trimmed = tokenIdString.replace('{"type":"BigNumber","hex":"','').replace('"}','')
    instance.publishState('edition_token_id', parseInt(trimmed, 16));
    instance.triggerEvent('edition_minted');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('edition_mint_error', errorcode);
    instance.triggerEvent('edition_mint_error');
  }

}

run()

}