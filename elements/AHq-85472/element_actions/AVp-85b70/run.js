function(instance, properties, context) {
    
  if (window.ethers_Provider) {
  var provider = window.ethers_Provider;
  } else {
  var provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  }

  const run = async () => {
    
  const provider = await new ethers.providers.Web3Provider(window.ethereum, "any");
  provider.send("eth_requestAccounts", [0])
  const signer = await provider.getSigner(0);
  const sdk = await new ThirdwebSDK.ThirdwebSDK(signer);

  const contract = sdk.getToken(properties.token_contract_address);
  const payload = JSON.parse(properties.payload); 
    
  try {
      
    const tx = await contract.signature.mint(payload);
    const receipt = tx.receipt;
    const txstring = JSON.stringify(receipt);
    instance.publishState('20_signature_mint_receipt', txstring);
    instance.triggerEvent('20_nft_signature_minted');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('20_signature_mint_error', errorcode);
    instance.triggerEvent('20_signature_mint_error');
  }

}

run()

}