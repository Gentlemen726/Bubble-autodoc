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
    
  try {
      
    if (properties.vote_type = "For") {const voteType = VoteType.For};
    if (properties.vote_type = "Against") {const voteType = VoteType.Against};
    if (properties.vote_type = "Abstain") {const voteType = VoteType.Abstain}; 
    
    const proposalId = properties.proposal_id;
    
    const reason = properties.reason;
    const tx = await contract.vote(proposalId, voteType, reason);
    const txstring = JSON.stringify(tx);

    console.log (tx);
    instance.publishState('vote_receipt', txstring);
    instance.triggerEvent('voted');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('vote_error', errorcode);
    instance.triggerEvent('vote_error');
  }

}

run()

}