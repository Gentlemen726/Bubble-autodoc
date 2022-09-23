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
    
  try {

    const tx = await sdk.deployer.deployToken({
                                name: properties.name,
                                description: properties.description,
                                image: properties.image,
                                primary_sale_recipient: properties.primary_sale_recipient,
                                symbol: properties.symbol,
                                platform_fee_recipient: "0x98Fd17F691686Fef33C0882Fc5E1FD13AF6F014E", // 1% platform fee to The Web3 Toolbox Wallet
                                platform_fee_basis_points: 100})
    
    console.log (`Deployed contract: ${tx}`);
    
    instance.publishState('token_contract_address', tx);
    instance.triggerEvent('token_contract_deployed');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error);
    instance.publishState('token_deployment_error', errorcode);
    instance.triggerEvent('token_deployment_error');
  }

}

run()
    
}