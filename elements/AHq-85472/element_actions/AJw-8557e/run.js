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

  const toAddress = properties.to_address;
  const amount = properties.amount;

  try {

    const tx = await contract.transfer(toAddress, amount)
    const txString = JSON.stringify(tx);
    instance.publishState('erc-20_transfer_id', txString);
    instance.triggerEvent('erc-20_transferred');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('erc-20_transfer_error', errorcode);
    instance.triggerEvent('erc-20_transfer_error');
  }

}

run()

}