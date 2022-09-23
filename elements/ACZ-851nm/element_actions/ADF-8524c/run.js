function(instance, properties, context) {
    
if (window.ethers_Provider) {
  var provider = window.ethers_Provider;
} else {
  var provider = new ethers.providers.Web3Provider(window.ethereum, "any");
}   
        
var recipients = 

[{
address: "0x98Fd17F691686Fef33C0882Fc5E1FD13AF6F014E", // 1% platform fee to The Web3 Toolbox Wallet
sharesBps: 100
},
{
address: properties.wallet_1,
sharesBps: properties.percentage_1,
},
{
address: properties.wallet_2,
sharesBps: properties.percentage_2,
}]



if (properties.wallet_3 !== null && properties.percentage_3 !== 0 || null) {
    
    const three = {address: properties.wallet_3,
                   sharesBps: properties.percentage_3}
    
    recipients.push(three);
}
        
if (properties.wallet_4 !== null && properties.percentage_4 !== 0 || null) {
    
    const four = {address: properties.wallet_4,
                  sharesBps: properties.percentage_4}
    
    recipients.push(four);
}
        
if (properties.wallet_5 !== null && properties.percentage_5 !== 0 || null) {
    
    const five = {address: properties.wallet_5,
                  sharesBps: properties.percentage_5}
    
    recipients.push(five);
}
    

const run = async () => {
       
    provider.send("eth_requestAccounts", [0])
    const signer = await provider.getSigner(0);
    const sdk = await new ThirdwebSDK.ThirdwebSDK(signer); 
    
  try {

    const tx = await sdk.deployer.deploySplit({
    name: properties.name,
    description: properties.description,
    image: properties.image,
    recipients: recipients});
    
    console.log (`Deployed contract: ${tx}`);
    
    instance.publishState('split_contract_address', tx);
    instance.triggerEvent('split_contract_deployed');

  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error);
    instance.publishState('split_deployment_error', errorcode);
    instance.triggerEvent('split_deployment_error');
  }

};

run();
    
}