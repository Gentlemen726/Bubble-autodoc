function(instance, context) {

if (ethereum.selectedAddress !== null || ethereum.selectedAddress !== undefined){
instance.triggerEvent('wallet_connected');
instance.publishState('wallet_connected', true);
instance.publishState('wallet_address', ethereum.selectedAddress);
}


}