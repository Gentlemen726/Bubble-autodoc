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

  const contract = sdk.getToken(properties.token_contract_address);

  const toAddress = properties.token_receiver; 
  const amount = properties.quantity; 

  try {

    const tx = await contract.mintTo(toAddress, amount)
    const txString = JSON.stringify(tx);
    instance.publishState('token_mint_tx', txString);
    instance.triggerEvent('token_minted');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('token_mint_error', errorcode);
    instance.triggerEvent('token_mint_error');
  }

}

run()

}