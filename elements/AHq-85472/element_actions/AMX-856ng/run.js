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

  const vote = sdk.getVote(properties.dao_address);
  const token = sdk.getToken(properties.token_address);
    
  try {
    
    const amount = properties.amount;
    const description = "Should the DAO mint an additional " + amount +" tokens into the treasury?";
      
    const executions = [{
          toAddress: token.getAddress(),
          nativeTokenValue: 0,
          transactionData: token.encoder.encode("mintTo", [
          vote.getAddress(),
          ethers.utils.parseUnits(amount.toString(), 18),
          ])}];

    const tx = await vote.propose(description, executions);
    console.log("Successfully created proposal to mint tokens");

    instance.publishState('mint_proposal_receipt', tx);
    instance.triggerEvent('mint_proposal_success');
  } catch (error) {
    console.error("failed to create first proposal", error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('mint_proposal_error', errorcode);
    instance.triggerEvent('mint_proposal_error');
  }
 

}
  
 run()
  
}