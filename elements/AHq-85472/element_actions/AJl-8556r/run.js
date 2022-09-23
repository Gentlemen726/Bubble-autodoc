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

  const walletAddress = properties.to_address;
  const tokenId = properties.token_id;

  try {

    const tx = await contract.transfer(walletAddress, tokenId)
    const txString = JSON.stringify(tx);
    instance.publishState('erc-721_transfer_id', txString);
    instance.triggerEvent('erc-721_transferred');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('erc-721_transfer_error', errorcode);
    instance.triggerEvent('erc-721_transfer_error');
  }

}

run()

}