function(instance, properties, context) {

  
  if (window.ethers_Provider) {
  var provider = window.ethers_Provider;
} else {
  var provider = new ethers.providers.Web3Provider(window.ethereum, "any");
}

    
const run = async () => {
    
    provider.send("eth_requestAccounts", [0])
    const signer = await provider.getSigner(0);
    signer.getAddress()
    const sdk = await new ThirdwebSDK.ThirdwebSDK(signer);
    console.log(sdk);
    
    const message = properties.message;
    const signature = properties.signature;
   
    const tx = await sdk.wallet.recoverAddress(message, signature);
    instance.publishState('recovered_address', tx);
    
    console.log(tx);
    
    instance.triggerEvent('address_recovered');  
    

}

run()


}