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

  const contract = await sdk.getContract(properties.smart_contract_address); 
    
  try {
   
    const tx = await contract.roles.grant(properties.role, properties.wallet_address);
    const txstring = JSON.stringify(tx);

    console.log (tx);
    instance.publishState('grant_receipt', txstring);
    instance.triggerEvent('granted');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('grant_error', errorcode);
    instance.triggerEvent('grant_error');
  }

}

run()

}