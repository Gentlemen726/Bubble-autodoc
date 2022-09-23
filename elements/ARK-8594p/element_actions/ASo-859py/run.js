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
   
    const tx1 = await sdk.wallet.transfer(properties.recipient_1_wallet, properties.recipient_1_amount, properties.token_address);
      
    const hash1 = JSON.stringify(tx1.receipt.transactionHash).replace('"','').replace('"','');
      
    console.log("Tx #1 Hash: " + hash1)
      
    const tx2 = await sdk.wallet.transfer(properties.recipient_2_wallet, properties.recipient_2_amount, properties.token_address);
      
    const hash2 = JSON.stringify(tx2.receipt.transactionHash).replace('"','').replace('"','');
    
    console.log("Tx #2 Hash: " + hash2)
      
   instance.triggerEvent('double_transfer_executed');  
   instance.publishState('double_transfer_receipt_1', hash1);
   instance.publishState('double_transfer_receipt_2', hash2); 
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error);
    instance.publishState('double_transfer_execute_error', errorcode);
    instance.triggerEvent('double_transfer_execute_error');
  }

}

run()
 
}