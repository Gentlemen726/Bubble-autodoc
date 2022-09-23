function(instance, properties, context) {

const provider = window.ethers_Provider;
    
async function disconnect () {
console.log("Killing the wallet connection with", provider);
await web3Modal.clearCachedProvider()
//if (provider?.disconnect && typeof provider.disconnect === 'function') {
await provider.disconnect()
//}
window['selected_Account'] = null;
window['ethers_Provider'] = null;
instance.publishState('wallet_address', null);
instance.publishState('wallet_connected', false);
instance.publishState('connected_chain_id', null);
instance.publishState('connected_chain_name', null);
instance.triggerEvent('wallet_disconnected');
}
    
disconnect()
    
}