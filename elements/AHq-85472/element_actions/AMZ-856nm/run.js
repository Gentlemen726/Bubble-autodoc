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
      
    const recipient = properties.recipient;
      
    const amount = properties.amount;
    
    const description = "Should the DAO transfer " + amount + " tokens from the treasury to " + recipient + " for being rad?";
    
    const executions = [{nativeTokenValue: 0,
                         transactionData: token.encoder.encode("transfer", [recipient, ethers.utils.parseUnits(amount.toString(), 18)]),
                         toAddress: token.getAddress()}];

    const tx = await vote.propose(description, executions);

    console.log("Successfully created proposal to receive funds from the treasury, let's hope people vote for it!");
      
    const txstring = JSON.stringify(tx);
    instance.publishState('transfer_proposal_receipt', txstring);
    instance.triggerEvent('transfer_proposal_success');
  } catch (error) {
    console.error("failed to create transfer proposal", error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('transfer_proposal_error', errorcode);
    instance.triggerEvent('transfer_proposal_error');
  }

}

run()

}