function(instance, properties, context) {

var sdk = new ThirdwebSDK.ThirdwebSDK(ethers.getDefaultProvider(properties.default_provider));

const run = async () => {

  const contract = sdk.getSplit(properties.split_contract_address);

  const address = properties.wallet_address;

  try {

    const tx = await contract.balanceOf(address);
    console.log (tx);
    const nativeFunds = JSON.stringify(tx.displayValue);
    instance.publishState('split_native_balance', nativeFunds);
    instance.triggerEvent('split_native_balance_ready');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('split_native_balance_fetch_error', error);
    instance.triggerEvent('split_native_balance_fetch_error');
  }

}

run()

}