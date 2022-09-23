function(instance, properties, context) {


const sdk = new ThirdwebSDK.ThirdwebSDK(ethers.getDefaultProvider(properties.default_provider));

const run = async () => {

  const contract = sdk.getSplit(properties.split_contract_address);

  const address = properties.wallet_address;
  const tokenAddress = properties.token_contract_address;

  try {

    const tx = await contract.balanceOfToken(address, tokenAddress)
    console.log (tx);
    const tokenFunds = JSON.stringify(tx.displayValue);
    instance.publishState('split_token_balance', tokenFunds);
    instance.triggerEvent('split_token_balance_ready');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('split_token_balance_fetch_error', error);
    instance.triggerEvent('split_token_balance_fetch_error');
  }

}

run()

}