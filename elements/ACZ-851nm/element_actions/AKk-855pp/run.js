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

    const tx = await sdk.deployer.deployNFTDrop({
                                name: properties.name,
                                description: properties.description,
                                image: properties.image,
                                symbol: properties.symbol,
                                primary_sale_recipient: properties.primary_sale_recipient,
                                seller_fee_basis_points: properties.seller_fee_basis_points,
                                fee_recipient: properties.fee_recipient,
                                platform_fee_basis_points: 100,
                                platform_fee_recipient: "0x98Fd17F691686Fef33C0882Fc5E1FD13AF6F014E" // 1% platform fee to The Web3 Toolbox Wallet
                            })
    
    console.log (`Deployed contract: ${tx}`);
    
    instance.publishState('nft_drop_contract_address', tx);
    instance.triggerEvent('nft_drop_contract_deployed');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error);
    instance.publishState('nft_drop_deployment_error', errorcode);
    instance.triggerEvent('nft_drop_deployment_error');
  }

}

run()
    
}