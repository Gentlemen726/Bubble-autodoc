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

    const tx = await sdk.deployer.deployVote({          
                                name: properties.name,
                                description: properties.description,  
                                voting_token_address: properties.token_address,
                                voting_delay_in_blocks: properties.start_delay,                      
                                voting_period_in_blocks: properties.voting_blocks,                      
                                voting_quorum_fraction: properties.min_voters,                   
                                proposal_token_threshold: properties.min_tokens,
                            })
    
    console.log (`Deployed contract: ${tx}`);
    
    instance.publishState('vote_contract_address', tx);
    instance.triggerEvent('vote_contract_deployed');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error);
    instance.publishState('vote_deployment_error', errorcode);
    instance.triggerEvent('vote_deployment_error');
  }

}

run()
    
}