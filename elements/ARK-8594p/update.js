function(instance, properties, context) {
    

    
window.ethereum.on('accountsChanged', function (accounts) {
  async function init() {
    
    let selectedAccount;
 
    if (typeof window.ethereum !== 'undefined') {
    let provider = window.ethereum;
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const network = await ethersProvider.getNetwork(); 
    const chainId = network.chainId;
    const chainName = network.name;
    const userAddress = await ethersProvider.getSigner().getAddress();
    selectedAccount = ethersProvider[0];  
    console.log("Account Changed! // Connected network: " + chainName + " // Chain ID: " + chainId + " // Connected wallet: "+ userAddress);
    window['selected_Account'] = userAddress;
    window['ethers_Provider'] = ethersProvider;
    instance.publishState('wallet_connected', true);
    instance.publishState('connected_chain_id', chainId);
    instance.publishState('connected_chain_name', chainName);    
    instance.triggerEvent('wallet_connected');
    instance.publishState('wallet_address', userAddress);
    };

    
    };
    
    init();
})


    
    
window.ethereum.on('chainChanged', function (networkId) {
  async function init() {
    
    let selectedAccount;
 
    if (typeof window.ethereum !== 'undefined') {
    let provider = window.ethereum;
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const network = await ethersProvider.getNetwork(); 
    const chainId = network.chainId;
    const chainName = network.name;
    const userAddress = await ethersProvider.getSigner().getAddress();
    selectedAccount = ethersProvider[0];  
    console.log("Network Changed! // Connected network: " + chainName + " // Chain ID: " + chainId + " // Connected wallet: "+ userAddress);
    window['selected_Account'] = userAddress;
    window['ethers_Provider'] = ethersProvider;
    instance.publishState('wallet_connected', true);
    instance.publishState('connected_chain_id', chainId);
    instance.publishState('connected_chain_name', chainName);    
    instance.triggerEvent('wallet_connected');
    instance.publishState('wallet_address', userAddress);
    };

    
    };
    
    init();

})

}