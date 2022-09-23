function(instance, properties, context) {
    
    
if (window.ethers_Provider) {
  var provider = window.ethers_Provider;
} else {
  var provider = new ethers.providers.Web3Provider(window.ethereum, "any");
}

const data = [
  
    {
    toAddress: properties.recipient_1_wallet, 
    amount: properties.recipient_1_amount, 
  },
  {
    toAddress: properties.recipient_2_wallet,
    amount: properties.recipient_2_amount,
  },
];
    
console.log(data);

const contract = sdk.getToken(properties.token_address);
    
const run = async () => {
    
    provider.send("eth_requestAccounts", [0])
    const signer = await provider.getSigner(0);
    signer.getAddress()
    const sdk = await new ThirdwebSDK.ThirdwebSDK(signer);
    console.log(sdk);
    
  try {
   
    const tx = await contract.transferBatch(data);     
    instance.triggerEvent('split_transfer_executed');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error);
    instance.publishState('split_transfer_execute_error', errorcode);
    instance.triggerEvent('split_transfer_execute_error');
  }

}

run()

}