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

  const contract = sdk.getNFTCollection(properties.nft_contract_address);
  const payload = JSON.parse(properties.payload); 
    
  try {
    const tx = await contract.signature.mint(payload);
    const receipt = tx.receipt;
    const mintedId = tx.id;
    const txstring = JSON.stringify(tx.id);
    const trimmed = txstring.replace('{"type":"BigNumber","hex":"','').replace('"}','')
    instance.publishState('1155_signature_mint_token_id', parseInt(trimmed, 16));
    instance.triggerEvent('1155_nft_signature_minted');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('1155_signature_mint_error', errorcode);
    instance.triggerEvent('1155_signature_mint_error');
  }

}

run()

}