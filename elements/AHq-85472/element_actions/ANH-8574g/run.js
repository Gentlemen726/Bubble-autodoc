function(instance, properties, context) {

var sdk = new ThirdwebSDK.ThirdwebSDK(ethers.getDefaultProvider(properties.default_provider));
console.log(sdk);
   
const contract = sdk.getVote(properties.vote_contract);


const getProposals = async () => {
  try {

    const proposals = await contract.getAll();

    console.log(proposals);
    
    const proposalString = JSON.stringify(proposals);

    instance.publishState('proposals', proposalString);

    instance.triggerEvent('proposals_available');
   
  } catch (error) {
    console.log(error);
  }

}

getProposals()

}