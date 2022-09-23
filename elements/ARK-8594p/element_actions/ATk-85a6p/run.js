function(instance, properties, context) {


  if (window.ethers_Provider) {
  var provider = window.ethers_Provider;
  } else {
  var provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  }
    
    const obj = JSON.parse(properties.object)
    console.log(obj);
    
const run = async () => {
    
    provider.send("eth_requestAccounts", [0])
    const signer = await provider.getSigner(0);
    signer.getAddress()
    const sdk = await new ThirdwebSDK.ThirdwebSDK(signer);
    console.log(sdk);
   
    const tx = await sdk.wallet.sendRawTransaction(obj);
      
    const hash = JSON.stringify(tx.receipt.transactionHash).replace('"','').replace('"','');
      
    console.log("Send Transaction Tx Hash: " + hash)
      
   instance.triggerEvent('send_transaction_executed');  
   instance.publishState('send_transaction_hash', hash); 

}

run()

}