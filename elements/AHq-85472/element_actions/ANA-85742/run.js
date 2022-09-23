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

  const contract = sdk.getVote(properties.vote_contract);

  const proposalId = properties.proposal_id; 
    
  try {
   
    const tx = await contract.execute(proposalId);
    const txstring = JSON.stringify(tx);

    console.log (tx);
    instance.publishState('execute_receipt', txstring);
    instance.triggerEvent('executed');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('execute_error', errorcode);
    instance.triggerEvent('execute_error');
  }

}

run()

}