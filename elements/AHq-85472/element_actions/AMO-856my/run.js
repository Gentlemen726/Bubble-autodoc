function(instance, properties, context) {


  (async () => {
      
  if (window.ethers_Provider) {
  var provider = window.ethers_Provider;
  } else {
  var provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  }
        
  provider.send("eth_requestAccounts", [0])
  const signer = await provider.getSigner(0);
  const userAddress = signer.getAddress();
  const sdk = await new ThirdwebSDK.ThirdwebSDK(signer); 
  const vote = sdk.getVote(properties.vote_address);
  const token = sdk.getToken(properties.token_address);


  const run = async () => {
  
    try {
       
    const ownedTokenBalance = await token.balanceOf(userAddress);

    const ownedAmount = ownedTokenBalance.displayValue;
    const percent = (Number(ownedAmount) / 100) * properties.percent_to_treasury;

    const tx = await token.transfer(vote.getAddress(), percent);
      
    console.log(`Successfully transferred ${percent} tokens to vote contract`);
    
    const txstring = JSON.stringify(tx);
    instance.publishState('dao_treasury_transfer_receipt', txstring);
    instance.triggerEvent('dao_tokens_transferred');
  
  } catch (error) {
    console.error("failed to transfer tokens to vote contract", error);
    const errorcode = JSON.stringify(error);
    instance.publishState('dao_treasury_configure_error', errorcode);
    instance.triggerEvent('dao_treasury_configure_error');
  }

} //end of run


const role = async () => {
    
  try {

  await token.roles.grant("minter", vote.getAddress());

  console.log("Successfully gave vote contract permissions to act on token contract");
      
  } catch (error) {
    
      console.error("Failed to grant vote contract permissions on token contract", error);
  }

  run()
 
} //end of role

role()
      
})();
    
}