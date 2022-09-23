function(instance, properties, context) {

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
let web3Modal;
let provider;
let selectedAccount;


const providerOptions = {

walletconnect: {
package: WalletConnectProvider,
options: {
infuraId: "b3afdc8e8bc744368373a2d95969ec28"
}}

}

async function onConnect() {
  
try {
const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
provider.send("eth_requestAccounts", [0])
const ethersProvider = new ethers.providers.Web3Provider(provider);
const userAddress = await ethersProvider.getSigner().getAddress();
const network = await ethersProvider.getNetwork(); 
const chainId = network.chainId;
const chainName = network.name;
selectedAccount = ethersProvider[0];  
console.log("Connected network: " + chainName + " // Chain ID: " + chainId + " // Connected wallet: "+ userAddress);
window['selected_Account'] = userAddress;
window['ethers_Provider'] = ethersProvider;
instance.publishState('wallet_connected', true);
instance.publishState('connected_chain_id', chainId);
instance.publishState('connected_chain_name', chainName);
instance.triggerEvent('wallet_connected');
instance.publishState('wallet_address', userAddress);

} 
catch(e) {
console.log("Could not get a wallet connection", e);
return;
}

}
    

function init() {
    
web3Modal = new Web3Modal({
cacheProvider: false, 
providerOptions
})

onConnect()

}
    

init()

}