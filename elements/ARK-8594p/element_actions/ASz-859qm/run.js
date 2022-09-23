function(instance, properties, context) {

  if (window.ethers_Provider) {
  var provider = window.ethers_Provider;
  } else {
  var provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  }
    
const contract = sdk.getToken(properties.token_address);
    
const run = async () => {
    
    provider.send("eth_requestAccounts", [0])
    const signer = await provider.getSigner(0);
    signer.getAddress()
    const sdk = await new ThirdwebSDK.ThirdwebSDK(signer);
    console.log(sdk); 
    
  try {
   
    const tx1 = await sdk.wallet.transfer(properties.recipient_wallet, properties.amount, properties.token_address);
      
    const hash1 = JSON.stringify(tx1.receipt.transactionHash).replace('"','').replace('"','');
      
    console.log("Tx Hash: " + hash1)
      
   instance.triggerEvent('erc20_transfer_executed');  
   instance.publishState('erc20_transfer_hash', hash1); 
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error);
    instance.publishState('erc20_transfer_execute_error', errorcode);
    instance.triggerEvent('erc20_transfer_execute_error');
  }

}

run()

}