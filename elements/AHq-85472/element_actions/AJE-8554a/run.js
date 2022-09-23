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

  const contract = sdk.getSplit(properties.split_contract_address);

  try {

    const tx = await contract.distribute();
    const txString = JSON.stringify(tx);
    instance.publishState('distribute_transaction', txString);
    instance.triggerEvent('distributed');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('distribute_error', errorcode);
    instance.triggerEvent('distribute_error');
  }

}

run()

}